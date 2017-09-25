"use strict"
let fs = require('fs');
class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.namadepan = first_name;
    this.namabelakakng = last_name;
    this.email = email;
    this.telepon = phone;
    this.pembuatan = created_at;
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this.parsing();
  }
  parsing() {
    this._people = [];

    // console.log(this._file);
    let parsing = fs.readFileSync(this._file).toString().split('\n');
    for (var c = 1; c < parsing.length-1; c++) {
      let index = parsing[c].split(',');
      let hasil = new Person(index[0], index[1], index[2], index[3], index[4], new Date(index[5]));
      this._people.push(hasil);
    }
    // let hasilParse = [];
    // for (let a = 1; a < arrayParsing.length; a++) {
    //   let hasil = {};
    //   for (let b = 0; b < arrayParsing[a].length; b++) {
    //     hasil[arrayParsing[0][b]] = arrayParsing[a][b];
    //     // console.log(hasil);
    //   }
    //   // console.log(hasil);
    //   hasilParse.push(hasil);
    // }
    return this._people;
  }
  get people() {
    return this._people;
  }

  addPerson(databaru) {
    this._people.push(databaru);
  }
  save() {
    // console.log(this.people[200]);
    var tampung = "id,first_name,last_name,email,phone,created_at,\n";

    this.people.forEach(function (element) {
      tampung += element.id + ',';
      tampung += element.namadepan + ',';
      tampung += element.namabelakakng + ',';
      tampung += element.email + ',';
      tampung += element.telepon + ',';
      tampung += element.pembuatan + ',';
      tampung += '\n';
    }, this);
    // console.log(tampung);
    fs.writeFile('people.csv', tampung);
  }

}

let parser = new PersonParser('people.csv');
// let orang = new Person(this.parsing);
// parser._people = 
// let dataParse = new PersonParser();
// console.log(parser.parsing());
// 1,Lani,Rollins,blandit@quam.com,1-633-389-7173,2012-05-10T03:53:40-07:00
// console.log(parser.people);
// parser.people;
// console.log(parser.people[0].pembuatan.getDate());
parser.addPerson(new Person(201, 'Agustinus', 'Saja', 'vbagustinus@gmail.com', '085700009776', new Date()))
parser.save();
// console.log(parser.people);
// console.log(`There are ${parser.people.email} people in the file '${parser._file}'.`)