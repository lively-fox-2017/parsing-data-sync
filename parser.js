"use strict"

const fs = require('fs');
const faker = require('faker');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(first_name, last_name, email, phone){
	this.first_name = first_name;
	this.last_name = last_name;
	this.email = email;
	this.phone = phone;
	this.created_at = new Date();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = null;
	this._add = "";
  }

  set people(newPeople){
	let arrPeople = [];
	for (let i = 1; i < this._file.length; i++){
		let peoplePecah = newPeople[i].split(",");
		arrPeople.push({id:peoplePecah[0], first_name:peoplePecah[1], last_name:peoplePecah[2], email:peoplePecah[3], phone:peoplePecah[4], created_at:peoplePecah[5]});
	}
	
	this._people = arrPeople;
  }

  get people() {
    return this._people;
  }

  addPerson(personBaru) {
	let id = this._people.length-1 + 1;
	let sebaris = id + "," + personBaru.first_name + "," + personBaru.last_name + "," + personBaru.email + "," + personBaru.phone + "," + personBaru.created_at.toISOString()+";\n";
	
	this._add += sebaris;
	
	let kata = this._add.split(",");
	this._people.push({id:kata[0], first_name:kata[1], last_name:kata[2], email:kata[3], phone:kata[4], created_at:kata[5]});
	
	return this._add;
  }
  
  save(){
	let addFile = fs.appendFileSync('people.csv', this._add);
  }

}

let isiFile = fs.readFileSync('people.csv').toString().split("\n");
  
let parser = new PersonParser(isiFile);
parser.people = isiFile;
// parser.addPerson(new Person("redha", "putra", "putra.redha@gmail.com", "082123081949"));
// parser.addPerson(new Person("anton", "martin", "putra.redha@gmail.com", "082123081949"));
parser.addPerson(new Person(faker.name.findName(), faker.name.findName(), faker.internet.email(), faker.phone.phoneNumberFormat()));
parser.addPerson(new Person(faker.name.findName(), faker.name.findName(), faker.internet.email(), faker.phone.phoneNumberFormat()));
parser.save();
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);