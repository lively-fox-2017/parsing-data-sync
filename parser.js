"use strict"
const fs = require('fs');
const faker = require('faker');

class Person {
    constructor(firstName, lastName, email, phone, dateCreated) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.dateCreated = new Date().toUTCString();
    }
}

class PersonParser {
    constructor(file) {
        this._file = file;
        this._people = null;
    }

    readInput() {
        const input = fs
                        .readFileSync(this._file)
                        .toString()
                        .split('\n')
                        .map(person => {
                            person = person.split(',');
                            // date is at index 5
                            person[5] = new Date(person[5]).toUTCString();
                            return person;
                        });

        this._header = input.slice(0, 1)[0];
        this._people = input.slice(1, input.length);
    }

    get people() {
        return this._people;
    }

    get file() {
        return this._file;
    }

    addPerson(person) {
        // id is at index 0 of person arrays in people array
        // id is string, so parse it to number first, add 1 
        // the parse it back to string
        const id = (Number(this._people.slice(-1)[0][0]) + 1).toString();
        const newPerson = [
                            id, 
                            person.firstName, 
                            person.lastName, 
                            person.email, 
                            person.phone, 
                            person.dateCreated
                        ];

        return this._people.push(newPerson);
    }

    save() {
        // write to csv
        const formattedHeader = this._header.join(',') + '\n';
        const formattedPeople = this._people
                                            .map(person => {
                                                person[5] = new Date(person[5]).toISOString();
                                                return person.join(',');
                                            })
                                            .join('\n');
        
        const formatted = formattedHeader + formattedPeople;
        fs.writeFileSync(this._file, formatted); 
    }
}

const fakeIt = () => {
    const randFirstName = faker.name.firstName();
    const randLastName = faker.name.lastName();
    const randEmail = faker.internet.email();
    const randPhone = faker.phone.phoneNumberFormat(2);

    return new Person(randFirstName, randLastName, randEmail, randPhone);
}

const addRandomPersons = num => {
    for (let i = 0; i < num; i++) parser.addPerson(fakeIt());
}

let parser = new PersonParser('people.csv');
parser.readInput();
addRandomPersons(100);
parser.save();

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)






