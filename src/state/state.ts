interface State {
  next(ticket: Ticket): number | null;
  add(ticket: Ticket, quantity: number): void;
}

class Ticket {
  private state: State;
  public quantity: number;
  public readonly limit: number;
  private number: number;

  constructor(limit: number) {
    this.limit = limit;
    this.quantity = 0;
    this.number = 0;
    this.state = new EmptyState();
  }

  getNumber(): number {
    return this.number++;
  }

  setState(state: State) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  next(): number | null {
    return this.state.next(this);
  }

  add(quantity: number): void {
    this.state.add(this, quantity);
  }
}

class EmptyState implements State {
  next(ticket: Ticket): number | null {
    return null;
  }

  add(ticket: Ticket, quantity: number): void {
    if (quantity > ticket.limit) {
      console.error("limit exceeded");
      return;
    }

    ticket.quantity = quantity;

    if (quantity < ticket.limit) {
      ticket.setState(new WithDataState());
      return;
    }

    if (quantity === ticket.limit) {
      ticket.setState(new FullState());
      return;
    }
  }
}

class WithDataState implements State {
  next(ticket: Ticket): number | null {
    ticket.quantity--;
    if (ticket.quantity <= 0) {
      ticket.setState(new EmptyState());
    }
    return ticket.getNumber();
  }

  add(ticket: Ticket, quantity: number): void {
    const totalQuantity = ticket.quantity + quantity;

    if (totalQuantity > ticket.limit) {
      console.error("limit exceeded");
      return;
    }

    ticket.quantity = totalQuantity;

    if (totalQuantity < ticket.limit) return;

    if (totalQuantity === ticket.limit) {
      ticket.setState(new FullState());
      return;
    }
  }
}

class FullState implements State {
  next(ticket: Ticket): number | null {
    ticket.quantity--;

    if (ticket.quantity <= 0) {
      ticket.setState(new EmptyState());
    }

    if (ticket.quantity > 0) {
      ticket.setState(new WithDataState());
    }

    return ticket.getNumber();
  }

  add(ticket: Ticket, quantity: number): void {
    console.error("limit exceeded");
  }
}

const ticket = new Ticket(5);

console.log(ticket.getState());
console.log(ticket.next());

ticket.add(6);
console.log(ticket.getState());
console.log(ticket.next());

ticket.add(4);
console.log(ticket.getState());
console.log(ticket.next());
console.log(ticket.next());

ticket.add(3);
console.log(ticket.getState());
console.log(ticket.next());
console.log(ticket.next());

ticket.add(1);
console.log(ticket.getState());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket.next());
