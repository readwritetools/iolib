/* Copyright (c) 2022 Read Write Tools. */
import FS from 'fs';

import terminal from '../softlib/terminal.js';

import expect from '../softlib/expect.js';

import aver from '../softlib/aver.js';

export default class BinaryWriter {
    constructor() {
        this.fd = null, 'BinaryWriter' == this.constructor.name && Object.seal(this);
    }
    open(e) {
        expect(e, [ 'String', 'Pfile' ]), 'Pfile' == e.constructor.name && (e = e.name);
        try {
            return this.fd = FS.openSync(e, 'w'), !0;
        } catch (e) {
            return terminal.abnormal(e.message), !1;
        }
    }
    isOpen() {
        return null != this.fd;
    }
    close() {
        if (this.isOpen()) try {
            this.fd = FS.closeSync(this.fd), this.fd = null;
        } catch (e) {
            terminal.abnormal(e.message), this.fd = null;
        }
    }
    writeText(e) {
        if (expect(e, 'String'), !this.isOpen()) return null;
        try {
            FS.writeSync(this.fd, e);
        } catch (e) {
            terminal.abnormal(e.message);
        }
    }
    writeBlock(e, t) {
        expect(e, 'Buffer'), expect(t, 'Number');
        try {
            FS.writeSync(this.fd, e, 0, t);
        } catch (e) {
            terminal.abnormal(e.message);
        }
    }
    writeUint32(e) {
        if (expect(e, 'Number'), aver(e < 4294967296), !this.isOpen()) return null;
        try {
            var t = new ArrayBuffer(4);
            new DataView(t).setUint32(0, e, !0);
            var r = new Uint8Array(t);
            FS.writeSync(this.fd, r);
        } catch (e) {
            terminal.abnormal(e.message);
        }
    }
    writeUint16(e) {
        if (expect(e, 'Number'), aver(e < 65536), !this.isOpen()) return null;
        try {
            var t = new ArrayBuffer(2);
            new DataView(t).setUint16(0, e, !0);
            var r = new Uint8Array(t);
            FS.writeSync(this.fd, r);
        } catch (e) {
            terminal.abnormal(e.message);
        }
    }
    writeUint8(e) {
        if (expect(e, 'Number'), aver(e < 256), !this.isOpen()) return null;
        try {
            var t = new ArrayBuffer(1);
            new DataView(t).setUint8(0, e, !0);
            var r = new Uint8Array(t);
            FS.writeSync(this.fd, r);
        } catch (e) {
            terminal.abnormal(e.message);
        }
    }
}