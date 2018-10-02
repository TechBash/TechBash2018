"use strict";
var GoodBook = /** @class */ (function () {
    function GoodBook(Author, Title) {
        this.Author = Author;
        this.Title = Title;
        this._currentPage = 0;
    }
    GoodBook.prototype.displayCurrentPage = function () { }; // Book stuff
    GoodBook.prototype.turnPage = function () { }; // Book stuff
    GoodBook.prototype.goToPage = function (aPage) { }; //Book stuff
    return GoodBook;
}());
var ConsoleBookPrinter = /** @class */ (function () {
    function ConsoleBookPrinter() {
    }
    ConsoleBookPrinter.prototype.print = function (aBook) { };
    return ConsoleBookPrinter;
}());
var BookSaver = /** @class */ (function () {
    function BookSaver() {
    }
    BookSaver.prototype.save = function (aBook) {
    };
    return BookSaver;
}());
