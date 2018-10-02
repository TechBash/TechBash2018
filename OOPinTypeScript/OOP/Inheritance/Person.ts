class AnotherPerson {
  public constructor(public firstName: string, public lastName: string) {}

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public WriteInfo() {
    console.log(this.fullName());
  }
}

class AnotherEmployee extends AnotherPerson {
  public constructor(
    afirstName: string,
    alastName: string,
    public Salary: number
  ) {
    super(afirstName, alastName);
  }
  public WriteInfo() {
    let s: string = `${this.fullName()} makes this much: -- $${this.Salary}`;
    console.log(s);
  }
}

let anotherPerson = new AnotherPerson('Barney', 'Rubble');
anotherPerson.WriteInfo();

let anotherEmployee = new AnotherEmployee('Mr.', 'Slate', 100000);
anotherEmployee.WriteInfo();
