import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';

const TEXT_SCRIPTS = {
  welcome: "Welcome to Co-Pilot B9.",
  welcome2: "I'll help you stay alert by letting you know when we reach high accident areas.",
  noAlert: "It Looks like we're in the clear. Let's stay alert and I'll let you know when we reach another high accident area.",
  alert: "Now entering a high accident area. Let's stay alert!",
  distracted: "Did you just get distracted?"
}

export default function App() {

  // State for alert, text
  const [alertState, setAlertState] = useState("distracted");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        return setErrorMsg('Permission to access location was denied');
      }

      let currentLocation = await Location.getCurrentPositionAsync({});

      // set location if location === null
      if (!location) {
        setLocation(currentLocation);
      }
      
      // calculate difference between currentLocation and state location to update state location
      const dLongitude = Math.abs(currentLocation.coords.longitude - location.coords.longitude);
      const dLatitude = Math.abs(currentLocation.coords.latitude - location.coords.latitude);
      if (dLongitude > 0.000005 || dLatitude > 0.000005) {
        setLocation(currentLocation);
      }

      console.log(location);
    })();
  }, []);

  // Function to return text to speech  
  const getSpeak = () => {
    switch(alertState) {
      case "welcome2":
        return Speech.speak(TEXT_SCRIPTS.welcome2);
      case "noAlert": 
        return Speech.speak(TEXT_SCRIPTS.noAlert);
      case "alert":
        return Speech.speak(TEXT_SCRIPTS.alert);
      case "distracted":
        return Speech.speak(TEXT_SCRIPTS.distracted);
      default:
        setAlertState("welcome2");
        return Speech.speak(TEXT_SCRIPTS.welcome);
    }
  }

  // Function to return text below header
  const getText = () => {
    switch(alertState) {
      case "welcome2":
        return <Text style={styles.paragraph}>{TEXT_SCRIPTS.welcome2}</Text>;
      case "noAlert":
        return <Text style={styles.paragraph}>{TEXT_SCRIPTS.noAlert}</Text>;
      case "alert":
        return <Text style={styles.paragraph}>{TEXT_SCRIPTS.alert}</Text>;
      case "distracted":
        return <Text style={styles.paragraph}>{TEXT_SCRIPTS.distracted}</Text>;
      default:
        return;
    }
  }

  // Function to update React Native Lottie animation
  const getAnimation = () => {
    switch(alertState) {
      case "noAlert":
        return <LottieView style={styles.lottie} source={require('./assets/car2.json')} autoPlay loop />
      case "alert":
        return <LottieView style={styles.lottie} source={require('./assets/warning3.json')} autoPlay loop />
      case "distracted":
        return <LottieView style={styles.lottie} source={require('./assets/attention2.json')} autoPlay loop />
      default:
        return <LottieView style={styles.lottie} source={require('./assets/car2.json')} autoPlay loop />;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.header}>Welcome to Co-Pilot B9</Text>
        {getText()}
      </View>
      <View style={styles.lottieView}>
        {getAnimation()}
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
  lottie: {
    height: "100%",
    width: "100%"
  },
  paragraph: {
    padding: 20
  }
});