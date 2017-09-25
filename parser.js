"use strict"

let fs = require("fs");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at + "Z");
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  readInput(){
    let result = fs.readFileSync("people.csv").toString().split("\n");
    let arr = [];
    for(var i = 0; i < result.length; i++){
      arr.push(result[i].split(","))
    }
    // console.log(arr);
    return this.arr = arr;
  }

  convertToObject(){
    for(var i = 1; i < this.arr.length; i++){
      let obj = new Person(this.arr[i][0],this.arr[i][1],this.arr[i][2],this.arr[i][3],this.arr[i][4],this.arr[i][5]);
      this._people.push(obj);
    }
  }

  get people() {
    return this._people
  }

  addPerson(newObj) {
    this._people.push(newObj);
  }

  save(){
    let str = "id,first_name,last_name,email,phone,created_at" + "\n";
    for(var i = 0; i < this.people.length; i++){
      str += this.people[i].id + ","
      str += this.people[i].first_name + ","
      str += this.people[i].last_name + ","
      str += this.people[i].email + ","
      str += this.people[i].phone + ","
      str += this.people[i].created_at.toISOString() + "\n";
    }
    console.log(str);
    fs.writeFile("test.csv",str);
  }
}

let parser = new PersonParser('people.csv')
parser.readInput();
parser.convertToObject();
parser.addPerson(new Person(201,"albert","agung","abc@abc.com","01823124",Date()));
parser.addPerson(new Person(202,"albert","agung","abc@abc.com","01823124",Date()));
parser.save()
// console.log(parser.people);
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
