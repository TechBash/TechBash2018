export class Person {
  private _firstName: string;
  private _lastName: string;

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  public constructor(afirstName: string, alastName: string) {
    this._firstName = afirstName;
    this._lastName = alastName;
  }

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public WriteInfo() {
    console.log(this.fullName());
  }
}

function writePerson() {
  let person: Person = new Person('Jerry', 'Seinfeld');
  person.WriteInfo();
}

writePerson();
