import { render } from "@testing-library/react";
import TicTacToe from "./TicTacToe";

test("rendered test", () => {
  render(<TicTacToe />);
  expect(document.getElementById("tic-tac-toe")).not.toBeEmptyDOMElement();
});
