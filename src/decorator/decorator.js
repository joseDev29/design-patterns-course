//component
class ProductComponent {
  constructor(name) {
    this.name = name;
  }

  getDetail() {
    return `${this.name}`;
  }
}

//decorator
class ProductDecorator {
  constructor(productComponent) {
    this.productComponent = productComponent;
  }

  getDetail() {
    return this.productComponent.getDetail();
  }
}

class ComercialProductInfoDecorator extends ProductDecorator {
  constructor(productComponent, tradename, brand) {
    super(productComponent);

    this.tradename = tradename;
    this.brand = brand;
  }

  getDetail() {
    return `${this.tradename} ${this.brand} ` + super.getDetail();
  }
}

class StoreProductDecorator extends ProductDecorator {
  constructor(productComponent, price) {
    super(productComponent);

    this.price = price;
  }

  getDetail() {
    return super.getDetail() + ` $${this.price}`;
  }
}

class HTMLProductDecorator extends ProductDecorator {
  getDetail() {
    return `
        <h1>Product info</h1>
        <p>${super.getDetail()}</p>
    `;
  }
}

//component
const productComponent = new ProductComponent("Beer");

console.log(productComponent.getDetail());

//decorator 1
const comercialProductInfo = new ComercialProductInfoDecorator(
  productComponent,
  "London",
  "Fuller's"
);

console.log(comercialProductInfo.getDetail());

//decorator 2
const storeProduct = new StoreProductDecorator(productComponent, 20);

console.log(storeProduct.getDetail());

//decorator 2 con decorator 1
const product = new StoreProductDecorator(comercialProductInfo, 20);
console.log(product.getDetail());

//decorator 3 con decorator 2 con decorator 1
const htmlProduct = new HTMLProductDecorator(product);

myDiv.innerHTML = htmlProduct.getDetail();

//Caso practico

//component
class ClientComponent {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    const res = await fetch(this.url);
    const data = await res.json();
    return data;
  }
}

//decorator
class ClientDecorator {
  constructor(clientComponent) {
    this.clientComponent = clientComponent;
  }

  async getData() {
    return await this.clientComponent.getData();
  }
}

//decorator 1
class UpperCaseClientDecorator extends ClientDecorator {
  async getData() {
    const data = await super.getData();
    const transform = (item) => ({ ...item, title: item.title.toUpperCase() });
    return data.map(transform);
  }
}

//decorator 2
class HtmlClientDecorator extends ClientDecorator {
  async getData() {
    const data = await super.getData();
    const transform = (item) => ({
      title: `<h1>${item.title}</h1>`,
      thumbnailUrl: `<img src="${item.thumbnailUrl}" />`,
    });
    return data.map(transform);
  }
}

(async () => {
  const url = "https://jsonplaceholder.typicode.com/photos";

  const client = new ClientComponent(url);
  const data = await client.getData();
  console.log("DATA: ", data);

  const clientUpperCase = new UpperCaseClientDecorator(client);
  const dataUpperCase = await clientUpperCase.getData();
  console.log("UPPER CASE DATA: ", dataUpperCase);

  const clientHtmlUpperCase = new HtmlClientDecorator(clientUpperCase);
  const dataHtmlUpperCase = await clientHtmlUpperCase.getData();

  divContent1.innerHTML = dataHtmlUpperCase.reduce((acc, curr) => {
    return acc + curr.title + curr.thumbnailUrl;
  }, "");

  const clientHtml = new HtmlClientDecorator(client);
  const dataHtml = await clientHtml.getData();

  divContent2.innerHTML = dataHtml.reduce((acc, curr) => {
    return acc + curr.title + curr.thumbnailUrl;
  }, "");
})();
