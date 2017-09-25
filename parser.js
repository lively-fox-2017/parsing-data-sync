"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, first_name, last_name, email, phone, created_at){
    this.id = id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.email = email,
    this.phone = phone,
    this.created_at = created_at
    
  }
 
}

  let Person1 = new Person ();
  console.log(Person1.data);


class PersonParser  {

  constructor(file) {
    this._file = file,
    this._people = [];
    this.peopleBaru = ''
    
  }

  panggil (){
   
    var data = fs.readFileSync(this._file).toString().split("\n");
    
    for(var i =1; i < data.length; i++){
      let indeks = data[i].split(',');
      let value = new Person (indeks[0],indeks[1],indeks[2],indeks[3],indeks[4],indeks[5]);
      this._people.push(value);
      
    }
     return this._people;
  }


  addPerson(obj) {
   
   this._people.push(obj);
   this.peopleBaru =  '\n' + obj.id + ',' + obj.first_name + ',' + obj.last_name + ',' + obj.email + ',' + obj.phone + ',' + obj.created_at
   return this._people;
  }

  save (){
    fs.appendFileSync('people.csv', this.peopleBaru, 'utf8')
  }


  get people() {
    return this._people
  }
}





var fs = require('fs')
let parser = new PersonParser('people.csv')
console.log(parser.panggil())

//console.log(parser.convObj())

parser.addPerson(new Person(201,'Azharie','Muhammad','azharie@muhammad','082248467118',new Date()))
parser.addPerson(new Person(202,'Muhammad','Azharie','azharie@gmail','082248467118',new Date ()))
console.log(parser.people[200])
console.log(parser.peopleBaru)
parser.save()

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
