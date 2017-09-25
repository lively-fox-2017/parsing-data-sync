"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, fn, ln, email, phone, createdAt){
    this.id = id
    this.fn = fn
    this.ln = ln
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this._arr = []
  }

  get people() {
    return this._people
  }

  readFile(){
    let read = fs.readFileSync(this._file, 'utf8')
    let splits = read.split('\n')
    let arr = []
    for(let i = 1; i < splits.length; i++){
      let splitCom = splits[i].split(',')
      let person = new Person(splitCom[0], splitCom[1], splitCom[2], splitCom[3], splitCom[4], splitCom[5])
      arr.push(person)
    }
    return arr
  }

  addPerson(add) {
    let addPer = add
    this._arr = addPer
    return this._arr
  }

  save(){
    fs.appendFileSync('./people.csv', this._arr + '\n')
  }

}

class Dates {
  
  date(){
    return new Date()
  }

}

let parser = new PersonParser('people.csv')
let date = new Dates()
console.log(parser.readFile())

console.log(parser.addPerson(['201','Kiplo','Brondongs','brondo@quam.com','1-666-999-7173',`${date.date()}`]))
parser.save()

// console.log(`There are ${parser.people} people in the file '${parser.file}'.`)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
