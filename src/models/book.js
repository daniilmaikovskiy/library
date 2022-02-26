const uidGenerator = require('node-unique-id-generator');

class Book {
  constructor(obj = {}, id = uidGenerator.generateUniqueId()) {
    this.id = id;
    this.title = obj.title || '';
    this.description = obj.description || '';
    this.authors = obj.authors || '';
    this.favorite = obj.favorite || '';
    this.fileCover = obj.fileCover || '';
    this.fileName = obj.fileName || '';
    this.fileBook = obj.fileBook || '';
  }
}

module.exports = { Book };