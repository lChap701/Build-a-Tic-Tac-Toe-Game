import React from "react";

/**
 * Winner Overlay Component
 * @param {*} props   Represents the properties passed to the component
 * @module ./Winner
 *
 * @returns           Returns the rendered component
 */
const Winner = (props) => {
  return (
    <div id="overlay">
      <h1>{props.text === "" ? "" : props.text}</h1>
    </div>
  );
};

export default Winner;
