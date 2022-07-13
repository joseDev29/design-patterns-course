interface IObserver<T> {
  refresh(value: T): void;
}

interface ISubject<T> {
  observers: Observer<T>[];

  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
  notify(value: T): void;
}

class Subject<T> implements ISubject<T> {
  observers: Observer<T>[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(value: T): void {
    this.observers.forEach((obs) => obs.refresh(value));
  }
}

type Fn<T> = (value: T) => void;

class Observer<T> implements IObserver<T> {
  private fn: Fn<T>;

  constructor(fn: Fn<T>) {
    this.fn = fn;
  }

  refresh(value: T): void {
    this.fn(value);
  }
}

const subject = new Subject<number>();
const obs1 = new Observer<number>((value) => {
  console.log("OBS 1: ", value);
});
const obs2 = new Observer<number>((value) => {
  console.log("OBS 2: ", value);
});

subject.subscribe(obs1);
subject.subscribe(obs2);

subject.notify(23);
subject.notify(123);
