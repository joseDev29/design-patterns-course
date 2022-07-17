class DocumentContext {
  constructor() {
    this.content = "";
    this.state = new BlankState();
  }

  setState(state) {
    this.state = state;
  }

  write(text) {
    this.state.write(this, text);
  }
}

class BlankState {
  write(documentContxt, text) {
    documentContxt.content = text;
    documentContxt.setState(new WithContentState());
  }
}

class WithContentState {
  write(documentContxt, text) {
    documentContxt.content += " " + text;
  }
}

class ApprovedState {
  write(documentContext, text) {
    console.error("The approved document cannot be edited");
  }
}

const doc = new DocumentContext();

console.log(doc);

doc.write("Hello world");

console.log(doc);

doc.write("test text");

console.log(doc);

doc.setState(new ApprovedState());

console.log(doc);

doc.write();

doc.setState(new WithContentState());

doc.write(" mas cositas");

console.log(doc);

//Caso practico
class Ball {
  constructor(ctx, canvas, ballSize) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ballSize = ballSize;
    this.positionX = 0;
    this.positionY = 0;

    this.state = new MoveRightState();
  }

  setState(state) {
    this.state = state;
  }

  print() {
    this.state.print(this);
  }
}

class MoveRightState {
  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize
    );

    if (ball.positionX < ball.width - ball.ballSize) {
      ball.positionX += ball.ballSize;
      return;
    }

    ball.setState(new MoveDownState());
  }
}

class MoveDownState {
  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize
    );

    if (ball.positionY < ball.height - ball.ballSize) {
      ball.positionY += ball.ballSize;
      return;
    }

    ball.setState(new MoveLeftState());
  }
}

class MoveLeftState {
  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize
    );

    if (ball.positionX > 0) {
      ball.positionX -= ball.ballSize;
      return;
    }

    ball.setState(new MoveUpState());
  }
}

class MoveUpState {
  print(ball) {
    ball.ctx.clearRect(0, 0, ball.width, ball.height);
    ball.ctx.fillRect(
      ball.positionX,
      ball.positionY,
      ball.ballSize,
      ball.ballSize
    );

    if (ball.positionY > 0) {
      ball.positionY -= ball.ballSize;
      return;
    }

    ball.setState(new MoveRightState());
  }
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

const ball = new Ball(ctx, canvas, 50);

setInterval(() => {
  ball.print();
}, 50);
