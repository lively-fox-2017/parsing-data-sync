"use strict"

class Person {
    constructor(id, first_name, last_name, email ,phone ,created_at){

      this.id = id
      this.first_name = first_name
      this.last_name = last_name
      this.email = email
      this.phone = phone
      this.created_at = created_at
    }



    
  // Look at the above CSV file
  // What attributes should a Person object have?
  // var fs = require('fs')
  // var konten = fs.readFileSync('people.csv', 'utf8')
  // console.log(konten)

}

class PersonParser{

  constructor(file) {
    this._file = file
    this._fs = require('fs')
    this._data = this._fs.readFileSync(this._file, 'utf8')
    this._people = this.setParser()
    this.dataString = ''

  }

 
  get people() {
  return this._people
  }

  setParser(){
    let data = this._data.split('\n')
    let data2 = []
    let dataPeople = []

    for(var i = 0; i < data.length -1; i++){
      data2.push(data[i].split(','))
    }


    for(var i = 0; i < data2.length; i++){
      dataPeople.push(new Person(data2[i][0], data2[i][1], data2[i][2], data2[i][3], data2[i][4], new Date(data2[i][5])))
    }
   
    this._people = dataPeople
    // return JSON.stringify(this._people)
    return this._people
  }



  addPerson(data) {
    this._people.push(data)



  }

  save(){
// console.log(this._people)


  for(var i = 0; i < this._people.length; i++){
    // console.log(this.dataString)

    this.dataString+= this._people[i].id +','+this._people[i].first_name + ','+this._people[i].last_name+','+this._people[i].email+','+this._people[i].phone+','+this._people[i].created_at+'\n'
}

  this._fs.writeFileSync(this._file, this.dataString)

  }

  

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person('201','oke','oke','oke','1-702-580-4785',new Date()))
parser.addPerson(new Person('202','oke','oke','oke','1-702-580-4785',new Date()))

parser.save()

// console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)

