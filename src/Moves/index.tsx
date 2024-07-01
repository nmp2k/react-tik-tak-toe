import { FC, useState } from "react";
const Moves: FC<{
  history: any[][];
  jumpTo: Function;
  currentMove: number;
}> = Props => {
  const [isReverse, setIsReverse] = useState(false);
  let moves = Props.history.map((_, move) => {
    const desc = Number(move) > 0 ? "Go to move #" + move : "Go to game start";
    if (move === Props.currentMove)
      return (
        <li key={move}>
          <p>{desc}</p>
        </li>
      );

    return (
      <li key={move}>
        <button onClick={() => Props.jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <>
      <button
        className="reverse-order"
        onClick={() => setIsReverse(!isReverse)}>
        reverse order
      </button>
      <ol>{isReverse ? moves.reverse() : moves}</ol>;
    </>
  );
};

export default Moves;
