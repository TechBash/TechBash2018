// create new array of Simpsons
const people = [
    { name: "Bart Simpson", age: 10, admission: 15 },
    { name: "Lisa Simpson", age: 8, admission: 12 },
    { name: "Marge Simpson", age: 36, admission: 18 },
    { name: "Maggie Simpson", age: 1, admission: 5 },
    { name: "Homer Simpson", age: 39, admission: 20 }
];

let totalCost = people.reduce((sum, person) => sum + person.admission, 0);

// let totalCost = 0;
// for (let i = 0; i < people.length; i++) {
//     totalCost = totalCost + people[i].admission;
// }

console.log("Total cost for the Simpsons: $" + totalCost);

