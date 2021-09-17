/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

/**
 * The first prompt component
 * @param {*} props   Represents the properties passed to the component
 * @module ./PromptOne
 *
 * @returns           Returns the rendered component
 */
const PromptOne = (props) => {
  return (
    <div id="prompt">
      <h1>How do you want to play?</h1>

      <div id="options">
        <a onClick={props.onClick}>Player vs Computer</a>
        <a onClick={props.onClick}>Player vs Player</a>
      </div>
    </div>
  );
};

export default PromptOne;
