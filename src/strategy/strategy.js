class SaleContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(amount) {
    return this.strategy.calculate(amount);
  }
}

class RegularStrategy {
  constructor(tax) {
    this.tax = tax;
  }

  calculate(amount) {
    return amount + amount * this.tax;
  }
}

class DiscountStrategy {
  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    return amount + amount * this.tax - this.discount;
  }
}

class ForeignSaleStrategy {
  getDollarPrice() {
    return 20;
  }

  calculate(amount) {
    return amount * this.getDollarPrice();
  }
}

const regularSale = new RegularStrategy(0.19);
const discountSale = new DiscountStrategy(0.19, 3);
const foreignSale = new ForeignSaleStrategy();

const sale = new SaleContext(regularSale);

console.log(sale.calculate(10));

sale.setStrategy(discountSale);

console.log(sale.calculate(20));

sale.setStrategy(foreignSale.calculate(30));

//Practica
const data = [
  {
    name: "Poker",
    country: "Colombia",
    info: "Deli",
    img: "poker.png",
  },
  {
    name: "Azteca",
    country: "Mexico",
    info: "Deli",
    img: "azteca.png",
  },
  {
    name: "Delirium Tremens",
    country: "Belgica",
    info: "Deli",
    img: "delirium-tremens.png",
  },
];

class InfoContext {
  constructor(strategy, data, element) {
    this.strategy = strategy;
    this.data = data;
    this.element = element;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  show() {
    this.strategy.show(this.data, this.element);
  }
}

class ListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((accumulator, current, index) => {
      return (accumulator += `<div>
                <h2>${current.name}</h2>
                <h4>${current.country}</h4>
                ${index !== data.length - 1 ? "<hr/>" : ""}
            </div>`);
    }, "");
  }
}

class DetailedListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((accumulator, current, index) => {
      return (accumulator += `<div>
                  <h2>${current.name}</h2>
                  <h4>${current.country}</h4>
                  <p>${current.info}</p>
                  <p>${current.img}</p>
                    ${index !== data.length - 1 ? "<hr/>" : ""}
                  </div>`);
    }, "");
  }
}

const strategies = [new ListStrategy(), new DetailedListStrategy()];

const info = new InfoContext(
  strategies[0],
  data,
  document.getElementById("content")
);

info.show();

const select = document.getElementById("slcOptions");

select.addEventListener("change", (e) => {
  const strategyPosition = e.target.value;
  info.setStrategy(strategies[strategyPosition]);
  info.show();
});
