/* Copyright (c) 2022 Read Write Tools. */
import FS from 'fs';

import terminal from '../softlib/terminal.js';

import expect from '../softlib/expect.js';

export default class BinaryReader {
    constructor() {
        this.fd = null, this.readSize = 8192, this.buffer = new Buffer(this.readSize), this.bufferLength = null, 
        this.blockOffset = null, this.bufferOffset = null, Object.seal(this), this.initialize();
    }
    initialize() {
        this.buffer.fill(0), this.bufferLength = 0, this.blockOffset = 0, this.bufferOffset = 0;
    }
    open(t) {
        expect(t, [ 'String', 'Pfile' ]), 'Pfile' == t.constructor.name && (t = t.name);
        try {
            return this.fd = FS.openSync(t, 'r'), this.initialize(), !0;
        } catch (t) {
            return terminal.abnormal(t.message), !1;
        }
    }
    isOpen() {
        return null != this.fd;
    }
    close() {
        if (this.isOpen()) try {
            this.fd = FS.closeSync(this.fd), this.fd = null;
        } catch (t) {
            terminal.abnormal(t.message), this.fd = null;
        }
    }
    readBlock() {
        if (!this.isOpen()) return !1;
        try {
            return this.buffer.fill(0), this.bufferLength = FS.readSync(this.fd, this.buffer, 0, this.readSize, this.blockOffset), 
            this.blockOffset += this.bufferLength, this.bufferOffset = 0, this.bufferLength > 0;
        } catch (t) {
            return terminal.trace(t.message), this.bufferLength = 0, this.bufferOffset = 0, 
            !1;
        }
    }
}