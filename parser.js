"use strict"
let fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
    this._arrData = fs.readFileSync(this._file, 'UTF-8' ).split('\n');
  }

  readFile() {
    for (let i = 0; i < this._arrData.length; i++) {
      let Data = this._arrData[i].split(',')
      let tanggal = new Date()
      let person = new Person(Data[0],Data[1],Data[2],Data[3],Data[4],tanggal)
      this._people.push(person)
    }
    return this._people
  }
  get people() {
    this._people = this.readFile()
    return {size:this._people.length, file: this._file}
  }

  addPerson(obj) {
    return this._people.push(obj)
  }

  save(){
    fs.appendFileSync('./people.csv', this._people+'\n')
  }

}

let parser = new PersonParser('people.csv')
//parser.readFile();
parser.addPerson(['201', 'kalibani', 'Alibani', 'kalibani.ka@gmail.com', '1-314-890-5249', new Date()])
parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
