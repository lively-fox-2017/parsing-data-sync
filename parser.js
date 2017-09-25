"use strict"
let fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, fName, lName, email, phone, createdAt){
    this.id = id
    this.first_name = fName
    this.last_name = lName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
    this._data = fs.readFileSync(this._file, 'utf8').split('\n')
    this._newData = ''
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  addPerson(data) {
    this._people.push(data)
    this._newData += data.id+','+
                    data.first_name+','+
                    data.last_name+','+
                    data.email+','+
                    data.phone+','+
                    data.created_at+'\n'
  }

  readFile() {
    for (let i = 0; i < this._data.length-1; i++) {
      let dataSplit = this._data[i].split(',')
      let person = new Person(dataSplit[0],dataSplit[1],dataSplit[2],dataSplit[3],dataSplit[4],new Date())
      this._people.push(person);
    }
  }

  save() {
    fs.appendFileSync('people.csv', this._newData, 'utf8')
  }
}

let parser = new PersonParser('people.csv');
parser.readFile();

// add new people data
// parser.addPerson(new Person(parser.people.length, 'Nandi', 'Patur', 'enim@Aenean.edu', '1-645-511-7768', '2012-10-11T04:22:20-07:00'));
// parser.save();

console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
