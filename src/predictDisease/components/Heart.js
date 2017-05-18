import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
class Heart extends Component {
  static propTypes = {
    style: PropTypes.object
  }
  render(){
    return (
    <View {...this.props} style={[styles.heart, this.props.style]}>
        <View style={[styles.leftHeart, styles.heartShape]} />
        <View style={[styles.rightHeart, styles.heartShape]} />
    </View>
    );
  }
}
const styles = {
  heart: {
    width: 200,
    height: 200
   
  },
  heartShape: {
    width: 120,
    height: 180,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: '#EE1B24',
  },
  leftHeart: {
    transform: [
        {rotate: '-45deg'}
    ],
    left: 19,
   
  },
  rightHeart: {
    transform: [
        {rotate: '45deg'}
    ],
    right: 19,
     
  }
}

export default Heart;