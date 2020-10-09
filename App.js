import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';

const TEXT_SCRIPTS = {
  welcome: "Welcome to Co-Pilot B9. I'll help you stay alert by letting you know when we reach high accident areas.",
  noAlert: "It Looks like we're in the clear. Let's stay alert and I'll let you know when we reach another high accident area.",
  alert: "Now entering a high accident area. Let's stay alert!",
  distracted: "Did you just get distracted?"
}

export default function App() {

  // State for alert, text
  const [alertState, setAlertState] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        return setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, [])



  // Function to return 
  
  const getSpeak = () => {
    switch(alertState) {
      case "welcome":
        return Speech.speak(TEXT_SCRIPTS.welcome);
      case "noAlert": 
        return Speech.speak(TEXT_SCRIPTS.noAlert);
      case "alert":
        return Speech.speak(TEXT_SCRIPTS.alert);
      case "distracted":
        return Speech.speak(TEXT_SCRIPTS.distracted);
      default:
        return Speech.speak(TEXT_SCRIPTS.welcome);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.header}>Welcome to Co-Pilot B9</Text>
        {/* <Text style={styles.paragraph}>I'll help you stay alert by letting you know when we reach high accident areas.</Text> */}
        {/* <Text style={styles.paragraph}>Now entering a high accident area. Let's stay alert!</Text> */}
        <Text style={styles.paragraph}>Did you just get distracted?</Text>
      </View>
      <View style={styles.lottieView}>
        <LottieView
          style={styles.lottiView}
          source={require('./assets/attention2.json')}
          autoPlay
          loop
        />
      </View>
      {getSpeak()}
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