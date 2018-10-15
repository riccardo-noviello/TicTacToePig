import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>asdasd</Text>
        <Button
          label="Start Game"
          onPress={() =>
            this.props.navigation.navigate("Game", {
              player1Name: "Riccardo",
              player2Name: "Riccardo"
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
  }
});
