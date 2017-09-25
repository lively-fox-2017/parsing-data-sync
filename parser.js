"use strict"
var fs = require('fs')

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
        this._people = []
        this._newPeople = ''
    }

    call() {
        // import data file
        let data = fs.readFileSync('people.csv', 'utf8').toString().split('\n')
            //console.log(data);

        // array to object
        for (let i = 0; i < data.length; i++) {
            let idx = data[i].split(',')
                //console.log(idx[1])
            let valProp = new Person(idx[0], idx[1], idx[2], idx[3], idx[4], new Date(idx[5]))
            this._people.push(valProp)
        }
    }

    get people() {
        return this._people
    }

    addPerson(add) {
        // push berdasarkan parameter
        //let person =  new Person(add.id, add.first_name, add.last_name, add.email, add.phone, add.created_at)
        // this._newPeople = '\n' + add.id + ',' + add.first_name + ',' + add.last_name + ',' + add.email + ',' + add.phone + ',' + add.created_at
        // return this._People

        this._people.push(add)
        this._newPeople = '\n' + add.id + ',' + add.first_name + ',' + add.last_name + ',' + add.email + ',' + add.phone + ',' + add.created_at
        return this._people;
    }

    save() {
        // fs.appendFileSync
        //console.log(this._newPeople)
        // console.log((JSON.stringify(this._newPeople)).toString())
        // fs.writeFileSync('/Users/aditreza/Documents/hacktiv8/fase1/week2/1-senin/parsing-data-sync/people.csv', 'test', 'utf8')

        //fs.appendFileSync('people.csv', this._newPeople, 'utf8') <== 


        // next ==> lib Fake.js
    }

}

let parser = new PersonParser('people.csv')

parser.call()
    //parser.people
parser.addPerson(new Person(201, 'gogon', 'asdf', 'gogon@gmail.com', '123456789', new Date()))
    //parser.save()

console.log(parser.people)
    //console.log(parser.save())