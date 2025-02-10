import { useState } from "react";

/* function for each individual square */
function Square({ value, onSquareClick, highlight }) {
  // check if this square needs to be highlighted
  const bg = highlight ? "#bbff33" : "#fff";
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ background: bg }}
    >
      {value}
    </button>
  );
}

/* function for the game board; renders the 9 squares and the state of the game */
function Board({ xIsNext, squares, onPlay, selectedTile }) {
  // function called each time a click occurs
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          highlight={selectedTile === 0}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          highlight={selectedTile === 1}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          highlight={selectedTile === 2}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          highlight={selectedTile === 3}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          highlight={selectedTile === 4}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          highlight={selectedTile === 5}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          highlight={selectedTile === 6}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          highlight={selectedTile === 7}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          highlight={selectedTile === 8}
        />
      </div>
    </>
  );
}

/* function that represents the game; renders the Board and the game history */
export default function Game() {
  /* States
   * history: stores the moves' history
   * currentMove: stores the index for the current move
   * selectedTile: stores the history of selected tiles
   */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [selectedTile, setSelectedTile] = useState([-1]);
  /* Constants
   * xIsNext: boolean indicating if the next symbol is X
   * currentSquares: the current state of the board
   * currentTile: the last tile selected
   */
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const currentTile = selectedTile[currentMove];

  // function that updates the game history and selected tiles' history after a play
  function handlePlay(nextSquares, nextTile) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextSelectedTile = [
      ...selectedTile.slice(0, currentMove + 1),
      nextTile,
    ];
    setHistory(nextHistory);
    setSelectedTile(nextSelectedTile);
    setCurrentMove(nextHistory.length - 1);
  }

  // function to jump to another move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          selectedTile={currentTile}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

/* function that calculates the winner based on the current state of the board */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
