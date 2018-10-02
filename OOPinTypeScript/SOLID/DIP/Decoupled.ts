interface ICompresser {
  compress(aString: string): string;
}

class decoupledCompressionService {
  private _compressor: ICompresser;

  constructor(aCompressor: ICompresser) {
    this._compressor = aCompressor;
  }

  compress(inString: string): string {
    return this._compressor.compress(inString);
  }
}

class GoodCompressor implements ICompresser {
  compress(aString: string): string {
    return 'x';
  }
}

class BadCompressor implements ICompresser {
  compress(aString: string): string {
    return 'qpoiuwerjo;lkcvn;alkshgpoierienlkwdnfcnva;skdhfpqeiypqioeh;asdnf;dlkshfpqweoionw';
  }
}

var bad = new decoupledCompressionService(new BadCompressor());
console.log(bad.compress('somestring'));

var good = new decoupledCompressionService(new GoodCompressor());
console.log(good.compress('somestring'));
