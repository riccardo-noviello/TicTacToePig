
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
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
    this.state = this.initialState;
  }

  renderIcon(row, col) {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Image source={require('./assets/pig1.png')} style={styles.image} />;
      case 2: return <Image source={require('./assets/pig2.png')} style={styles.image} />;
      default: return <View />;
    }
  }

  onTilePress(row, col) {
    let currentPlayer = this.state.currentPlayer;

    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Play Tic Tac Toe Pig!</Text>

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
