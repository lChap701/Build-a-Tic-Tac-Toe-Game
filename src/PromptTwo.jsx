/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

/**
 * The first prompt component
 * @param {*} props   Represents the properties passed to the component
 * @module ./PromptTwo
 *
 * @returns           Returns the rendered component
 */
const PromptTwo = (props) => {
  return (
    <div id="prompt">
      <h1>
        {props.useComputer
          ? "Do you want to be X or O?"
          : "Player 1, do you want to be X or O?"}
      </h1>

      <div id="options">
        <a onClick={props.onClick}>X</a>
        <a onClick={props.onClick}>O</a>
      </div>
    </div>
  );
};

export default PromptTwo;
