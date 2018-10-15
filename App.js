import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import ChoosePlayerScreen from "./screens/ChoosePlayerScreen";

const AppStackNavigator = createStackNavigator({
  Login: {
    screen: HomeScreen
  },
  ChoosePlayer: {
    screen: ChoosePlayerScreen
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
