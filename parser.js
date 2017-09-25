"use strict"
const csvParser = require('csv-parse');
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

  toString(){
    //1,Lani,Rollins,blandit@quam.com,1-633-389-7173,2012-05-10T03:53:40-07:00
    let result = '';
    result += `${this.first_name},${this.last_name},${this.email},${this.phone},${this.created_at}`;
    return result;
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

  addPerson(person) {
    // read file
    let tampunganExistingData = fs.readFileSync(this._file, 'utf8');
    let number = tampunganExistingData.split('\n').length;
    //console.log(number);
    // write the existing file
    let newData = `${tampunganExistingData}\n${number},${person.toString()}`
    fs.writeFileSync(this._file, newData);

  }

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person());

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
