class GoodBook {
  private _currentPage: number = 0;

  constructor(public Author: string, public Title: string) {}

  public displayCurrentPage() {} // Book stuff
  public turnPage() {} // Book stuff
  public goToPage(aPage: number) {} //Book stuff
}

interface IBookPrinter {
  print(aBook: GoodBook): void;
}

interface IBookSaver {
  save(aBook: GoodBook): void;
}

class ConsoleBookPrinter implements IBookPrinter {
  print(aBook: GoodBook): void {}
}

class BookSaver implements IBookSaver {
    save(aBook: GoodBook): void {

  }
}
