"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this._id = id;
    this._first_name = first_name;
    this._last_name = last_name;
    this._email = email;
    this._phone = phone;
    this._created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this._stringpeople = fs.readFileSync(this._file, 'UTF-8')
    this._arrpeople = this._stringpeople.split('\n')
  }

  createObj() {

    for (var i = 1; i < this._arrpeople.length; i++) {
      var namaorang = this._arrpeople[i].split(',');
      namaorang[5] = new Date(namaorang[5])
      var orang = new Person(namaorang[0], namaorang[1], namaorang[2], namaorang[3], namaorang[4], namaorang[5])
      this._people.push(orang);
    }
    return this._people
  }

  get people() {
    this._people = this.createObj()
    return { size: this._people.length, file: this._file };
  }

  addPerson(personplus) {
    var tambah = personplus
    this.tambah = tambah
    return this.tambah
  }

  save() {
    fs.appendFileSync('./people.csv', this.tambah + '\n');
  }

}

let parser = new PersonParser('people.csv')
// console.log(parser.people)
// console.log(parser.addPerson(['201', 'Prana', 'Kamal', 'kita@google.com', '191-984-89-89', '2012-13T45:08:22-09-2012']));
// parser.save()

console.log(`There are ${parser.people.size-1} people in the file '${parser.people.file}'.`)
