"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
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
    this._people = null
  }

  parser() {
    var fs = require("fs")
    var data = fs.readFileSync(this._file, 'utf8')
    var arrData = data.split('\n')

    var arrHasil = []
    var arrObj = []

    for(var i = 0; i < arrData.length; i++) {
      arrHasil.push(arrData[i].split(','))
    }

    for(var i = 1; i < arrHasil.length; i++) {
      arrObj.push(new Person(arrHasil[i][0], arrHasil[i][1], arrHasil[i][2], arrHasil[i][3], arrHasil[i][4], new Date(arrHasil[i][5])))
    }

    this._people = arrObj
  }

  get people() {
    return this._people
  }

  addPerson(obj) {
    this._people.push(obj)
  }

  save() {
    var str = 'id,first_name,last_name,email,phone,created_at' + '\n'

    for(var i = 0; i < this._people.length; i++) {
      str = str + this._people[i].id + ',' + this._people[i].first_name + ',' + this._people[i].last_name + ',' + this._people[i].email + ',' + this._people[i].phone + ',' + this._people[i].created_at + '\n'
    }
    var fs = require("fs")
    fs.writeFileSync(this._file, str) //menulis file
  }

}

var a = new PersonParser('people.csv')

var udin = new Person('198','Blaze','Gould','lorem@Nullaeu.org','1-377-980-7889','2013-01-24T02:20:11-08:00')

a.parser();
console.log(a.people);
a.addPerson(udin)
a.save();
