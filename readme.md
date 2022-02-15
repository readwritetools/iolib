












<figure>
	<img src='/img/libs/iolib/iolib-anthony-170289.png' width='100%' />
	<figcaption></figcaption>
</figure>

##### File system basics

# I/O Lib

## Text and binary file essential I/O


<address>
<img src='/img/48x48/rwtools.png' /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2015-08-21>Aug 21, 2015</time></address>



<table>
	<tr><th>Abstract</th></tr>
	<tr><td>The <span class=product>iolib</span> JavaScript library has functions for handling line-by-line text I/O, block-oriented binary I/O, and filesystem operations.</td></tr>
</table>

### Motivation

Reading and writing text files using line-oriented functions is a common need.
Handling block transfers of binary data is necessary for packed data formats.

Performing basic filesystem operations complements these two.

### Features

The `TextReader` class has a UTF-8 aware `getline` method for parsing a text file
one line at a time.

The `TextWriter` class has `putline` and `puts` methods to serialize to a text file.

The lower level `BinaryReader` reads a block of 8192 bytes, advancing the buffer
pointer with each read.

The `BinaryWriter` class has methods for writing Strings, Buffers, 4-bytes,
2-bytes, and 1-byte .

The `Pfile` class has methods for checking if a file exists; if it's a directory
or a symlink; if it's readable, writable, executable; and for assembling and
accessing parts of a file's path, basename, and extension.

### Installation

The <span>iolib</span> library may be installed directly from github or via
NPM.

```bash
[user@host]# npm install iolib
```

Sample usage of the libary in a node.js project:

```javascript
import {TextReader} from 'iolib';    
import {TextWriter} from 'iolib';    
import {BinaryReader} from 'iolib';    
import {BinaryWriter} from 'iolib';    
import {Pfile} from 'iolib';    
```

### Metadata

#### Dependencies

This library depends on <a href='https://www.npmjs.com/package/softlib'>softlib</a>
, which should be installed side-by-side.

#### Module exports


<table>
	<tr><td>ES modules</td> 		<td>true</td></tr>
	<tr><td>Common JS</td> 		<td>false</td></tr>
</table>

#### Suitability


<table>
	<tr><td>Browser</td> 			<td>none</td></tr>
	<tr><td>node.js</td> 			<td>API</td></tr>
</table>

#### Availability


<table>
	<tr><td><img src='/img/48x48/read-write-hub.png' alt='Read Write Hub logo' width=48 /></td>	<td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/libs/iolib.blue'>Read Write Hub</a></td></tr>
	<tr><td><img src='/img/48x48/git.png' alt='git logo' width=48 /></td>	<td>Source code</td> 			<td><a href='https://github.com/readwritetools/iolib'>github</a></td></tr>
	<tr><td><img src='/img/48x48/npm.png' alt='npm logo' width=48 /></td>	<td>Package installation</td> <td><a href='https://www.npmjs.com/package/iolib'>npm</a></td></tr>
</table>

#### License

The <span>iolib</span> library is licensed under the MIT License.

<img src='/img/blue-seal-mit.png' width=80 align=right />

<details>
	<summary>MIT License</summary>
	<p>Copyright © 2022 Read Write Tools.</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</details>

