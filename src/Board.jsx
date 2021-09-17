/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Square from "./Square";
import Winner from "./Winner";

/**
 * Board Component
 * @param {*} props   Represents the properties passed to the component
 * @module ./Board
 *
 * @returns           Returns the rendered component
 */
const Board = (props) => {
  return (
    <div id="board">
      <div id="heading">
        <div className="wrapper">
          <div className="col">
            <p>{props.p1Score}</p>
            <p>Player 1</p>
          </div>

          <div className="col">
            <p>{props.p2Score}</p>
            <p>{props.useComputer ? "Computer" : "Player 2"}</p>
          </div>
        </div>

        <div className="col">
          {props.winner === "" ? <b>{props.turn}</b> : <b>Game Over</b>}
        </div>

        <a onClick={props.endGame}>End</a>
      </div>

      {props.winner !== "" ? <Winner text={props.winner} /> : ""}

      <div id="rows">
        {props.tiles.map((t) => (
          <Square
            id={t.id}
            class={t.class}
            value={t.value}
            onClick={props.updateSquare}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
