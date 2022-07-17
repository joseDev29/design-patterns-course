class Person {
  constructor(name, lastName, age, country, city, hobbies) {
    this.name = name;
    this.lastname = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.hobbies = hobbies;
  }

  getFullName() {
    return this.name + " " + this.lastname;
  }
}

class PersonBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.name = "";
    this.lastname = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setLastName(lastName) {
    this.lastname = lastName;
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }

  setCountry(country) {
    this.country = country;
    return this;
  }

  setCity(city) {
    this.city = city;
    return this;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
    return this;
  }

  build() {
    const person = new Person(
      this.name,
      this.lastname,
      this.age,
      this.country,
      this.city,
      this.hobbies
    );

    this.reset();

    return person;
  }
}

const builder = new PersonBuilder();

const eren = builder
  .setName("Eren")
  .setLastName("Jeager")
  .addHobby("Fight")
  .addHobby("Explore")
  .build();

console.log(eren);

const mikasa = builder
  .setName("Mikas")
  .setLastName("Ackerman")
  .setCountry("Eldia")
  .setCity("Maria Wall")
  .build();

console.log(mikasa);

//Caso practico
class Form {
  constructor(controls, action) {
    this.controls = controls;
    this.action = action;
  }

  getHtmlContent() {
    const style = `margin-top: 36px;`;
    return `<form method='post' action='${this.action}' style='${style}'>
      ${this.controls.reduce((acc, curr) => {
        return acc + this.getHtmlControl(curr);
      }, "")}
      <button type='submit'>Submit</button>
    </form>`;
  }

  getHtmlControl(control) {
    const style = `display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px`;
    return `<div style='${style}'>
      ${this.getLabel(control)}
      ${this.getInput(control)}
    </div>`;
  }

  getLabel(control) {
    return `<label>${control.text}</label>`;
  }

  getInput(control) {
    return `<input type='${control.type}' id='${control.name}' name='${control.name}' />`;
  }
}

class FormBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.action = "";
    this.controls = [];
  }

  build() {
    const form = new Form(this.controls, this.action);
    this.reset();
    return form;
  }

  setAction(action) {
    this.action = action;
    return this;
  }

  setText(name, text) {
    this.controls.push({
      name,
      text,
      type: "text",
    });
    return this;
  }

  setEmail(name, text) {
    this.controls.push({
      name,
      text,
      type: "email",
    });
    return this;
  }

  setCheckbox(name, text) {
    this.controls.push({
      name,
      text,
      type: "checkbox",
    });
    return this;
  }

  setColor(name, text) {
    this.controls.push({
      name,
      text,
      type: "color",
    });
    return this;
  }
}

const formBuilder = new FormBuilder();

const personForm = formBuilder
  .setAction("/person")
  .setText("name", "Name")
  .setText("lastName", "Last name")
  .setEmail("email", "Email")
  .setCheckbox("advertising", "Advertising")
  .setColor("favoriteColor", "Favorite color")
  .build();

console.log(personForm);

const cityForm = formBuilder
  .setAction("/city")
  .setText("name", "Name")
  .setText("country", "Country")
  .build();

//Builder with director
class FormDirector {
  constructor(formBuilder) {
    this.setBuilder(formBuilder);
  }

  setBuilder(formBuilder) {
    this.formBuilder = formBuilder;
  }

  createPersonForm() {
    this.formBuilder.reset();
    this.formBuilder
      .setText("name", "lastName")
      .setText("lastName", "Last name")
      .setEmail("email", "Email")
      .setCheckbox("advertising", "Advertising")
      .setColor("favoriteColor", "Favorite color");
  }

  createCityForm() {
    this.formBuilder.reset();
    this.formBuilder.setText("name", "Name").setText("country", "Country");
  }
}

const director = new FormDirector(formBuilder);

director.createPersonForm();

const personForm2 = formBuilder.build();

director.createCityForm();

const cityForm2 = formBuilder.build();

//Insert html code
const $formsContainer = document.getElementById("formsContainer");

const createInserter = (container) => ({
  insert: (element) => container.insertAdjacentHTML("afterend", element),
});

const inserter = createInserter($formsContainer);

inserter.insert(personForm.getHtmlContent());
inserter.insert(cityForm.getHtmlContent());
inserter.insert(personForm2.getHtmlContent());
inserter.insert(cityForm2.getHtmlContent());
