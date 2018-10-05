// chain: putting everything together
const people = [
    { name: "Bart", age: 10, admission: 15 },
    { name: "Lisa", age: 8, admission: 12 },
    { name: "Marge", age: 36, admission: 18 },
    { name: "Maggie", age: 1, admission: 5 },
    { name: "Homer", age: 39, admission: 20 }
];

// goes from left to right. filter first and then map
let result = people
                // give each person a last name
                .map(person => { return { 
                    name: person.name + " Simpson", 
                    age: person.age, 
                    admission: person.admission }; 
                })
                // find the adults
                .filter(person => person.age >= 18)
                // cost for adults
                 .reduce((sum,adult) => sum + adult.admission, 0);
                        
// console.log(people);
// console.log(result);
console.log("Total cost of admission for adults: $"+ result);

