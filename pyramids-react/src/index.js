import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      //squares: Array(9).fill(1),
      //squares: [null, null, null, 3, 3, 3, null, null, null],
      squares: [
        [[null], [null], [null]],
        [[3,2,1], [3,2,1], [3,2,1]],
        [[null], [null], [null]],
      ],
    };
  }

  renderSquare(i) {
    return (
    <button className="square">
      {i}
    </button>
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(this.state.squares[0][0])}
          {this.renderSquare(this.state.squares[0][1])}
          {this.renderSquare(this.state.squares[0][2])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.squares[1][0])}
          {this.renderSquare(this.state.squares[1][1])}
          {this.renderSquare(this.state.squares[1][2])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.squares[2][0])}
          {this.renderSquare(this.state.squares[2][1])}
          {this.renderSquare(this.state.squares[2][2])}
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
