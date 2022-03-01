/* Copyright (c) 2022 Read Write Tools. */
import FS from 'fs';

import terminal from 'softlib/terminal.js';

import expect from 'softlib/expect.js';

import BinaryWriter from './binary-writer.class.js';

export default class TextWriter extends BinaryWriter {
    constructor() {
        super(), this.isStream = !1, Object.seal(this);
    }
    open(t) {
        return expect(t, [ 'String', 'Pfile' ]), 'stdout' == t ? (this.isStream = !0, !0) : super.open(t);
    }
    isOpen() {
        return !!this.isStream || super.isOpen();
    }
    close() {
        return this.isStream ? void 0 : super.close();
    }
    puts(t) {
        if (expect(t, 'String'), !this.isOpen()) return null;
        try {
            this.isStream ? process.stdout.write(t) : FS.writeSync(this.fd, t);
        } catch (t) {
            terminal.caught(t);
        }
    }
    putline(t) {
        this.puts(t + '\n');
    }
}