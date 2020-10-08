import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default class BasicExample extends React.Component {
  render() {
    return (
       <View style={styles.lottieView}>
            <LottieView source={require('../assets/car.json')} autoPlay loop />
       </View> 
    )
  }
}

const styles = StyleSheet.create({
    lottieView: {
        width: "100%",
        height: "60%"
    }
})