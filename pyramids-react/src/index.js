import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(y, x) {
    return (
      <Square
        value={this.props.squares[y][x]}
        onClick={() => this.props.onClick(y, x)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [
        [[], [], []],
        [[3,2,1], [3,2,1], [3,2,1]],
        [[], [], []],
      ],
      p1isNext: true,
      pyramidsPickedUp: [],
    };
  }


  // pick up and move pieces
  handleClick(y, x) {
    if (this.state.squares[y][x].length === 0 ) {
      return;
    }
    let currentPickedUp = this.state.pyramidsPickedUp;
    currentPickedUp.push(this.state.squares[y][x].pop());

    this.setState({
      pyramidsPickedUp: currentPickedUp,
    });
  }

  render() {
    return <Board 
      squares={this.state.squares}
      onClick={(y, x) => this.handleClick(y, x)}
    />
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
