import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

export default class ChoosePlayerScreen extends Component {
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
        <Text style={styles.gameTitle}>Choose Player</Text>
        <Button
          label="Next"
          onPress={() =>
            this.props.navigation.navigate("Game", {
              player1Name: "Peppa",
              player2Name: "Pedro"
            })
          }
        />
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
  }
});