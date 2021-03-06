import React from "react";
import PromptOne from "./PromptOne";
import PromptTwo from "./PromptTwo";
import Board from "./Board";

/**
 * Tic-Tac-Toe Component
 * @module ./TicTacToe
 *
 */
class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "Prompt One",
      useComputer: false,
      player1: "",
      player2: "",
      p1Score: 0,
      p2Score: 0,
      turn: "Player 1",
      winner: "",
      tiles: [
        { id: "square1", class: "square", value: "" },
        { id: "square2", class: "square", value: "" },
        { id: "square3", class: "square", value: "" },
        { id: "square4", class: "square", value: "" },
        { id: "square5", class: "square", value: "" },
        { id: "square6", class: "square", value: "" },
        { id: "square7", class: "square", value: "" },
        { id: "square8", class: "square", value: "" },
        { id: "square9", class: "square", value: "" },
      ],
      tilesLeft: 9,
    };

    this.gameType = this.gameType.bind(this);
    this.playersCheck = this.playersCheck.bind(this);
    this.reset = this.reset.bind(this);
    this.turnCheck = this.turnCheck.bind(this);
    this.updateSquare = this.updateSquare.bind(this);
    this.computersMove = this.computersMove.bind(this);
    this.calcWinner = this.calcWinner.bind(this);
    this.findWinner = this.findWinner.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  gameType(e) {
    this.setState({
      useComputer: e.target.innerHTML === "Player vs Computer" ? true : false,
      display: "Prompt Two",
    });
  }

  playersCheck(e) {
    this.setState({
      player1: e.target.innerHTML,
      player2: e.target.innerHTML === "X" ? "O" : "X",
      display: "Board",
    });
  }

  reset() {
    this.setState({
      display: "Prompt One",
      useComputer: false,
      player1: "",
      player2: "",
      p1Score: 0,
      p2Score: 0,
      turn: "Player 1",
      winner: "",
      tiles: [
        { id: "square1", class: "square", value: "" },
        { id: "square2", class: "square", value: "" },
        { id: "square3", class: "square", value: "" },
        { id: "square4", class: "square", value: "" },
        { id: "square5", class: "square", value: "" },
        { id: "square6", class: "square", value: "" },
        { id: "square7", class: "square", value: "" },
        { id: "square8", class: "square", value: "" },
        { id: "square9", class: "square", value: "" },
      ],
      tilesLeft: 9,
    });
  }

  turnCheck() {
    const { turn } = this.state;

    if (turn === "Player 1") {
      return "Player 1's turn!";
    } else if (turn === "Player 2") {
      return "Player 2's turn!";
    } else {
      return "Computer's turn!";
    }
  }

  updateSquare(e) {
    const { turn } = this.state;

    // Copies the value of the tiles to a variables
    // and gets the tile that was selected
    const board = [...this.state.tiles];
    const i = parseInt(e.target.id.replace("square", "")) - 1;

    // Prevents players from using already used tiles and from making moves
    // after the game is finished or during the Computer's turn
    if (this.state.winner || board[i].value || turn === "Computer") return;

    // Updates selected tiles when tiles are available
    if (this.state.tilesLeft > 0) {
      if (turn === "Player 1") {
        board[i].value = this.state.player1;
        board[i].class += " disabled";

        this.setState((state) => ({
          turn: state.useComputer ? "Computer" : "Player 2",
          tilesLeft: state.tilesLeft - 1,
        }));

        // Allows the Computer to make a move
        if (this.state.useComputer) {
          setTimeout(() => this.computersMove(), 1000);
        }
      } else {
        board[i].value = this.state.player2;
        board[i].class += " disabled";

        this.setState((state) => ({
          turn: "Player 1",
          tilesLeft: state.tilesLeft - 1,
        }));
      }
    }

    // Allows "Draws" to be found
    setTimeout(() => this.findWinner(), 100);
  }

  computersMove() {
    const squares = [...this.state.tiles];
    let completed = false;

    // Prevents computer from making any moves when the game is over
    if (this.state.winner) return;

    // Loops until a tile with no value is used when tiles are available
    while (!completed && this.state.tilesLeft > 0) {
      const index = Math.floor(Math.random() * squares.length);

      // Prevents the computer from using tiles used by Player 1
      if (squares[index].value === "") {
        completed = true;
        squares[index].value = this.state.player2;
        squares[index].class += " disabled";

        this.setState((state) => ({
          turn: "Player 1",
          tilesLeft: state.tilesLeft - 1,
        }));
      }
    }

    this.findWinner();
  }

  findWinner() {
    const calculated = this.calcWinner();
    let ended = true;

    // Determines the winner
    if (calculated === this.state.player1) {
      this.setState((state) => ({
        winner: "Player 1",
        p1Score: state.p1Score + 1,
      }));
    } else if (calculated === this.state.player2) {
      this.setState((state) => ({
        winner: state.useComputer ? "Computer" : "Player 2",
        p2Score: state.p2Score + 1,
      }));
    } else {
      if (this.state.tilesLeft === 0) {
        this.setState({ winner: "Draw" });
      } else {
        ended = false;
      }
    }

    // Starts a new game once the current game has ended
    if (ended) setTimeout(() => this.newGame(), 5000);
  }

  calcWinner() {
    const squares = [...this.state.tiles];
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Loops through all possible winning combinations
    for (let i = 0; i < winCombos.length; i++) {
      const [r1, r2, r3] = winCombos[i];

      if (
        squares[r1].value === squares[r2].value &&
        squares[r1].value === squares[r3].value &&
        squares[r2].value === squares[r3].value
      ) {
        return squares[r1].value;
      }
    }

    return null;
  }

  checkWinner() {
    switch (this.state.winner) {
      case "Player 1":
        return "Player 1 wins!";
      case "Player 2":
        return "Player 2 wins!";
      case "Computer":
        return "Computer wins!";
      case "Draw":
        return "It's a draw!";
      default:
        return "";
    }
  }

  newGame() {
    this.setState({
      turn: "Player 1",
      winner: "",
      tiles: [
        { id: "square1", class: "square", value: "" },
        { id: "square2", class: "square", value: "" },
        { id: "square3", class: "square", value: "" },
        { id: "square4", class: "square", value: "" },
        { id: "square5", class: "square", value: "" },
        { id: "square6", class: "square", value: "" },
        { id: "square7", class: "square", value: "" },
        { id: "square8", class: "square", value: "" },
        { id: "square9", class: "square", value: "" },
      ],
      tilesLeft: 9,
    });
  }

  render() {
    return (
      <div id="tic-tac-toe">
        {this.state.display === "Prompt One" ? (
          <PromptOne onClick={this.gameType} />
        ) : this.state.display === "Prompt Two" ? (
          <PromptTwo
            useComputer={this.state.useComputer}
            onClick={this.playersCheck}
          />
        ) : (
          <Board
            p1Score={this.state.p1Score}
            p2Score={this.state.p2Score}
            useComputer={this.state.useComputer}
            tiles={this.state.tiles}
            tilesLeft={this.state.tilesLeft}
            winner={this.checkWinner()}
            endGame={this.reset}
            newGame={this.newGame}
            updateSquare={this.updateSquare}
            turn={this.turnCheck()}
          />
        )}
      </div>
    );
  }
}

export default TicTacToe;
