import { FC } from "react";

import Square from "../Square";
const Board: FC<{
  xIsNext: boolean;
  squares: string[];
  onPlay: Function;
  winner: any;
  currentMove: number;
}> = Props => {
  const rowSize = 3;
  const colSize = 3;
  function handleClick({
    i,
    row,
    col
  }: {
    i: number;
    row: number;
    col: number;
  }) {
    if (Props?.winner?.winner || Props.squares[i]) {
      return;
    }
    const nextSlot = { row, col };
    const nextSquares = Props.squares.slice();
    if (Props.xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    Props.onPlay({ nextSquares, nextSlot });
  }

  let status = "Next player: " + (Props.xIsNext ? "X" : "O");
  if (Props.currentMove === 9) status = "Draw";
  if (Props?.winner?.winner) {
    status = "Winner: " + Props?.winner?.winner;
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array.from({ length: rowSize }).map((_, row) => (
        <div className="board-row" key={row}>
          {Array.from({ length: colSize }).map((_, col) => {
            const curCol = 3 * row + col;
            return (
              <Square
                key={col}
                value={Props.squares[curCol]}
                onSquareClick={() => {
                  handleClick({ i: curCol, row, col });
                }}
                isWinner={Props?.winner?.slots.includes(curCol)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Board;
