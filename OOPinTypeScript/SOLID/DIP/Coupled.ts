class compressionService {
  private compressString(): string {
    return 'crappy compression algorithm';
  }

  compress(inString: string): string {
    return this.compressString();
  }
}

var cs = new compressionService();
console.log('Compressed: ', cs.compress('blahblah'));

// How to do better compression?
