import { useState } from "react";

function Square({ id, dataTestid, value, className, onSquareClick }) {
  return (
    <button 
      id={id}
      className={className}
      data-testid={dataTestid}
      onClick={onSquareClick}
      >
        {value}
    </button>
    );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [reverse, setReverse] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleReverse() {
    setReverse(!reverse);
  }
  
  function getNewIndex(move) {
    if (move === 0) return; 
    const last = history[move-1];
    const current = history[move];
    let index;
    for (let i = 0; i < current.length; i++) {
      if (last[i] !== current[i]) {
        index = i;
        break;
      }
    }
    return [Math.floor(index / 3), index % 3];
  }

  const moves = history.map((squares, move) => {
    let description;
    move > 0 ? description = 'Go to move #' + move + " [" + getNewIndex(move) + "]"
      : description = 'Go to game start';

    return (
      <li key={move}>
        {(move === currentMove)
         ? <span data-testid={"txt_move_"+move}>{description}</span>
         : <button onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <button onClick={handleReverse} data-testid="button_reverse">Reverse Ordering</button>
        <ol>{(reverse) ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
}

function isFull(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null) return false;
  }
  return true;
}

function Board({ xIsNext, squares, onPlay }) {
  const line = calculateWinner(squares);
  const winner = squares[line[0]];
  let status;
  console.log(winner + " " + line) 
  winner ? status = "Winner: " + winner
    : isFull(squares) ? status = "Draw game"
    : status = "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(i) {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";
    onPlay(nextSquares);
  }

  function BuildBoard() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows = [...rows, buildRow(i*3)];
    }

    return rows;

    function buildRow(offset) {
      const entries = [];
      for (let i = 0; i < 3; i++) {
        const index = i + offset;
        entries.push(
        <Square 
          key={index}
          id={index}
          dataTestid={"button_square_"+index}
          className={line.includes(index) ? "winner" : "square"}
          value={squares[index]} 
          onSquareClick={() => handleClick(index)}
        />
      );
      }
      const rowName = "row_" + Math.floor(offset/3);
      return <div 
        className="board-row" 
        key={rowName}
        id={rowName} 
        data-testid={rowName}>
          {entries}
        </div>
    }
  }

  return (
    <>
      <div className="status" data-testid="txt_status">{status}</div>
      <BuildBoard />
    </>
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
    [2, 4, 6]
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(lines[i]);
      return lines[i];
    }
  }
  
  return [null];
}