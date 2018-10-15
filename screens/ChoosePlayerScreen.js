import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

export default class ChoosePlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.playersIcons = [
      (this.player1IconFn = require("./../assets/pig1.png")),
      (this.player1IconFn = require("./../assets/pig2.png")),
      (this.player1IconFn = require("./../assets/pig3.png")),
      (this.player2IconFn = require("./../assets/pig4.png"))
    ];
  }

  onPlayerChosen(x) {
    let playerName;
    switch (x) {
      case 0: {
        playerName = "Peppa Pig";
        break;
      }
      case 1: {
        playerName = "Candy Cat";
        break;
      }
      case 2: {
        playerName = "Freddy Fox";
        break;
      }
      case 3: {
        playerName = "Pedro Pony";
        break;
      }
    }

    if (this.state.player == 1) {
      this.player1Name = playerName;
      this.player1Icon = x;
    } else if (this.state.player == 2) {
      if (this.player1Icon == x) {
        Alert.alert("Sorry but " + playerName + " was already chosen!");
        return;
      }
      this.player2Name = playerName;
      this.player2Icon = x;
    }

    this.navigateToNextPage();
  }

  navigateToNextPage() {
    if (this.state.player == 1) {
      this.props.navigation.navigate("ChoosePlayer", {
        player1Name: this.player1Name,
        player1Icon: this.player1Icon
      });
    } else {
      this.props.navigation.navigate("Game", {
        player1Name: this.player1Name,
        player1Icon: this.player1Icon,
        player2Name: this.player2Name,
        player2Icon: this.player2Icon
      });
    }
  }

  getPlayerIcon(x) {
    return <Image style={styles.Image} source={this.playersIcons[x]} />;
  }

  render() {
    const { navigation } = this.props;
    this.player1Name = navigation.getParam("player1Name");
    this.player2Name = navigation.getParam("player2Name");
    this.player1Icon = navigation.getParam("player1Icon");
    this.player2Icon = navigation.getParam("player2Icon");

    if (!this.player1Name) {
      this.state = { player: 1 };
    } else {
      this.state = { player: 2 };
    }

    return (
      <View style={styles.container}>
        <Text style={styles.gameTitle}>Choose Player {this.state.player}</Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => this.onPlayerChosen(0)}
            style={styles.player}
          >
            {this.getPlayerIcon(0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onPlayerChosen(1)}
            style={styles.player}
          >
            {this.getPlayerIcon(1)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => this.onPlayerChosen(2)}
            style={styles.player}
          >
            {this.getPlayerIcon(2)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onPlayerChosen(3)}
            style={styles.player}
          >
            {this.getPlayerIcon(3)}
          </TouchableOpacity>
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
    backgroundColor: "#fff"
  },
  gameTitle: {
    fontSize: 30
  },
  player: {
    padding: 10,
    borderWidth: 5,
    borderRadius: 10,
    marginRight: 10,
    borderColor: "blue"
  }
});
