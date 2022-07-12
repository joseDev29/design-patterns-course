interface Strategy {
  login(user: string, password: string): boolean;
}

class LoginContext {
  constructor(private strategy: Strategy) {}

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  login(user: string, password: string): boolean {
    return this.strategy.login(user, password);
  }
}

class LoginDBStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log("DB Strategy login");

    if (user === "admin" && password === "123") {
      return true;
    }

    return false;
  }
}

class LoginServiceStrategy implements Strategy {
  login(user: string, password: string): boolean {
    console.log("Login Service Strategy login");

    if (user === "user" && password === "1234") {
      return true;
    }

    return false;
  }
}

const auth = new LoginContext(new LoginDBStrategy());

console.log(auth.login("admin", "123"));

auth.setStrategy(new LoginServiceStrategy());

console.log(auth.login("admin", "123"));
console.log(auth.login("user", "1234"));
