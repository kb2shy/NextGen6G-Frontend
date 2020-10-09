import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';

const App = () => {
  
  const sayWelcome = () => {
    Speech.speak("Welcome to Co-Pilot B9. I'll help you stay alert by letting you know when we reach high accident areas.");
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.header}>Welcome to Co-Pilot B9</Text>
        <Text style={styles.paragraph}>I'll help you stay alert by letting you know when we reach high accident areas.</Text>
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
    backgroundColor: '#fff',
    paddingTop: 50
  },
  containerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    width: "100%",
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
  },
  paragraph: {
    padding: 20
  }
});

export default App;