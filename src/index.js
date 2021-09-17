import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import TicTacToe from "./TicTacToe";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(<TicTacToe />, document.querySelector("#game"));
reportWebVitals(console.log);
