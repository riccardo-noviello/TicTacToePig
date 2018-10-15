import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.gameTitle}>Play Tic Tac Toe Pigs!</Text>
        <Button
          label="Start Game"
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
