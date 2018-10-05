// create new array of Simpsons
// Who can drink at Moe's?
const people = [
    { name: "Bart", age: 10 },
    { name: "Lisa", age: 8 },
    { name: "Marge", age: 36 },
    { name: "Maggie", age: 1 },
    { name: "Homer", age: 39 }
];

const drinkingAge = 21;
const adults = people.filter((person => person.age >= drinkingAge));

// let adults = [];

// for(let i = 0; i < people.length; i++) {
//     if (people[i].age >= drinkingAge) {
//         adults.push({ name: people[i].name, age: people[i].age });
//     }
// }


console.log("people: "+ JSON.stringify(people));
console.log();
console.log("adults: " + JSON.stringify(adults));
