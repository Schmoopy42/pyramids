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
      whoseTurn: "player1",
      pyramidsPickedUp: [],
      firstClick: true,
      dieRoll: this.rollPyramidDie(),
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
      case 2:
        return [2];
      case 3:
        return [3];
      case 4:
        return [1, 2];
      case 5:
        return [1, 3];
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
    // This has to be smarter when we actually check if the moves are possible
    // remove move on die roll
    this.state.dieRoll.pop();

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

    // check if there are no moves left
    if (this.state.dieRoll.length === 0){
      this.endTurn();
    }
  }

  endTurn(){
    // Change turn to other player
    let nextPlayer;
    if (this.state.whoseTurn === "player1") {
      nextPlayer = "player2";
    } else {
      nextPlayer = "player1";
    }
    this.setState({
      whoseTurn: nextPlayer,
      dieRoll: this.rollPyramidDie(),
    });
  }
  
  render() {

    return(
      <div>
        <StatusBoard 
          player={this.state.whoseTurn === "player1" ? "Player 1" : "Player 2"}
          dieRoll={this.state.dieRoll}
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

function StatusBoard(props) {
  let secondRollStatement = "";
  if (props.dieRoll[1]) {
    secondRollStatement = " and a " + props.dieRoll[1];
  }
  return (
    <h3>{props.player} rolled a {props.dieRoll[0] + secondRollStatement}</h3>
  );
}
