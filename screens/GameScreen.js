import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  Image
} from "react-native";
import Button from "../components/Button";

const MAX_TILES = 3;
const NO_MORE_MOVES_MESSAGE = "No more moves available";
const initialState = {
  gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  currentPlayer: 1,
  gameOver: false,
  currentPlayerName: ""
};

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.player1Name = "";
    this.player2Name = "";
    this.playersIcons = [
      (this.player1IconFn = require("./../assets/pig1.png")),
      (this.player1IconFn = require("./../assets/pig2.png")),
      (this.player1IconFn = require("./../assets/pig3.png")),
      (this.player2IconFn = require("./../assets/pig4.png"))
    ];
    this.player1Icon = this.playersIcons[0];
    this.player2Icon = this.playersIcons[3];
  }

  componentDidMount() {
    this.initialiseGame();
  }

  initialiseGame() {
    if (this.state) {
      this.setState({
        gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        currentPlayer: 1,
        gameOver: false,
        currentPlayerName: ""
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
    return player == 1 ? this.player1Name : this.player2Name;
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
    let sum;
    let result = false;

    // check rows
    for (let i = 0; i < 3; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      result = result || this.strikesThree(sum);
    }
    // check columns
    for (let i = 0; i < 3; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      result = result || this.strikesThree(sum);
    }

    // check diagonal 1
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    result = result || this.strikesThree(sum);

    // check diagonal 2
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    result = result || this.strikesThree(sum);

    return result;
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
    let currentPlayerName = this.getPlayerName(nextPlayer);
    this.setState({ currentPlayerName: currentPlayerName });

    // finish game
    if (this.isGameFinished(arr)) {
      this.endGame(this.getPlayerName(currentPlayer) + " wins!");
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
      this.player1Icon = this.playersIcons[navigation.getParam("player1Icon")];
    }
    if (navigation.getParam("player2Icon")) {
      this.player2Icon = this.playersIcons[navigation.getParam("player2Icon")];
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Your turn: {this.getPlayerName(this.state.currentPlayer)}
        </Text>

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

        <Button label="Play again!" onPress={() => this.initialiseGame()} />
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
    fontSize: 20,
    color: "red",
    textAlign: "center",
    marginBottom: 5
  },
  tile: {
    borderWidth: 5,
    width: 120,
    height: 120
  },
  image: {
    marginTop: 10,
    marginLeft: 10
  }
});
