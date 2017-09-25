"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    let fileParsed = fs.readFileSync(file).toString().split('\r\n');
    fileParsed.forEach((value, key) => {
      if (key !== 0) {
        this._people.push(value);
      }
    })
  }

  get people() {
    return this._people
  }

  addPerson(person) {
    let str = '\n' + person.id + ',' + person.first_name + ',' + person.last_name + ',' + person.email + ',' + person.phone + ',' + person.created_at;
    fs.appendFileSync(this._file, str);
  }

}

let parser = new PersonParser('./people.csv')
// console.log(parser.people);
parser.addPerson(new Person(201, 'Saptanto', 'Sindu', 'Saptanto.sindu@gmail.com', '08999175696', '2012-02-22T10:09:03-08:00'))
console.log(parser._people[201]);
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
