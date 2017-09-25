"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  //id,first_name,last_name,email,phone,created_at
    constructor(id, first_name, last_name, email, phone, created_at){
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
    this._file = file;
    this._people = [];
  }

  get people() {
    return this._people;
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let person = new Person(id, first_name, last_name, email, phone, created_at)
    this.people.push(person)
  }

  parsingpeople(){
    let arrnew = fs.readFileSync(this._file, 'utf-8').split('\n');
    // console.log(arrnew);
    for (let i = 1; i < arrnew.length; i++){
      let parsingarr = arrnew[i].split(',');
      let person = new Person(parsingarr[0], parsingarr[1], parsingarr[2], parsingarr[3], parsingarr[4], parsingarr[5]);
      this._people.push(person)
    }
    return this._people;
  }

  save(){
    let tampung = ['id, first_name, last_name, email, phone, created_at' ];
    for (let i = 0; i < this._people.length; i++){
      let temp = `${this._people[i]._id}, ${this._people[i]._first_name}, ${this._people[i]._last_name}, ${this._people[i]._email}, ${this._people[i]._phone}, ${this._people[i]._created_at}`;
      tampung.push(temp);
    }
    fs.writeFileSync('people.csv', tampung.join('\n'))
  }

}

let parser = new PersonParser('people.csv');
parser.parsingpeople();
parser.addPerson('201', 'Hacktiv8', 'Super', 'phase_1@hacktiv8.com', '02134567852', new Date());
parser.save();
console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`);
