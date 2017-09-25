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
    this._people = null
  }

  get people() {
    return this._people
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
