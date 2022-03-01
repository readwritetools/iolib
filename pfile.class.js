/* Copyright (c) 2022 Read Write Tools. */
import FS from 'fs';

import terminal from 'softlib/terminal.js';

import expect from 'softlib/expect.js';

export default class Pfile {
    constructor(t) {
        null == t && (t = ''), 'Pfile' == t.constructor.name || 'Object' == t.constructor.name && '_filename' in t ? this._copyConstructor(t) : this._normalConstructor(t), 
        Object.seal(this);
    }
    _normalConstructor(t) {
        expect(t, 'String'), this.setPath(t);
    }
    _copyConstructor(t) {
        expect(t, 'Pfile'), this._filename = t._filename;
    }
    get name() {
        return this._filename;
    }
    setPath(t) {
        return expect(t, 'String'), this._filename = Pfile.posixStyle(t), this;
    }
    addPath(t) {
        expect(t, [ 'String', 'Pfile' ]), 'Pfile' == t.constructor.name && (t = t.name), 
        t = Pfile.posixStyle(t);
        var e = this._filename.length;
        return e > 0 && '/' != this._filename.charAt(e - 1) ? this._filename += '/' + t : this._filename += t, 
        this.canonicalize(), this;
    }
    addPathBefore(t) {
        expect(t, 'String'), t = Pfile.posixStyle(t), this.isAbsolutePath() && terminal.logic(`Attempting to add the path "${t}" before the absolute filename "${this._filename}" is probably not what you want.`);
        var e = t.length;
        return e > 0 && '/' != t.charAt(e - 1) ? this._filename = t + '/' + this._filename : this._filename = t + this._filename, 
        this.canonicalize(), this;
    }
    canonicalize() {
        this._filename = this._filename.replace('/./', '/'), this._filename = this._filename.replace('//', '/');
        for (var t = !0; t; ) t = this.removeDoubleDots();
        var e = this._filename.length;
        e > 1 && '/' == this._filename.charAt(e - 1) && (this._filename = this._filename.substr(0, e - 1));
    }
    removeDoubleDots() {
        var t = this._filename.split('/');
        for (let e = 1; e < t.length - 1; e++) if ('..' != t[e - 1] && '..' == t[e]) return t.splice(e - 1, 2), 
        this._filename = t.join('/'), !0;
        return !1;
    }
    static getCwd() {
        return Pfile.posixStyle(process.cwd());
    }
    makeAbsolute(t) {
        return this.isAbsolutePath() ? this : (t = null == t ? Pfile.getCwd() : Pfile.posixStyle(t), 
        expect(t, 'String'), 0 == this._filename.length ? (this._filename = t, this) : new Pfile(t).isAbsolutePath() ? (this.addPathBefore(t), 
        this) : (terminal.logic(`Attempting to make "${this._filename}" absolute by prefixing it with the non-absolute path "${t}" won't work.`), 
        this));
    }
    getFQN() {
        return this._filename;
    }
    getPath() {
        if (this.isDirectory()) return this._filename;
        var t = this._filename.split('/');
        return t.splice(0, t.length - 1).join('/');
    }
    getFilename() {
        if (this.isDirectory()) return '';
        var t = this._filename.split('/');
        return t[t.length - 1];
    }
    getStem() {
        var t = this.getFilename(), e = t.split('.');
        return e.length <= 1 || 2 == e.length && 0 == e[0].length ? t : e.splice(0, e.length - 1).join('.');
    }
    getExtension() {
        var t = this.getFilename().split('.');
        return t.length <= 1 || 2 == t.length && 0 == t[0].length ? '' : t[t.length - 1];
    }
    addExtension(t) {
        return this._filename = `${this._filename}.${t}`, this;
    }
    replaceExtension(t) {
        var e = this.getPath(), i = this.getStem();
        return this._filename = `${e}/${i}.${t}`, this;
    }
    exists() {
        try {
            return FS.accessSync(this._filename, FS.constants.F_OK), !0;
        } catch (t) {
            return 'ENOENT' != t.code && ('EACCES' != t.code && 'ENOTDIR' != t.code);
        }
    }
    isReadable() {
        try {
            return FS.accessSync(this._filename, FS.constants.R_OK), !0;
        } catch (t) {
            return 'EACCES' != t.code;
        }
    }
    isWritable() {
        try {
            return FS.accessSync(this._filename, FS.constants.W_OK), !0;
        } catch (t) {
            return 'EACCES' != t.code;
        }
    }
    isExecutable() {
        try {
            return FS.accessSync(this._filename, FS.constants.X_OK), !0;
        } catch (t) {
            return 'EACCES' != t.code;
        }
    }
    unlinkFile() {
        try {
            return !(!this.exists() || !this.isFile()) && (FS.unlinkSync(this._filename), !0);
        } catch (t) {
            return !1;
        }
    }
    rmDir() {
        try {
            return !(!this.exists() || !this.isDirectory()) && (FS.rmdirSync(this._filename), 
            !0);
        } catch (t) {
            return !1;
        }
    }
    mkDir() {
        if (this.exists()) return !0;
        var t = new Pfile(this);
        t.makeAbsolute();
        var e = t._filename.split('/');
        e[0].length > 1 && ':' == e[0].charAt(1) && (e[0] = e[0].substr(2));
        var i = new Pfile('/');
        for (let t = 0; t < e.length; t++) if (e[t].length > 0 && (i.addPath(e[t]), !i.exists())) try {
            FS.mkdirSync(i.getFQN());
        } catch (t) {
            return !1;
        }
        return !0;
    }
    isAbsolutePath() {
        return 0 != this._filename.length && ('/' == this._filename.charAt(0) || this._filename.length > 1 && ':' == this._filename.charAt(1));
    }
    isRelativePath() {
        return 0 != this._filename.length && !this.isAbsolutePath();
    }
    isDottedPath() {
        return 0 != this._filename.length && '.' == this._filename.charAt(0);
    }
    isDirectory() {
        try {
            return FS.lstatSync(this._filename).isDirectory();
        } catch (t) {
            return !1;
        }
    }
    isFile() {
        try {
            return FS.lstatSync(this._filename).isFile();
        } catch (t) {
            return !1;
        }
    }
    isSymbolicLink() {
        try {
            return FS.lstatSync(this._filename).isSymbolickLink();
        } catch (t) {
            return !1;
        }
    }
    getFileSize() {
        try {
            return FS.statSync(this._filename).size;
        } catch (t) {
            return !1;
        }
    }
    getModificationTime() {
        try {
            return FS.statSync(this._filename).mtime;
        } catch (t) {
            return !1;
        }
    }
    isSpecialDirectory() {
        return '.' == this._filename || '..' == this._filename;
    }
    touch() {
        try {
            var t = new Date;
            return FS.utimesSync(this._filename, t, t), !0;
        } catch (t) {
            return !1;
        }
    }
    static posixStyle(t) {
        return expect(t, 'String'), t.replace(/\\/g, '/');
    }
    static windowsStyle(t) {
        return expect(t, 'String'), t.replace(/\//g, '\\');
    }
}