import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      //squares: Array(9).fill(1),
      //squares: [null, null, null, 3, 3, 3, null, null, null],
      squares: {
        topRow: [ [null], [null], [null] ],
        middleRow: [ [3, 2, 1], [3, 2, 1], [3, 2, 1] ],
        bottomRow: [ [null], [null], [null] ],
      },
    };
  }

  renderSquare() {
    return (
    <button className="square">
    </button>
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
      </div>
    );
  }

}

class Game extends React.Component {
  render() {
    return <Board />
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
