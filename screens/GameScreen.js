import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight
} from "react-native";
import Image from "react-native-remote-svg";

const MAX_TILES = 3;
const NO_MORE_MOVES_MESSAGE = "No more moves available. Game Over";
const initialState = {
  gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  currentPlayer: 1,
  gameOver: false
};

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.player1Name = "Peppa Pig";
    this.player2Name = "Pedro Pony";
    this.playersIcons = [
      (this.player1IconFn = require("./../assets/pig1.png")),
      (this.player1IconFn = require("./../assets/pig2.png")),
      (this.player1IconFn = require("./../assets/pig3.png")),
      (this.player2IconFn = require("./../assets/pig4.png"))
    ];
    this.player1Icon = this.playersIcons[0];
    this.player2Icon = this.playersIcons[3];
  }

  initialiseGame() {
    if (this.state) {
      this.setState({
        gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        currentPlayer: 1,
        gameOver: false
      });
    }
  }

  /**
   * Renders the players Icon for the given (row,col) coordinate.
   * @param {*} row
   * @param {*} col
   */
  renderPlayerIcon(row, col) {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Image source={this.player1Icon} style={styles.image} />;
      case -1:
        return <Image source={this.player2Icon} style={styles.image} />;
      default:
        return <View />;
    }
  }

  /**
   * Returns the player name for the given player index.
   * @param {*} player
   */
  getPlayerName(player) {
    return player == 1
      ? this.player1Name + " wins!"
      : this.player2Name + " wins!";
  }

  /**
   * Evaluates the sum is a set of Player 1 values (1+1+1) or Player 2 values (-1-1-1).
   */
  strikesThree(sum) {
    return sum == 3 || sum == -3;
  }

  /**
   * Evaluates the array does not have any futher moves available
   */
  noMoreMoves(arr) {
    let noMoreMoves = true;
    for (let i = 0; i < MAX_TILES; i++) {
      for (let j = 0; j < MAX_TILES; j++) {
        if (arr[i][j] == 0) {
          return false;
        }
      }
    }
    return noMoreMoves;
  }

  /**
   * Evaluates if the game is over
   * @param {*} arr
   */
  isGameFinished(arr) {
    let sumRows;
    let sumCols;
    let sumDiagonal1;
    let sumDiagonal2;

    // check rows
    for (let i = 0; i < MAX_TILES; i++) {
      sumRows = arr[i][0] + arr[i][1] + arr[i][2];
    }
    // check columns
    for (let i = 0; i < MAX_TILES; i++) {
      sumCols = arr[0][i] + arr[1][i] + arr[2][i];
    }

    // check diagonal 1
    sumDiagonal1 = arr[0][0] + arr[1][1] + arr[2][2];

    // check diagonal 2
    sumDiagonal2 = arr[0][2] + arr[1][1] + arr[2][0];

    return (
      this.strikesThree(sumRows) ||
      this.strikesThree(sumCols) ||
      this.strikesThree(sumDiagonal1) ||
      this.strikesThree(sumDiagonal2)
    );
  }

  /**
   * Gets the next player to play
   */
  getNextPlayer(currentPlayer) {
    return currentPlayer * -1;
  }

  /**
   * Handles a Tile being pressed.
   *
   * @param {*} row
   * @param {*} col
   */
  onTilePress(row, col) {
    // values cannot change
    let value = this.state.gameState[row][col];
    if (value !== 0 || this.state.gameOver) {
      return;
    }

    let currentPlayer = this.state.currentPlayer;

    // set game state
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    // set next player
    let nextPlayer = this.getNextPlayer(currentPlayer);
    this.setState({ currentPlayer: nextPlayer });

    // finish game
    if (this.isGameFinished(arr)) {
      this.endGame(this.getPlayerName(currentPlayer));
      return;
    } else if (this.noMoreMoves(arr)) {
      this.endGame(NO_MORE_MOVES_MESSAGE);
      return;
    }
  }

  /**
   * Ends the game with a given message to display.
   *
   * @param {*} message
   */
  endGame(message) {
    Alert.alert(message);
    this.setState({ gameOver: true });
  }

  render() {
    const { navigation } = this.props;
    this.player1Name = navigation.getParam("player1Name");
    this.player2Name = navigation.getParam("player2Name");
    if (navigation.getParam("player1Icon")) {
      this.player1Icon = playersIcons[navigation.getParam("player1Icon")];
    }
    if (navigation.getParam("player2Icon")) {
      this.player1Icon = playersIcons[navigation.getParam("player2Icon")];
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Play Tic Tac Toe Pigs!</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderPlayerIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.renderPlayerIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderPlayerIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.renderPlayerIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}
          >
            {this.renderPlayerIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.renderPlayerIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderPlayerIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.renderPlayerIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderPlayerIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => this.initialiseGame()}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Play again!</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 22,
    color: "red",
    textAlign: "center",
    marginBottom: 40
  },
  tile: {
    borderWidth: 5,
    width: 120,
    height: 120
  },
  image: {
    marginTop: 10,
    marginLeft: 10
  },
  buttonContainer: {
    paddingTop: 50
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  buttonText: {
    padding: 20,
    color: "white"
  }
});