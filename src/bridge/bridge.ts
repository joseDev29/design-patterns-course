interface ListImplementor {
  elements: number[];

  add(number: number): void;
  getElements(): number[];
}

class OrderedList implements ListImplementor {
  elements: number[] = [];

  add(number: number) {
    this.elements.push(number);
    this.elements.sort();
  }

  getElements(): number[] {
    return this.elements;
  }
}

class UniqueList implements ListImplementor {
  elements: number[] = [];

  add(number: number) {
    if (this.elements.includes(number)) return;
    this.elements.push(number);
  }

  getElements(): number[] {
    return this.elements;
  }
}

interface DataAbstraction {
  implementor: ListImplementor;
  add(number: number): void;
  get(): number[];
  operation(fn: (number: number) => number): number[];
}

class DataRefineAbstraction implements DataAbstraction {
  constructor(public implementor: ListImplementor) {}

  add(number: number): void {
    this.implementor.add(number);
  }

  get(): number[] {
    return this.implementor.getElements();
  }

  operation(fn: (number: number) => number): number[] {
    return this.implementor.getElements().map(fn);
  }
}

const uniqueData = new DataRefineAbstraction(new UniqueList());

uniqueData.add(3);
uniqueData.add(3);
uniqueData.add(1);
uniqueData.add(2);
uniqueData.add(3);
uniqueData.add(2);

console.log(uniqueData.get());

const orderedData = new DataRefineAbstraction(new OrderedList());

orderedData.add(2);
orderedData.add(3);
orderedData.add(4);
orderedData.add(4);
orderedData.add(2);
orderedData.add(3);
orderedData.add(4);
orderedData.add(1);
orderedData.add(1);

console.log(orderedData.get());

console.log(uniqueData.operation((number: number) => number ** 2));
console.log(orderedData.operation((number: number) => number ** 2));
