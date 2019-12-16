export default class Point {
  constructor(
    fieldElement,
    {
      positionChangeCallback
    },
    {
      radius = 10,
      initialX = 0,
      initialY = 0
    } = {}
  ) {
    this.config = { radius };
    this.element = this._initElement(fieldElement);
    this.name = name;
    this.positionChangeCallback = positionChangeCallback;

    this.isHolding = false;

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.x = initialX;
    this.y = initialY;
  }

  _initElement(fieldElement) {
    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    point.setAttribute('stroke', 'black');
    point.setAttribute('fill', 'black');
    point.setAttribute('stroke-width', 1);
    point.setAttribute('cx', this.config.radius);
    point.setAttribute('cy', this.config.radius);
    point.setAttribute('r', this.config.radius);
    point.style.cursor = 'pointer';

    fieldElement.appendChild(point);

    return point;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;

    this.element.setAttribute('cx', value);
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;

    this.element.setAttribute('cy', value);
  }

  __applyCoords({ x, y }) {
    this.x = x;
    this.y = y;
  }

  _applyCoords({ x, y }) {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
    }

    this._raf = requestAnimationFrame(this.__applyCoords.bind(this, { x, y }));
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
