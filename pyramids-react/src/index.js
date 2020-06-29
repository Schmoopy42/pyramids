import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return(
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={i}
        onClick={() => this.props.onClick()}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(this.props.squares[0][0])}
          {this.renderSquare(this.props.squares[0][1])}
          {this.renderSquare(this.props.squares[0][2])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.props.squares[1][0])}
          {this.renderSquare(this.props.squares[1][1])}
          {this.renderSquare(this.props.squares[1][2])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.props.squares[2][0])}
          {this.renderSquare(this.props.squares[2][1])}
          {this.renderSquare(this.props.squares[2][2])}
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
        [[null], [null], [null]],
        [[3,2,1], [3,2,1], [3,2,1]],
        [[null], [null], [null]],
      ],
      p1isNext: true,
      pyramidsPickedUp: [],
    };
  }

  handleClick() {
    /*  this will be used to select and move
        pieces
    */
    this.setState({pyramidsPickedUp: [2]});
  }

  render() {
    return <Board 
      squares={this.state.squares}
      onClick={() => this.handleClick()}
    />
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
