import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';

const App = () => {
  const sayWelcome = () => {
    Speech.speak("Welcome");
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.header}>Welcome to Co-Pilot B9</Text>
      </View>
      <View style={styles.lottieView}>
        <LottieView
          style={styles.lottiView}
          source={require('./assets/car2.json')}
          autoPlay
          loop
        />
      </View>
      {sayWelcome()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    width: "100%",
    borderColor: "black",
    borderWidth: 5
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  lottieView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
    width: "100%",
    borderColor: "red",
    borderWidth: 5
  }
});

export default App;