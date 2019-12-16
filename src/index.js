import Connection from './Connection';
import './styles.css';

const startCoords = {
  start: { x: 80, y: 50 },
  middle: { x: 100, y: 100 },
  end: { x: 450, y: 450 }
};

const connection = new Connection({
  fieldSelector: '.svg'
}, startCoords);
