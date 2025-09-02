// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

chosenColor = prompt("Escolha uma cor (vermelho, verde, azul ou amarelo):");
// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function randomIntensityColor() {
  const intensity = random(0, 255);
  switch (chosenColor) {
    case "vermelho":
      return `rgb(${intensity},0,0)`;
    case "verde":
      return `rgb(0,${intensity},0)`;
    case "azul":
      return `rgb(0,0,${intensity})`;
    case "amarelo":
      return `rgb(${intensity},${intensity},0)`;
    default:
      return randomRGB();
  }
}

function Shape(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Shape.prototype.draw = function () {};

Shape.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

Shape.prototype.collisionDetect = function () {
  for (let j = 0; j < shapes.length; j++) {
    if (!(this === shapes[j])) {
      const dx = this.x - shapes[j].x;
      const dy = this.y - shapes[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + shapes[j].size) {
        shapes[j].color = this.color = randomIntensityColor();
      }
    }
  }
};

// Ball
function Ball(x, y, velX, velY, color, size) {
  Shape.call(this, x, y, velX, velY, color, size);
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// Triangle
function Triangle(x, y, velX, velY, color, size) {
  Shape.call(this, x, y, velX, velY, color, size);
}
Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;
Triangle.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.moveTo(this.x, this.y - this.size);
  ctx.lineTo(this.x - this.size, this.y + this.size);
  ctx.lineTo(this.x + this.size, this.y + this.size);
  ctx.closePath();
  ctx.fill();
};

// Square
function Square(x, y, velX, velY, color, size) {
  Shape.call(this, x, y, velX, velY, color, size);
}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;
Square.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(
    this.x - this.size / 2,
    this.y - this.size / 2,
    this.size,
    this.size
  );
};

// Cross
function Cross(x, y, velX, velY, color, size) {
  Shape.call(this, x, y, velX, velY, color, size);
}
Cross.prototype = Object.create(Shape.prototype);
Cross.prototype.constructor = Cross;
Cross.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(
    this.x - this.size / 4,
    this.y - this.size / 2,
    this.size / 2,
    this.size
  );
  ctx.fillRect(
    this.x - this.size / 2,
    this.y - this.size / 4,
    this.size,
    this.size / 2
  );
};

let shapes = [];

while (shapes.length < 50) {
  let size = random(10, 40);
  let shape;
  const shapeType = random(0, 3);
  const commonArgs = [
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomIntensityColor(),
    size,
  ];

  switch (shapeType) {
    case 0:
      shape = new Ball(...commonArgs);
      break;
    case 1:
      shape = new Triangle(...commonArgs);
      break;
    case 2:
      shape = new Square(...commonArgs);
      break;
    case 3:
      shape = new Cross(...commonArgs);
      break;
  }

  shapes.push(shape);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
    shapes[i].update();
    shapes[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
