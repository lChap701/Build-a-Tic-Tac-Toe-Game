/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

/**
 * Square Component
 * @param {*} props   Represents the properties passed to the component
 * @module ./Square
 *
 * @returns           Returns the rendered component
 */
const Square = (props) => {
  return (
    <a id={props.id} className={props.class} onClick={props.onClick}>
      {props.value}
    </a>
  );
};

export default Square;
