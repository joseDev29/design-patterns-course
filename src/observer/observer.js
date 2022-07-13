class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((obs) => {
      obs.refresh(data);
    });
  }
}

class Observer {
  constructor(fn) {
    this.fn = fn;
  }

  refresh(data) {
    this.fn(data);
  }
}

const s = new Subject();

const o1 = new Observer((data) => {
  console.log("OBS 1:", data);
});

s.subscribe(o1);

function change(ev) {
  s.notify(ev.target.value);
}

const o2 = new Observer((data) => {
  div1.innerHTML = data;
});

const o3 = new Observer((data) => {
  div2.innerHTML = data.split("").reverse().join("");
});

s.subscribe(o2);
s.subscribe(o3);

s.unsubscribe(o1);

//Caso practico

class ItemsSubject extends Subject {
  constructor() {
    super();

    this.data = [];
  }

  add(item) {
    this.data.push(item);
    this.notify(this.data);
  }
}

class HtmlElementObserver {
  constructor(element) {
    this.element = element;
  }

  refresh(data) {
    this.element.innerHTML = data.reduce((acc, curr) => {
      return acc + `<p>${curr}</p>`;
    }, "");
  }
}

const item = new ItemsSubject();
const div1Observer = new HtmlElementObserver(div1);
const div2Observer = new HtmlElementObserver(div2);

const observer1 = new Observer((data) => (div3.innerHTML = data.length));

item.subscribe(div1Observer);
item.subscribe(div2Observer);
item.subscribe(observer1);

function add() {
  const name = txtName.value;
  item.add(name);
}
