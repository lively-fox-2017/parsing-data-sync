"use strict"
const fs = require('fs');
const faker = require('faker');

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
    this._people.push(person);
  }

  save() {
    let str = '';
    this._people.forEach((obj) => {
      for (var key in obj) {
        if (key == 'created_at')
          str += obj[key].toISOString();
        else
          str += obj[key];
        str += ',';
      }
      str = str.slice(0, -1);
      str += '\r\n';
    });
    str = str.slice(0, -4);
    fs.writeFileSync(this._file, str);
  }
}

let parser = new PersonParser('./people2.csv')
parser.parseFile();
console.log(require('util').inspect(parser.people, {
  maxArrayLength: null
}));
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
parser.addPerson(new Person(faker.random.number(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.phone.phoneNumberFormat(), faker.date.recent()));
parser.save();
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
console.log(require('util').inspect(parser.people, {
  maxArrayLength: null
}));
