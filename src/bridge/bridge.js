class EncoderTextAbstraction {
  constructor(encoder) {
    this.encoder = encoder;
  }

  encode(str) {
    return this.encoder.encode(str);
  }

  decode(str) {
    return this.encoder.decode(str);
  }
}

class Base64EncoderImplementor {
  encode(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  decode(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
}

class HTMLEncoderImplementor {
  encode(str) {
    const result = str
      .split(".")
      .reduce((acc, curr) => acc + `<p>${curr.trim()}</p>`, "");

    return result;
  }

  decode(str) {
    const result = str
      .split("</p>")
      .reduce(
        (acc, curr) =>
          acc + (curr !== "" ? curr.replace("<p>", "") + ". " : ""),
        ""
      );

    return result;
  }
}

const encoderBase64 = new EncoderTextAbstraction(
  new Base64EncoderImplementor()
);

console.log("ENCODE BASE64: ", encoderBase64.encode("pato"));
console.log("DECODE BASE64: ", encoderBase64.decode("cGF0bw=="));

const encoderHtml = new EncoderTextAbstraction(new HTMLEncoderImplementor());

console.log("ENCODE HTML: ", encoderHtml.encode("pato. perro. gato. paloma"));
console.log(
  "DECODE HTML: ",
  encoderHtml.decode("<p>pato</p><p>perro</p><p>gato</p><p>paloma</p>")
);

//Caso practico

class Editor {
  constructor(implementor) {
    this.implementor = implementor;
  }

  print(width, height, color) {
    this.implementor.setWidth(width);
    this.implementor.setHeight(height);
    this.implementor.setColor(color);
    this.implementor.print();
  }
}

class EditorWithClear extends Editor {
  constructor(implementor) {
    super(implementor);
  }

  clear() {
    this.implementor.setWidth(0);
    this.implementor.setHeight(0);
    this.implementor.setColor("#000000");
    this.implementor.print();
  }
}

class HTMLPainter {
  constructor(container) {
    this.container = container;
    this.width = "1px";
    this.height = "1px";
    this.color = "#000000";
  }

  setWidth(width) {
    this.width = width + "px";
  }

  setHeight(height) {
    this.height = height + "px";
  }

  setColor(color) {
    this.color = color;
  }

  print() {
    const style = `style="width:${this.width}; height:${this.height}; background:${this.color}"`;
    this.container.innerHTML = `<div ${style}></div>`;
  }
}

class CanvasPainter {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 1;
    this.height = 1;
    this.color = "#000000";
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  setColor(color) {
    this.color = color;
  }

  print() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

const $inputRange = document.getElementById("range");
const $inputColor = document.getElementById("editorColor");
const $clearButton = document.getElementById("clearButton");
const $container = document.getElementById("content");
const $canvas = document.getElementById("canvas");

// const editorHtml = new Editor(new HTMLPainter($container));
// const editorCanvas = new Editor(new CanvasPainter($canvas));
const editorHtml = new EditorWithClear(new HTMLPainter($container));
const editorCanvas = new EditorWithClear(new CanvasPainter($canvas));

const onChangeInput = () => {
  const width = $inputRange.value;
  const height = $inputRange.value;
  const color = $inputColor.value;

  editorHtml.print(width, height, color);
  editorCanvas.print(width, height, color);
};

$inputRange.addEventListener("input", onChangeInput);
$inputColor.addEventListener("input", onChangeInput);

$clearButton.addEventListener("click", () => {
  $inputRange.value = 1;
  $inputColor.value = "#000000";
  editorHtml.clear();
  editorCanvas.clear();
});
