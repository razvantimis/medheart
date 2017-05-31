
import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { popError } from '../actions/bluetoothActions';
import redTheme from '../themes/redTheme';
class ErrorComponent extends Component {
  static propTypes = {
    errorMessages: PropTypes.array.isRequired,
    popError: PropTypes.func.isRequired
  }
  render() {
    const lastError = this.props.errorMessages[this.props.errorMessages.length-1]

    if (!lastError) {
      return null
    }

    return (
      <TouchableOpacity onPress={this.props.popError}>
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
    popError
  }
)(ErrorComponent)