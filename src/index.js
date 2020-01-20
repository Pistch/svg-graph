import Connection from './Connection';
import './styles.css';

const connection1 = new Connection({
  fieldSelector: '.svg'
}, {
  start: { x: 80, y: 50 },
  middle: { x: 100, y: 100 },
  end: { x: 450, y: 450 }
});

const connection2 = new Connection({
  fieldSelector: '.svg'
}, {
  start: { x: 120, y: 70 },
  middle: { x: 300, y: 300 },
  end: { x: 150, y: 150 }
});

const connection3 = new Connection({
  fieldSelector: '.svg'
}, {
  start: { x: 125, y: 70 },
  middle: { x: 350, y: 300 },
  end: { x: 155, y: 150 }
});

const connection4 = new Connection({
  fieldSelector: '.svg'
}, {
  start: { x: 10, y: 70 },
  middle: { x: 30, y: 300 },
  end: { x: 10, y: 150 }
});

const connection5 = new Connection({
  fieldSelector: '.svg'
}, {
  start: { x: 220, y: 70 },
  middle: { x: 200, y: 300 },
  end: { x: 250, y: 150 }
});
