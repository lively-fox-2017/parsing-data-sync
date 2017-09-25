"use strict"
const fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(firstName, lastName, email, phone, createdAt) {
    this._id = 0;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = createdAt;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName) {
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get phone() {
    return this._phone;
  }

  set phone(phone) {
    this._phone = phone;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    this.fillData();
  }
  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  addPerson(person) {
    var lastId = this._people[this._people.length - 1].id;
    person.id = parseInt(lastId) + 1;
    this._people.push(person);
  }

  fillData() {
    var data = fs.readFileSync(this._file).toString().split('\n');
    for (var i = 1; i < data.length-1; i++) {
      var personData = data[i].split(',');
      var obj = new Person();
      obj.id = personData[0];
      obj.firstName = personData[1];
      obj.lastName = personData[2];
      obj.email = personData[3];
      obj.phone = personData[4]
      obj.createdAt = new Date(personData[5]);
      this._people.push(obj);
    }
  }

  save() {
    var text = "id,first_name,last_name,email,phone,created_at\n";
    for (var i = 0; i < this._people.length; i++) {
      text += this.people[i].id + ",";
      text += this.people[i].firstName + ",";
      text += this.people[i].lastName + ",";
      text += this.people[i].email + ",";
      text += this.people[i].phone + ",";
      text += this.people[i].createdAt.toISOString();
      text += "\n";
    }
    fs.writeFile('people.csv', text, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }
}

let parser = new PersonParser('people.csv')
var today = new Date();
parser.addPerson(new Person('Tes', 'Tes2', 'tes@tes.tes', '111-222-333', today))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save()
