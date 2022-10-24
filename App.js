import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";

const letters = [
  { letter: "A" },
  { letter: "B" },
  { letter: "C" },
  { letter: "D" },
  { letter: "E" },
];

const letterIndex = "";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLetterIndex: 0,
      results: "",
    };
  }

  dynamicLabels = function (props) {
    return "Students who got a/an " + props + " grade.";
  };

  onLoad = async () => {
    this.setState({ results: "Loading, please wait..." });
    const response = await fetch(
      "https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData?grade=" +
        letters[this.state.selectedLetterIndex].letter,
      {
        method: "GET",
      }
    );

    const results = await response.text();
    this.setState({ results });
  };

  render() {
    const { results } = this.state;
    const buttons = letters.map((letter, index) => {
      return (
        <SafeAreaView>
          <Text>{this.dynamicLabels(letter.letter)}</Text>
          <Pressable
            style={styles.buttonLayout.buttonContainer}
            onPressIn={() => this.setState({ selectedLetterIndex: index })}
            buttonStyle={styles.buttonLayout}
            key={letters.letter}
            onPress={this.onLoad}
            title={letter.letter}
          >
            <Text>
              {letter.letter} ({index})
            </Text>
          </Pressable>
        </SafeAreaView>
      );
    });

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.preview}
            value={results}
            placeholder="Results..."
            editable={false}
            multiline
          />
        </View>

        <View>{buttons}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  preview: {
    backgroundColor: "#bdc3c7",
    width: 300,
    height: 400,
    padding: 10,
    borderRadius: 5,
    color: "#333",
    marginBottom: 50,
  },
  button: {
    margin: 0,
    backgroundColor: "deeppink",
  },
  buttonLayout: {
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    buttonContainer: {
      backgroundColor: "dodgerblue",
      padding: 10,
      marginBottom: 10,
      alignItems: "center",
      height: 45,
    },
  },
  labelContainer: {
    backgroundColor: "deeppink",
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    height: 15,
  },
});
