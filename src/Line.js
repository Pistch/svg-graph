export default class Line {
  constructor(elementSelector, {
    start = 0,
    middle = 0,
    end = 0
  } = {}) {
    this.element = document.querySelector(elementSelector);
    this.coords = { start, middle, end };
    this.applyStart = this.applyStart.bind(this);
    this.applyMiddle = this.applyMiddle.bind(this);
    this.applyEnd = this.applyEnd.bind(this);

    this._applyCoords();
  }

  _applyCoords() {
    const { start, end, middle } = this.coords;
    const path = `M ${start.x} ${start.y} Q ${middle.x} ${middle.y} ${end.x} ${
      end.y
    }`;

    this.element.setAttribute('d', path);
  }

  applyStart({ x, y }) {
    this.coords.start = { x, y };

    this._applyCoords();
  }

  applyMiddle({ x, y }) {
    this.coords.middle = { x, y };

    this._applyCoords();
  }

  applyEnd({ x, y }) {
    this.coords.end = { x, y };

    this._applyCoords();
  }
}
