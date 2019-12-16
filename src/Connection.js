import Point from './Point';
import Line from './Line';

export default class Connection {
  constructor({
    fieldSelector,
    minX = 0,
    maxX = 500,
    minY = 0,
    maxY = 500
  }, {
    start,
    middle,
    end
  }) {
    this.field = document.querySelector(fieldSelector);
    this.coords = { start, middle, end };
    this.config = { minX, maxX, minY, maxY };
    this.applyStart = this.applyStart.bind(this);
    this.applyMiddle = this.applyMiddle.bind(this);
    this.applyEnd = this.applyEnd.bind(this);
    this.handleStartPositionChange = this.handleStartPositionChange.bind(this);
    this.handleMiddlePositionChange = this.handleMiddlePositionChange.bind(this);
    this.handleEndPositionChange = this.handleEndPositionChange.bind(this);
    this.line = new Line(this.field, this.coords);
    this.startPoint = new Point(
      this.field,
      {
        positionChangeCallback: this.handleStartPositionChange
      },
      {
        initialX: start.x,
        initialY: start.y,
      });
    this.middlePoint = new Point(
      this.field,
      {
        positionChangeCallback: this.handleMiddlePositionChange
      },
      {
        initialX: middle.x,
        initialY: middle.y,
      });
    this.endPoint = new Point(
      this.field,
      {
        positionChangeCallback: this.handleEndPositionChange
      },
      {
        initialX: end.x,
        initialY: end.y,
      });
  }

  applyStart({ x, y }) {
    this.coords.start = { x, y };

    this.startPoint.applyCoords(this.coords.start);
    this.line.applyStart(this.coords.start);
  }

  applyMiddle({ x, y }) {
    this.coords.middle = { x, y };

    this.middlePoint.applyCoords(this.coords.middle);
    this.line.applyMiddle(this.coords.middle);
  }

  applyEnd({ x, y }) {
    this.coords.end = { x, y };

    this.endPoint.applyCoords(this.coords.end);
    this.line.applyEnd(this.coords.end);
  }

  _normalizeCoords(event) {
    const fieldParams = this.field.getBoundingClientRect();
    let x = event.clientX;

    if (x < fieldParams.left) {
      x = fieldParams.left;
    }

    if (x > fieldParams.right) {
      x = fieldParams.right;
    }

    let y = event.clientY;

    if (y < fieldParams.top) {
      y = fieldParams.top;
    }

    if (y > fieldParams.bottom) {
      y = fieldParams.bottom;
    }

    return { x, y };
  }

  handleStartPositionChange(event) {
    const { x, y } = this._normalizeCoords(event);

    this.applyStart({ x, y });
  }

  handleMiddlePositionChange(event) {
    const { x, y } = this._normalizeCoords(event);

    this.applyMiddle({ x, y });
  }

  handleEndPositionChange(event) {
    const { x, y } = this._normalizeCoords(event);

    this.applyEnd({ x, y });
  }
}