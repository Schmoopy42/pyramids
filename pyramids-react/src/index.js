import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {

  renderSquare(contents) {
    return (
    <button className="square">
      {contents}
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
