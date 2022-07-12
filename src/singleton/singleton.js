class Sinlgleton {
  static getInstance() {
    return Sinlgleton.instance;
  }

  constructor() {
    //random le pertence al objeto
    this.random = Math.random();
    //Instance le pertenece a la clase
    //La propiedad instance es creada por nosotros, no es propia de javascript
    if (Sinlgleton.instance) {
      console.log("exist");
      return Sinlgleton.instance;
    }
    console.log("non exist");
    Sinlgleton.instance = this;
  }
}

const singleton = new Sinlgleton();
const singleton2 = new Sinlgleton();
const singleton3 = new Sinlgleton();

console.log(singleton.random);
console.log(singleton2.random);
console.log(singleton === singleton2);
console.log(Sinlgleton.getInstance());

class WeekDays {
  daysEs = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Vierenes",
    "Sabado",
    "Domingo",
  ];

  daysEn = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  constructor(lang) {
    this.lang = lang;

    if (WeekDays.instance) {
      return WeekDays.instance;
    }

    WeekDays.instance = this;
  }

  getDays() {
    return this.lang === "es" ? this.daysEs : this.daysEn;
  }
}

const weekDays = new WeekDays("es");
const weekDays2 = new WeekDays();
const weekDays3 = new WeekDays("en");

console.log(weekDays.getDays());
console.log(weekDays2.getDays());
console.log(weekDays3.getDays());
