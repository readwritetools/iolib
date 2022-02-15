/* Copyright (c) 2022 Read Write Tools. */
import FS from 'fs';

import terminal from '../softlib/terminal.js';

import expect from '../softlib/expect.js';

import aver from '../softlib/aver.js';

export default class BinaryWriter {
    constructor() {
        this.fd = null, 'BinaryWriter' == this.constructor.name && Object.seal(this);
    }
    open(t) {
        expect(t, [ 'String', 'Pfile' ]), 'Pfile' == t.constructor.name && (t = t.name);
        try {
            return this.fd = FS.openSync(t, 'w'), !0;
        } catch (t) {
            return terminal.caught(t.message), !1;
        }
    }
    isOpen() {
        return null != this.fd;
    }
    close() {
        if (this.isOpen()) try {
            this.fd = FS.closeSync(this.fd), this.fd = null;
        } catch (t) {
            terminal.caught(t.message), this.fd = null;
        }
    }
    writeText(t) {
        if (expect(t, 'String'), !this.isOpen()) return null;
        try {
            FS.writeSync(this.fd, t);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
    writeBlock(t, e) {
        expect(t, 'Buffer'), expect(e, 'Number');
        try {
            FS.writeSync(this.fd, t, 0, e);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
    writeBytes(t) {
        expect(t, 'Uint8Array');
        try {
            FS.writeSync(this.fd, t, 0, t.length);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
    writeFloat32(t) {
        if (expect(t, 'Number'), !this.isOpen()) return null;
        try {
            var e = new ArrayBuffer(4);
            new DataView(e).setFloat32(0, t, !0);
            var r = new Uint8Array(e);
            FS.writeSync(this.fd, r);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
    writeUint32(t) {
        if (expect(t, 'Number'), aver(t < 4294967296), !this.isOpen()) return null;
        try {
            var e = new ArrayBuffer(4);
            new DataView(e).setUint32(0, t, !0);
            var r = new Uint8Array(e);
            FS.writeSync(this.fd, r);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
    writeUint16(t) {
        if (expect(t, 'Number'), aver(t < 65536), !this.isOpen()) return null;
        try {
            var e = new ArrayBuffer(2);
            new DataView(e).setUint16(0, t, !0);
            var r = new Uint8Array(e);
            FS.writeSync(this.fd, r);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
    writeUint8(t) {
        if (expect(t, 'Number'), aver(t < 256), !this.isOpen()) return null;
        try {
            var e = new ArrayBuffer(1);
            new DataView(e).setUint8(0, t, !0);
            var r = new Uint8Array(e);
            FS.writeSync(this.fd, r);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
    writeLenPrefixedText(t) {
        if (expect(t, [ 'String', 'null', 'undefined' ]), null != t && null != t) {
            if (!this.isOpen()) return null;
            try {
                const r = (new TextEncoder).encode(t);
                var e = r.byteLength;
                if (e > 32767) return terminal.caught('text longer than 32767 bytes not supported'), 
                void this.writeUint8(0);
                e < 128 ? this.writeUint8(e) : this.writeUint16BigEndian(e + 32768), FS.writeSync(this.fd, r);
            } catch (t) {
                terminal.caught(t.message);
            }
        } else this.writeUint8(0);
    }
    writeUint16BigEndian(t) {
        if (expect(t, [ 'Number', 'null', 'undefined' ]), isNaN(t) && (t = 0), aver(t < 65536), 
        aver(t >= 0), !this.isOpen()) return null;
        try {
            var e = new ArrayBuffer(2);
            new DataView(e).setUint16(0, t, !1);
            var r = new Uint8Array(e);
            FS.writeSync(this.fd, r);
        } catch (t) {
            terminal.caught(t.message);
        }
    }
}