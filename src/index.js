import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tile {
  constructor(letter) {
    this.letter = letter;
    this.selected = false;
    this.placed = false;
  }

  select() {
    if (!this.placed) {
      this.selected = true;
    }
  }

  deselect() {
    this.selected = false;
  }

  place() {
    this.placed = true;
  }
}


function PlayerTile(props) {
  var classes = props.selected ? 'tile selected-tile' : 'tile'

  return (
    <div className={classes} onClick={props.onClick}>
      <span className="letter">
        {props.letter}
      </span>
    </div>
  )
}

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tiles = this.props.tiles.map((tile, index) => {
      return (
        <PlayerTile
          letter={tile.letter}
          onClick={() => this.props.handleClick(tile)}
          key={index}
          selected={tile.selected}
        />
      );
    })

    return (
      <div className="tile-holder">
        {tiles}
      </div>
    )
  }
}

function Slot(props) {
  const classes = props.slotType ? "slot " + props.slotType : "slot";
  var boardTile = null;
  if (props.tile) {
    boardTile = <div className="board-tile">{props.tile.letter}</div>
  }

  return (
    <div className={classes} onClick={props.onClick}>
      {boardTile}
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var slotsTypes = [
      4, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 4,
      0, 2, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 2, 0,
      0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0,
      1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1,
      0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0,
      0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0,
      0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0,
      4, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 4,
      0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0,
      0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0,
      0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0,
      1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1,
      0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0,
      0, 2, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 2, 0,
      4, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 4,
    ];

    var slots = slotsTypes.map((slotType, index) => {
      var slotTypeName;

      switch (slotType) {
        case 1:
          slotTypeName = "double-letter";
          break;
        case 2:
          slotTypeName = "double-word";
          break;
        case 3:
          slotTypeName = "triple-letter";
          break;
        case 4:
          slotTypeName = "triple-word";
          break;
        case 5:
          slotTypeName = "start-slot";
          break;
      }

      var slotRow = Math.floor(index / 15);
      var slotCol = index % 15;
      var tile = this.props.slotTiles[slotRow][slotCol]

      return (
        <Slot
          slotType={slotTypeName}
          tile={tile}
          key={index}
          onClick={() => this.props.handleClick(slotRow, slotCol)}
        />
      );
    });

    return slots;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    var allTileLetters = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z", " ", " "];
    var remainingTiles = allTileLetters.map((letter) => { return new Tile(letter); });
    var playerTiles = [];

    for (var i = 0; i < 7; i++) {
      var randomTile = remainingTiles.splice(Math.floor(Math.random() * remainingTiles.length), 1)[0];
      playerTiles.push(randomTile);
    }

    this.state = {
      remainingTiles: remainingTiles,
      playerTiles: playerTiles,
      boardSlotTiles: [
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
        Array(15).fill(null),
      ],
      selectedTile: null,
    };
  }

  handlePlayerTileClick(tile) {
    if (this.state.selectedTile) {
      this.state.selectedTile.deselect();
    }
    tile.select();

    var newState = this.state;
    newState.selectedTile = tile;
    this.setState(newState);
  }

  handleBoardTileClick(row, col) {
    if (!this.state.selectedTile) {
      return;
    }

    var newState = this.state;
    newState.boardSlotTiles[row][col] = this.state.selectedTile;
    this.state.selectedTile.deselect();
    this.setState(newState);
  }

  render() {
    return (
      <div className="game">
        <div className="game-status">
          <span>{this.state.selectedTile ?. letter}</span>
        </div>
        <div className="game-board">
          <Board
            slotTiles={this.state.boardSlotTiles}
            handleClick={(row, col) => { this.handleBoardTileClick(row, col)} }
          />
        </div>

        <div className="players">
          <Player
            tiles={this.state.playerTiles}
            handleClick={(tile) => { this.handlePlayerTileClick(tile)}}
          />
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
