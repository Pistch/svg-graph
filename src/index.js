import "./styles.css";

const coords = {
  start: { x: 80, y: 50 },
  middle: { x: 100, y: 100 },
  end: { x: 450, y: 450 }
};

class Point {
  constructor(
    name,
    element,
    { delta = -10, minX = 0, maxX = 500, minY = 0, maxY = 500 } = {}
  ) {
    this.element = element;
    this.name = name;
    this.config = {
      delta,
      minX,
      maxX,
      minY,
      maxY
    };

    this.isHolding = false;

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.element.addEventListener("mousedown", this.handleMouseDown.bind(this));
  }

  get x() {
    return this.element.x;
  }

  set x(value) {
    this.element.setAttribute("x", value + this.config.delta);
  }

  get y() {
    return this.element.y;
  }

  set y(value) {
    this.element.setAttribute("y", value + this.config.delta);
  }

  _applyCoords({ x, y }) {
    this.x = x;
    this.y = y;
  }

  applyCoords({ x, y }) {
    coords[this.name] = { x, y };
    this._applyCoords({ x, y });
    applyCoords(coords);
  }

  _setInitialCoords(event) {
    this.initialClientCoords = {
      x: event.clientX,
      y: event.clientY
    };
  }

  handleMouseDown(event) {
    this.isHolding = true;
    this._setInitialCoords(event);

    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseUp() {
    this.isHolding = false;

    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove(event) {
    if (!this.isHolding) {
      return;
    }

    let x = coords[this.name].x - this.initialClientCoords.x + event.clientX;

    if (x < this.config.minX) {
      x = this.config.minX;
    }

    if (x > this.config.maxX) {
      x = this.config.maxX;
    }

    let y = coords[this.name].y - this.initialClientCoords.y + event.clientY;

    if (y < this.config.minY) {
      y = this.config.minY;
    }

    if (y > this.config.maxY) {
      y = this.config.maxY;
    }

    this.applyCoords({ x, y });
    this._setInitialCoords(event);

    console.log(field.clientTop);
    console.log(field.clientLeft);
  }
}

const startPointEl = document.getElementById("svg-start");
const middlePointEl = document.getElementById("svg-middle");
const endPointEl = document.getElementById("svg-end");

const startPoint = new Point("start", startPointEl);
const middlePoint = new Point("middle", middlePointEl);
const endPoint = new Point("end", endPointEl);
const line = document.getElementById("svg-line");
const field = document.querySelector("svg");

function applyCoords(newCoords) {
  const { start, end, middle } = newCoords;
  const path = `M ${start.x} ${start.y} Q ${middle.x} ${middle.y} ${end.x} ${
    end.y
  }`;

  line.setAttribute("d", path);
}

function init() {
  const { start, end, middle } = coords;

  startPoint.applyCoords(start);
  middlePoint.applyCoords(middle);
  endPoint.applyCoords(end);
}

init();
