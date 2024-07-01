import { useState } from "react";
import Board from "./Board";
import Moves from "./Moves";
export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState({ winner: null, slots: Array(3) });
  const xIsNext = currentMove % 2 === 0;
  // const [moveSlotHistory, setMoveSlotHistory] = useState([
  //   Array(9).fill({ row: null, col: null })
  // ]);
  // const currentMoveSlot = moveSlotHistory[currentMove];
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    const _winner = calculateWinner(nextSquares);
    if (_winner) setWinner(_winner);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setWinner({ winner: null, slots: Array(3) });
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winner={winner}
          currentMove={currentMove}
        />
      </div>
      <div className="game-info">
        <Moves history={history} jumpTo={jumpTo} currentMove={currentMove} />
      </div>
    </div>
  );
}
function calculateWinner(squares: any[]) {
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
      return {
        winner: squares[a],
        slots: lines[i]
      };
    }
  }
  return null;
}
