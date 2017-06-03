import React, { Component, PropTypes } from 'react';
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';

const background = require('./img/bg.png');
const logo = require('./img/logo.png')
class SplashSceen extends Component {

  render(){
    const { children } = this.props;
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode='cover'>
          <View style={styles.logoWrap}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText} > MedHeart </Text>
          </View>
          <View style={styles.wrapper}>
            { children }
          </View>
        </Image>
      </View>
    )
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoWrap: {
    flex: 1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'  
  },
  logo: {
    margin: 0
  },
  logoText: {
    marginLeft: 3,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0.01
  },
  wrapper: {
    paddingVertical: 100,
  },
  background: {
    width,
    height,
  }
});

export default SplashSceen;