"use strict"

class Person {
  constructor(first, last, email, phone, created = 10) {
    this.first_name = first;
    this.last_name = last;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  set people(data) {
  let dataSplit;
    for (let i = 1; i < this._file.length; i++) {
     dataSplit = this._file[i].split(',');
    this._people.push({'id' :dataSplit[0],'first_name' :dataSplit[1], 'last_name' :dataSplit[2], 'email' :dataSplit[3], 'phone': dataSplit[4], 'created_at' : dataSplit[5]});
    }

    return this._people;
  }
  get people() {
    return this._people;
  }
  addPerson(data) {
    let id = this._people.length+1;
    let newData ='\n'+id+','+data.first_name+','+data.last_name+','+data.email+','+data.phone+','+data.created_at.toISOString();
    this._people.push(newData);
  }

  save(){
    fs.appendFileSync('people.csv',this._people[this._people.length-1]);
  }

}


let fs = require('fs');
let data = fs.readFileSync('people.csv').toString().split('\n');
let parser = new PersonParser(data);
parser.people = data;
parser.addPerson(new Person('Amelia', 'Rahman', 'amel.rahman5@gmail.com', '081318352537'))
parser.save();
parser.addPerson(new Person('Amelia2', 'Rahman', 'amel.rahman5@gmail.com', '081318352537'))
parser.save();
parser.addPerson(new Person('Amelia3', 'Rahman', 'amel.rahman5@gmail.com', '081318352537'))
parser.save();
console.log(parser.people);

