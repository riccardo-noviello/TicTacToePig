import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React, { Component } from "react";

/**
 * Custom Button component, to obviate the failure of using react-native Button (broken).
 */
export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={() => this.props.onPress()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.label}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
