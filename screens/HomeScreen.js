import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.gameTitle}>Play Tic Tac Toe Pigs!</Text>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("./../assets/logo.png")}
        />
        <Button
          label="Choose Characters"
          onPress={() => this.props.navigation.navigate("ChoosePlayer")}
        />
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
