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
    this.created_at = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }

  parseFile() {
    let fileParsed = fs.readFileSync(this._file).toString().split('\r\n');
    fileParsed.forEach((value, key) => {
      if (key !== 0) {
        let person = new Person(...value.split(','));
        this._people.push(person);
      }
    })
  }

  get people() {
    return this._people;
  }

  addPerson(person) {
    person.id = parseInt(this._people[this._people.length - 1].id) + 1;
    let str = person.id + ',' + person.first_name + ',' + person.last_name + ',' + person.email + ',' + person.phone + ',' + person.created_at.toISOString();
    this._people.push(str);
    str = '\r\n' + str;
    fs.appendFileSync(this._file, str);
  }
}

let parser = new PersonParser('./people.csv')
parser.parseFile();
console.log(require('util').inspect(parser.people, {
  maxArrayLength: null
}));
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
parser.addPerson(new Person(201, 'Saptanto', 'Sindu', 'Saptanto.sindu@gmail.com', '08999175696', '2012-02-22T10:09:03-08:00'))
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
