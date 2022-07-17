class Person {
  constructor(
    private name: string,
    private lastName: string,
    private age: number,
    private country: string,
    private city: string,
    private hobbies: string[]
  ) {}

  getFullName(): string {
    return this.name + " " + this.lastName;
  }
}

interface PersonBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  reset(): void;
  build(): Person;

  setName(name: string): PersonBuilder;
  setLastName(lastName: string): PersonBuilder;
  setAge(age: number): PersonBuilder;
  setCountry(country: string): PersonBuilder;
  setCity(city: string): PersonBuilder;
  addHobby(hobby: string): PersonBuilder;
}

class NormalPersonBuilder implements PersonBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  constructor() {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  reset(): void {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  build(): Person {
    const person = new Person(
      this.name,
      this.lastName,
      this.age,
      this.country,
      this.city,
      this.hobbies
    );

    this.reset();

    return person;
  }

  setName(name: string): PersonBuilder {
    this.name = name;
    return this;
  }

  setLastName(lastName: string): PersonBuilder {
    this.lastName = lastName;
    return this;
  }

  setAge(age: number): PersonBuilder {
    this.age = age;
    return this;
  }

  setCity(city: string): PersonBuilder {
    this.city = city;
    return this;
  }

  setCountry(country: string): PersonBuilder {
    this.city = country;
    return this;
  }

  addHobby(hobby: string): PersonBuilder {
    this.hobbies.push(hobby);
    return this;
  }
}

const personBuilder = new NormalPersonBuilder();

const levi = personBuilder
  .setName("Levi")
  .setLastName("Ackerman")
  .addHobby("Fight")
  .addHobby("Explore")
  .build();

console.log(levi);

const annie = personBuilder
  .setName("Annie")
  .setLastName("Leonhart")
  .setCountry("Marley")
  .setCity("Liberio")
  .build();

console.log(annie);

//with director
class PersonDirector {
  constructor(private personBuilder: PersonBuilder) {}

  setPersonBuilder(personBuilder: PersonBuilder) {
    this.personBuilder = personBuilder;
  }

  createSimplePerson(name: string, lastName: string) {
    this.personBuilder.setName(name).setLastName(lastName);
  }

  createPersonWithAddress(
    name: string,
    lastName: string,
    country: string,
    city: string
  ) {
    this.personBuilder
      .setName(name)
      .setLastName(lastName)
      .setCountry(country)
      .setCity(city);
  }
}

const personDirector = new PersonDirector(personBuilder);

personDirector.createSimplePerson("Erwin", "Smith");

const erwin = personBuilder.build();

console.log(erwin);

personDirector.createPersonWithAddress("Hangie", "Zoe", "Eldia", "Rose Wall");

const hangie = personBuilder.build();

console.log(hangie);
