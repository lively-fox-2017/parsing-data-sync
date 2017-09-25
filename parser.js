"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    // console.log(this._people);
  }

  get people() {
    let obj = {
      people: this._people,
      size: this._people.length
    }
    return obj
  }

  get file() {
    return this._file
  }

  readFile() {
    let data = fs.readFileSync(this._file,'utf-8').split('\n')
    // console.log(data);

    for (var i = 1; i < data.length -1; i++) {
      let temp = data[i].split(',')
      // console.log(data);
      let orang = new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5])
      this._people.push(orang)
    }
    return this._people
  }

  addPerson(tambahOrang) {
    let tambah = tambahOrang

    this.tambah = tambahOrang
    return this.tambah
  }

  save() {
    fs.appendFileSync('people.csv', this.tambah + new Date() + '\n')
  }

}

let parser = new PersonParser('people.csv')
// parser.addPerson(['123','Mamih','tes','tes@gmail.com','1-373-588-1689', new Date()])
// parser.save()
parser.readFile()
// console.log(parser.people);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
