import { useState } from "react";

function Square({ id, value, onSquareClick }) {
  return (
    <button 
      id={id}
      className="square"
      onClick={onSquareClick}
      >
        {value}
    </button>
    );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
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

  const moves = history.map((squares, move) => {
    let description;
    move > 0 ? description = 'Go to move #' + move 
      : description = 'Go to game start';
    return (
      <li key={move}>
        {(move === currentMove)
         ? <span>{description}</span>
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
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  winner ? status = "Winner: " + winner 
    : status = "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;
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
        entries.push(
        <Square 
          key={i+offset}
          id={i+offset} 
          value={squares[i+offset]} 
          onSquareClick={() => handleClick(i+offset)}
        />
      );
      }
      return <div className="board-row" key={'r'+offset} id={'r'+offset}>{entries}</div>
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <BuildBoard />
      {
        /*
        [...Array(3)].map((x, i) => {
          <Square value={squares[i]} onSquareClick={() => handleClick(i)}/>
        })
      /*Array(9).fill(true).map((el, i) => {
        let boardOut;
        i % 3 === 0 ? boardOut += <div><Square value={squares[i]} onSquareClick={() => handleClick(i)}/>
          : i % 2 === 0 ? boardOut += </div><p>dog</p>
          : boardOut += <p>cat</p>;
        return (<>{boardOut}</>);
        //console.log(i);
        /*
        return (i % 3 === 0 ? (<div className="board-row"><Square value={squares[i]} onSquareClick={() => handleClick(i)}/>)
          : (i % 2 === 0 ? <Square value={squares[i]} onSquareClick={() => handleClick(i)}/></div>
          : <Square value={squares[i]} onSquareClick={() => handleClick(i)}/>
        )
      )
      */
     /*
      })}
      {
      /*
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
  */}
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
      return squares[a];
    }
  }
  return null;
}