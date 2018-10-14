
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert, TouchableHighlight } from 'react-native';
import Image from 'react-native-remote-svg';

const initialState = {
  gameState: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  currentPlayer: 1,
  gameOver: false
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  initialiseGame() {
    if(this.state){
      this.setState({
        gameState: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
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
      case 1: return <Image source={require('./assets/pig1.png')} style={styles.image} />;
      case -1: return <Image source={require('./assets/pig4.png')} style={styles.image} />;
      default: return <View />;
    }
  }

  /**
   * Returns the player name for the given player index.
   * @param {*} player 
   */
  getPlayerName(player) {
    return (player == 1) ? "Peppa Pig" : "Pedro Pony";
  }

  /**
   * Evalueates the sum is a set of Player 1 values (1+1+1) or Player 2 values (-1-1-1).
   */
  evaluateSum(sum) {
    return (sum == 3 || sum == -3);
  }

  /**
   * Evaluates if the game is over
   * @param {*} arr 
   */
  isGameFinished(arr) {
    const MAX_TILES = 3;
    let sum;
    let result = false;
    // check rows
    for (let i = 0; i < MAX_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      result = result || this.evaluateSum(sum);
    }
    // check columns
    for (let i = 0; i < MAX_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      result = result || this.evaluateSum(sum);
    }

    // check across left to right
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    result = result || this.evaluateSum(sum);

    // check across right to left
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    result = result || this.evaluateSum(sum);

    return result;
  }

  /**
   * Gets the next player to play
   */
  getNextPlayer(currentPlayer) {
    return currentPlayer * (-1);
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
    if (value !== 0 || this.state.gameOver) { return; }

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
      this.endGame(currentPlayer);
      this.initialiseGame();
      return;
    }
  }

  /**
   * Ends the game with a given player as a winner.
   * 
   * @param {*} player 
   */
  endGame(player) {
    const playerName = this.getPlayerName(player);
    Alert.alert(playerName + ' wins!');
    this.setState({ gameOver: true });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Play Tic Tac Toe Pigs!</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderPlayerIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderPlayerIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {this.renderPlayerIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderPlayerIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}>
            {this.renderPlayerIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0, }]}>
            {this.renderPlayerIcon(1, 2)}
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderPlayerIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderPlayerIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderPlayerIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.initialiseGame}
            underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>New Game</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    color: "red",
    textAlign: 'center',
    marginBottom: 40,
  },
  tile: {
    borderWidth: 5,
    width: 120,
    height: 120,
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
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
