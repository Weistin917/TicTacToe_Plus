import { useState } from "react";

function Square({ value, onSquareClick, highlight }) {
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

function Board({ xIsNext, squares, onPlay, selectedTile }) {
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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [selectedTile, setSelectedTile] = useState([-1]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const currentTile = selectedTile[currentMove];

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
