import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Tile(props) {
  return (
    <div className="tile" onClick={props.onClick}>
      <span className="letter">
        {props.letter}
      </span>
    </div>
  )
}

function PlayerTiles(props) {
  const tiles = props.tiles.map((tile, index) => {
    return <Tile letter={tile} onClick={() => props.handleClick(tile)} key={index}/>
  })

  return (
    <div className="tile-holder">
      {tiles}
    </div>
  )
}

function Slot(props) {
  const classes = props.slotType ? "slot " + props.slotType : "slot";
  var boardTile = null;
  if (props.slotValue) {
    boardTile = <div className="board-tile">{props.slotValue}</div>
  }

  return <div className={classes}>{boardTile}</div>
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

      return <Slot slotType={slotTypeName} slotValue={this.props.slotValues[slotRow][slotCol]} key={index} />;
    });

    return slots;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTiles: ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z", " ", " "],
      playerTiles: ['G', 'E', 'R', 'A', 'L'],
      boardSlotValues: [
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
        ['G', 'L', 'E', 'B', 'G', 'L', 'E', 'B', 'G', 'L', 'E', 'B', 'G', 'L', 'E']
      ],
      selectedTile: null,
    };
  }

  handlePlayerTileClick(tile) {
    var newState = this.state;
    newState.selectedTile = tile;
    this.setState(newState);
  }

  render() {
    //var clickFunctions = this.state.playerTiles.map((tile) => this.handlePlayerTileClick(tile));

    return (
      <div className="game">
        <div className="game-status">
          <span>{this.state.selectedTile}</span>
        </div>
        <div className="game-board">
          <Board slotValues={this.state.boardSlotValues} />
        </div>

        <div className="players">
          <PlayerTiles tiles={this.state.playerTiles} handleClick={(tile) => { this.handlePlayerTileClick(tile)} }/>
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
