interface Component {
  getDetail(): string;
}

class ProductComponent implements Component {
  constructor(protected name: string) {}

  public getDetail(): string {
    return `${this.name}`;
  }
}

//No se peuden crear objetos de una clase abstracta
abstract class ProductDecorator implements Component {
  constructor(protected component: Component) {}

  getDetail(): string {
    return this.component.getDetail();
  }
}

class CommercialInfoProductDecorator extends ProductDecorator {
  constructor(
    component: Component,
    private tradename: string,
    private brand: string
  ) {
    super(component);
  }

  getDetail(): string {
    return `${this.tradename} ${this.brand} ` + super.getDetail();
  }
}

class StoreProductDecorator extends ProductDecorator {
  constructor(component: Component, private price: number) {
    super(component);
  }

  getDetail(): string {
    return super.getDetail() + ` ${this.price}`;
  }
}

class HtmlProductDecorator extends ProductDecorator {
  getDetail(): string {
    return `
        <h1>Info</h1>
        <p>${super.getDetail()}</p>
    `;
  }
}

const product = new ProductComponent("Beer");
console.log("PRODUCT: ", product.getDetail());

const commercialInfoProduct = new CommercialInfoProductDecorator(
  product,
  "London Porter",
  "Fuller's"
);
console.log("COMMERCIAL INFO PRODUCT: ", commercialInfoProduct.getDetail());

const storeProduct = new StoreProductDecorator(product, 15);
console.log("STORE PRODUCT: ", storeProduct.getDetail());

const storeCommercialInfoProduct = new StoreProductDecorator(
  commercialInfoProduct,
  15
);
console.log(
  "STORE COMMERCIAL INFO PRODUCT: ",
  storeCommercialInfoProduct.getDetail()
);

const htmlStoreCommercialInfoProduct = new HtmlProductDecorator(
  storeCommercialInfoProduct
);
console.log(
  "HTML STORE COMMERCIAL INFO PRODUCT: ",
  htmlStoreCommercialInfoProduct.getDetail()
);
