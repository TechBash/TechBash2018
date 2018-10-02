"use strict";
var BadBook = /** @class */ (function () {
    function BadBook(Author, Title) {
        this.Author = Author;
        this.Title = Title;
        this._currentPage = 0;
    }
    BadBook.prototype.displayCurrentPage = function () { }; // Book stuff
    BadBook.prototype.turnPage = function () { }; // Book stuff
    BadBook.prototype.goToPage = function (aPage) { }; //Book stuff
    BadBook.prototype.printCurrentPage = function () { }; // printing stuff
    BadBook.prototype.saveCurrentPage = function () { }; // saving stuff
    return BadBook;
}());
