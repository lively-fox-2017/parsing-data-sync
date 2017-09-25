"use strict"

let fs = require('fs');
let faker = require('faker');

class Person {

  constructor(firstName, lastName, email, phone, createdAt, id = null) {

    this.id        = null;
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.phone     = phone;
    this.createdAt = createdAt;

  }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this._peopleCSV = '';
  }

  get people() {

    return this._people;

  }

  get file() {

    return this._file;

  }

  get peopleCSV() {

    return this._peopleCSV.join('\n');

  }

  readFile() {

    let readFromCSV = fs.readFileSync(this._file).toString().split('\n');

    this._peopleCSV = readFromCSV;

    let records = [];

    for (let i = 1; i < readFromCSV.length; i++) {

      records.push(readFromCSV[i].split(','));

    }

    this._people = records;

  }

  addPerson(person) {

    let newRecord = [

      // Auto increment if person.id = null
      person.id || parseInt(this._people[this._people.length - 1][0]) + 1,
      person.firstName,
      person.lastName,
      person.email,
      person.phone,
      person.createdAt,

    ];

    this._people.push(newRecord);

    this._peopleCSV.push(newRecord.toString());

  }

  save() {

    fs.writeFileSync(this._file, this.peopleCSV);

    console.log('Saved!');

  }

  generateFakes(numberOfPeople = 1) {

    let date = new Date;

    for (let i = 0; i < numberOfPeople; i++) {

      let newRecord = [

        parseInt(this._people[this._people.length - 1][0]) + 1,
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        faker.phone.phoneNumber(),
        date.toISOString()

      ];

      this._people.push(newRecord);

      this._peopleCSV.push(newRecord.toString());

    }

  }

}

let parser = new PersonParser('people.csv');

let date = new Date;

let dimitri = new Person(

  'Dimitri',
  'Wahyudiputra',
  'deathmitri@gmail.com',
  '+6287702766658',
  date.toISOString()

);

parser.readFile();
parser.addPerson(dimitri);

// Faker
parser.generateFakes(10);

parser.save();

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
