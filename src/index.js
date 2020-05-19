import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Tile(props) {
  return (
    <div className="tile">
      <span className="letter">
        {props.letter}
      </span>
    </div>
  )
}

function PlayerTiles(props) {
  const tiles = props.tiles.map((tile) => {
    return <Tile letter={tile} />
  })

  return (
    <div className="tile-holder">
      {tiles}
    </div>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { return <div /> }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    let letterDistribution = {"A": 9, "B": 2, "C": 2, "D": 4, "E": 12, "F": 2, "G": 3, "H": 2, "I": 9, "J": 1, "K": 1, "L": 4, "M": 2, "N": 6, "O": 8, "P": 2, "Q": 1, "R": 6, "S": 4, "T": 6, "U": 4, "V": 2, "W": 2, "X": 1, "Y": 2, "Z": 1, " ": 2}
    this.state = {
      remainingTiles: ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z", " ", " "],
      players: [{tiles: ['G', 'E', 'R', 'A', 'L']}, {tiles: ['<', '3']}, {tiles: ['G', 'L', 'E', 'B']}, {tiles: []}],
    };
  }

  render() {
    const playerTiles = this.state.players.map((player) => {
      return <PlayerTiles tiles={player.tiles} />
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>

        <div className="players">
          {playerTiles}
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
