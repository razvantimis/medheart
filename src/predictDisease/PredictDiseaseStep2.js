import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';


class PredictDiseaseStep2 extends Component {
  render() {
        return (
            <View>
                <Text>Step1</Text>
            </View>
        );
    }
}

export default connect(
  state => ({}),
  {})
(PredictDiseaseStep2);