"use strict"
var fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  //Buat Key :
  constructor(id,first_name,last_name,email,phone,created_at){
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

  }

  get people() {
    return this._people
  }

  addPerson(dataBaru) {
    this._people.push(dataBaru)
  }

  Readfile(){
    let data = fs.readFileSync('people.csv','utf-8').toString().split('\n');
    for (var i = 1; i < data.length; i++) {
      let pisah = data[i].split(',')
      let arrData = new Person(pisah[0],pisah[1],pisah[2],pisah[3],pisah[4],pisah[5])
      this._people.push(arrData)
    }
    return this._people
  }

  Simpan(){
    var fs = require('fs')
    fs.appendFileSync('people.csv', this._people.toString() +'\n')
    console.log('Data Berhasil Disimpan');
  }

}
// AMBIL DATA PAKE READFILESYNC
let parser = new PersonParser('people.csv')
parser.addPerson([201,'Hary','Nugraha Putra','harynugrahaputra.com','082112831235',new Date()])
parser.Simpan();
parser.Readfile();

console.log(`There are ${parser.people.length-1} people in the file '${parser._file}'.`)
