import { FC, MouseEventHandler } from "react";
const Square: FC<{
  value: string;
  onSquareClick: MouseEventHandler;
  isWinner: boolean;
}> = Props => {
  return (
    <button
      className={"square" + (Props.isWinner ? " winner" : "")}
      onClick={Props.onSquareClick}>
      {Props.value}
    </button>
  );
};

export default Square;
