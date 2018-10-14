
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import Image from 'react-native-remote-svg';

const initialState = {
  gameState: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  currentPlayer: 1
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  initialGame() {
    this.setState(this.initialState);
  }

  renderIcon(row, col) {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Image source={require('./assets/pig1.png')} style={styles.image} />;
      case -1: return <Image source={require('./assets/pig4.png')} style={styles.image} />;
      default: return <View />;
    }
  }

  getPlayerName(player){
    return (player == 1) ? "Peppa Pig" : "Pedro Pony";
  }

  evaluateSum(sum){
    return (sum == 3 || sum == -3);
  }

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

  getNextPlayer(currentPlayer) {
    return currentPlayer * (-1);
  }

  onTilePress(row, col) {
    // values cannot change
    let value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    let currentPlayer = this.state.currentPlayer;

    // set game state
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    // set next player
    let nextPlayer = this.getNextPlayer(currentPlayer);
    this.setState({ currentPlayer: nextPlayer });

    if(this.isGameFinished(arr)){
      this.showWinner(currentPlayer);
      return;
    }
  }

  showWinner(player){
    const playerName = this.getPlayerName(player);
    Alert.alert('Player ' + playerName + ' wins!');
    this.initialGame();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Play Tic Tac Toe Pigs!</Text>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0, }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
});
