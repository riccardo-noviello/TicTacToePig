import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import GameScreen from "./screens/GameScreen";

const AppStackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Game: {
    screen: GameScreen
  }
});

export default class App extends Component {
  render() {
    return <AppStackNavigator />;
  }
}
