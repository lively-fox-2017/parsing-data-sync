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
        this._people = []
        this._newPeople = ''

    }

    call() {
        // import data file
        const fs = require('fs')
        let data = fs.readFileSync('people.csv', 'utf8').toString().split('\n')
            //console.log(data);

        // array to object 
        for (let i = 0; i < data.length; i++) {
            let idx = data[i].split(',')
            console.log(idx[1])
            let valProp = new Person(idx[0], idx[1], idx[2], idx[3], idx[4], new Date(idx[5]))
            this._people.push(valProp)
        }
    }

    get people() {
        return this._people
    }

    addPerson(add) {
        // push berdasarkan parameter
        this._people.push(add)
        console.log(add.id)
            //this._newPeople = '\n' + add.id + ',' + add.id + ','
        this._newPeople = `\n ${add.id}, ${add.first_name}, ${add.last_name}, ${add.email}, ${add.phone}, ${add.created_at}`
        return this._people // this._newPeople
    }

    save() {

    }

}

let parser = new PersonParser('people.csv')

parser.call()
parser.addPerson(new Person(201, 'gogon', 'asdf', 'gogon@gmail.com', '123456789', new Date()))
parser.save()

console.log(parser.people)
console.log(parser.people[11])
    // // input file 
    // const fs = require('fs')
    // let data = fs.readFileSync('people.csv', 'utf8').toString().split('\n')
    // console.log(data.length);

// // to array 2d
// let dataF = []
// for (var i = 0; i < data.length; i++) {
//     dataF.push(data[i].split(','))
// }

// // to objek
// let dataFixed = []
// for (let r = 1; r < dataF.length; r++) {
//     let obj = {}
//     for (let c = 0; c < dataF[0].length; c++) {
//         //console.log(dataF[r][c])
//         obj[dataF[0][c]] = dataF[r][c]
//     }
//     dataFixed.push(obj)
// }

//console.log(dataF)
//console.log(dataFixed)

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)