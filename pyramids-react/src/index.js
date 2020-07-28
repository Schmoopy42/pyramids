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

function StatusBoard(props) {
  return (
    <h3>{props.player} has {props.movesLeft} moves left</h3>
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
      firstClick: true,
      movesLeft: 3,
    };
  }

  rollPyramidDie() {
    /*
      Possible outcomes:
        1
        2
        3
        1,2
        1,3
        2,3
    */
    switch(Math.floor(Math.random() * 6) + 1) {
      default:
        console.log("something went wrong");
        break;
      case 1:
        return [1];
        break;
      case 2:
        return [2];
        break;
      case 3:
        return [3];
        break;
      case 4:
        return [1, 2];
        break;
      case 5:
        return [1, 3];
        break;
      case 6:
        return [2, 3];
    }
  }

  grabPiece(y, x) {
    let currentPickedUp = this.state.pyramidsPickedUp;
    if (this.state.squares[y][x].length === 0) {
      return;
    } else {
      currentPickedUp.push(this.state.squares[y][x].pop());
      this.setState({
        pyramidsPickedUp: currentPickedUp,
      });
    }
  }

  movePyramids(x,y){
    //append this.state.pyramidsPickedUp to this.state.squares[y][x]
    this.state.pyramidsPickedUp.reverse().forEach((item, array) => {
      this.state.squares[y][x].push(item);
    });
    this.setState({
      pyramidsPickedUp: [],
    });
  }

  // pick up and move pieces
  handleClick(y, x) {
    if (this.state.firstClick) {
      // if the square is empty, do nothing because you can't pick up nothing
      if (this.state.squares[y][x].length === 0) {
        return;
      }
      this.setState({
        fromSquare: {
          "y": y,
          "x": x,
        },
      });
      this.grabPiece(y, x);
    } else if (! this.state.firstClick) {   // if not first click
      // check if they clicked on the same square as first click
      if (y === this.state.fromSquare.y && x === this.state.fromSquare.x ) {
        // if so, pick it up
        this.grabPiece(y, x);
      } else {
        // if not, it's the toSquare
        this.movePyramids(x, y);
      }
    }

    this.setState({
      playerLastClicked: {
        "y": y,
        "x": x,
      },
      firstClick: false,
    });
  }

  render() {
    return(
      <div>
        <StatusBoard 
          player={this.state.p1IsNext ? "Player 1" : "Player 2"}
          movesLeft={this.state.movesLeft}
        />
        <Board 
          squares={this.state.squares}
          onClick={(y, x) => this.handleClick(y, x)}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
