class Person {
  public constructor(public firstName: string, public lastName: string) {}

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public WriteInfo(): void {
    console.log(this.fullName());
  }
}

class Employee extends Person {
  public constructor(
    afirstName: string,
    alastName: string,
    public Salary: number
  ) {
    super(afirstName, alastName);
  }

  public WriteInfo(): void {
    let s: string = `${this.fullName()} makes this much money: -- $${
      this.Salary
    }`;
    console.log(s);
  }
}

function writePolymorphicPerson() {
  let polymorphicPerson: Person = new Employee('Polly', 'Morphic', 125000);
  polymorphicPerson.WriteInfo();
}

function getEmployee(): Employee {
  return new Employee('Fred', 'Flintstone', 45000);
}

let employee = getEmployee();
employee.WriteInfo();

writePolymorphicPerson();
