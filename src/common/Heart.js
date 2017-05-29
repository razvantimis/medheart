import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
class Heart extends Component {
  static propTypes = {
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired
  }
  render(){
    const {value, scale } = this.props
    const styles = {
      heart: {
        width: 20*scale,
        height: 20*scale,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      },
      heartShape: {
        width: 12*scale,
        height: 18*scale,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 6*scale,
        borderTopRightRadius: 6*scale,
        backgroundColor: '#dd2421',
        borderColor: '#dd2421',
        borderWidth: 2,
        borderStyle: 'solid'
      },
      leftHeart: {
        transform: [
        {rotate: '-45deg'}
        ],
        left: 1.9*scale,
   
      },
      rightHeart: {
        transform: [
        {rotate: '45deg'}
        ],
        right: 1.9*scale,
     
      },
      text: {
        fontSize: 32, 
        color: '#fff',
        marginBottom: 20
      }
    }
    return (
    <View {...this.props} style={[styles.heart, this.props.style]}>
        <View style={[styles.leftHeart, styles.heartShape]} />
        <View style={[styles.rightHeart, styles.heartShape]} />
        <Text style={styles.text}>{value}</Text>
    </View>
    );
  }
}


export default Heart;