
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as ble from '../actions';
import redTheme from '../../themes/redTheme';
class ErrorComponent extends Component {
  render() {
    const lastError = this.props.errorMessages[this.props.errorMessages.length-1]

    if (!lastError) {
      return null
    }

    return (
      <TouchableOpacity onPress={this.props.pop}>
        <View style={redTheme.errorComponent.container}>
          <Text style={redTheme.errorComponent.message}>{lastError}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


export default connect(
  state => ({
    errorMessages: state.ble.errors
  }),
  {
    pop: ble.popError
  }
)(ErrorComponent)