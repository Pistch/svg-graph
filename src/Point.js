export default class Point {
  constructor(
    elementSelector,
    {
      positionChangeCallback
    },
    {
      delta = -10,
      initialX = 0,
      initialY = 0
    } = {}
  ) {
    this.element = document.querySelector(elementSelector);
    this.name = name;
    this.positionChangeCallback = positionChangeCallback;
    this.config = { delta };

    this.isHolding = false;

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.x = initialX;
    this.y = initialY;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;

    this.element.setAttribute('x', value + this.config.delta);
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;

    this.element.setAttribute('y', value + this.config.delta);
  }

  _applyCoords({ x, y }) {
    this.x = x;
    this.y = y;
  }

  applyCoords({ x, y }) {
    this._applyCoords({ x, y });
  }

  handleMouseDown(event) {
    this.isHolding = true;
    const elementBoundaries = this.element.getBoundingClientRect();
    this._initialClickCoords = {
      x: event.clientX - elementBoundaries.x,
      y: event.clientY - elementBoundaries.y
    };

    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp() {
    this.isHolding = false;

    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(event) {
    if (!this.isHolding) {
      return;
    }

    this.positionChangeCallback({
      clientX: event.clientX - this._initialClickCoords.x,
      clientY: event.clientY - this._initialClickCoords.y
    });
  }
}
