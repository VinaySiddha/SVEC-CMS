// Polyfill for File API in Node.js environments
// This fixes the "ReferenceError: File is not defined" error with undici/wrangler

if (typeof global !== 'undefined' && !global.File) {
  // Use a basic File polyfill if not available
  try {
    // Try to use the native File API if available
    if (typeof require !== 'undefined') {
      const { File } = require('node:buffer');
      global.File = File;
    }
  } catch (error) {
    // Fallback polyfill for File API
    class FilePolyfill {
      constructor(fileBits, fileName, options = {}) {
        this.name = fileName || '';
        this.lastModified = Date.now();
        this.type = options.type || '';
        this.size = 0;
        
        if (fileBits && Array.isArray(fileBits)) {
          const totalSize = fileBits.reduce((sum, chunk) => {
            if (typeof chunk === 'string') return sum + chunk.length;
            if (chunk.byteLength !== undefined) return sum + chunk.byteLength;
            return sum;
          }, 0);
          this.size = totalSize;
        }
      }
      
      stream() {
        // Basic stream implementation
        return new ReadableStream();
      }
      
      arrayBuffer() {
        return Promise.resolve(new ArrayBuffer(0));
      }
      
      text() {
        return Promise.resolve('');
      }
      
      slice(start = 0, end = this.size, contentType = '') {
        return new FilePolyfill([], this.name, { type: contentType });
      }
    }
    
    global.File = FilePolyfill;
  }
}

// Also ensure FormData is available
if (typeof global !== 'undefined' && !global.FormData) {
  try {
    const { FormData } = require('formdata-polyfill/esm');
    global.FormData = FormData;
  } catch (error) {
    // Basic FormData polyfill
    global.FormData = class FormData {
      constructor() {
        this._data = new Map();
      }
      
      append(name, value, filename) {
        this._data.set(name, { value, filename });
      }
      
      get(name) {
        const entry = this._data.get(name);
        return entry ? entry.value : null;
      }
      
      has(name) {
        return this._data.has(name);
      }
      
      delete(name) {
        this._data.delete(name);
      }
      
      entries() {
        return this._data.entries();
      }
      
      keys() {
        return this._data.keys();
      }
      
      values() {
        return Array.from(this._data.values()).map(entry => entry.value);
      }
    };
  }
}

module.exports = {};