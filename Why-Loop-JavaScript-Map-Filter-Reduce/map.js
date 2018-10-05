// create new array of the Simpsons full name
const people = [
    { name: "Bart", age: 10 },
    { name: "Lisa", age: 8 },
    { name: "Marge", age: 36 },
    { name: "Maggie", age: 1 },
    { name: "Homer", age: 39 }
];

const fullNames = people.map((person) => { return { name: person.name + " Simpson", age: person.age }; });
// let fullNames = [];

// for (let i = 0; i < people.length; i++) {
//     let person = {
//         name: people[i].name + " Simpson",
//         age: people[i].age
//     }
//     fullNames.push(person);
// }

console.log("first names: "+ JSON.stringify(people));
console.log();
console.log("full names: " + JSON.stringify(fullNames));
