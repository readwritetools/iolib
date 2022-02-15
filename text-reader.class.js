/* Copyright (c) 2022 Read Write Tools. */
import FS from 'fs';

import terminal from '../softlib/terminal.js';

import expect from '../softlib/expect.js';

import BinaryReader from './binary-reader.class.js';

export default class TextReader extends BinaryReader {
    constructor() {
        super(), Object.seal(this);
    }
    isBinary() {
        if (!this.isOpen()) return null;
        var e = this.readOctet();
        if (-1 == e) return null;
        for (var r = !1, t = 1600; -1 != e && t > 0 && 0 == r; ) 0 == (e = this.readOctet()) && (r = !0), 
        t--;
        return this.initialize(), r;
    }
    readOctet() {
        if (this.bufferOffset >= this.bufferLength && !this.readBlock()) return -1;
        var e = this.buffer[this.bufferOffset];
        return this.bufferOffset++, e;
    }
    getline() {
        if (!this.isOpen()) return null;
        var e = this.readOctet();
        if (-1 == e) return null;
        for (var r = new Array; -1 != e; ) if (13 == e) e = this.readOctet(); else {
            if (10 == e) break;
            r.push(e), e = this.readOctet();
        }
        return TextReader.octetsToUtf8(r);
    }
    static octetsToUtf8(e) {
        expect(e, 'Array');
        for (let r of e) if (expect(r, 'Number'), r < 0 || r > 255) return terminal.invalid('The array of octets must contain number between 0 and 255'), 
        e.join('');
        for (var r, t, a, i = '', s = e.length, f = 0; f < s; ) switch ((r = e[f++]) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            i += String.fromCharCode(r);
            break;

          case 12:
          case 13:
            t = e[f++], i += String.fromCharCode((31 & r) << 6 | (63 & t) << 0);
            break;

          case 14:
            t = e[f++], a = e[f++], i += String.fromCharCode((15 & r) << 12 | (63 & t) << 6 | (63 & a) << 0);
            break;

          case 15:
            t = e[f++], a = e[f++], e[f++], i += '�';
            break;

          default:
            terminal.invalid('Poorly formed octet array, invalid UTF-8'), i += '�';
        }
        return i;
    }
}