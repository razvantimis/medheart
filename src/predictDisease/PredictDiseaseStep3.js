import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class PredictDiseaseStep3 extends Component {
  render() {
        return (
            <View>
                <Text>Step3</Text>
            </View>
        );
    }
}

export default connect(
  state => ({}),
  {})
(PredictDiseaseStep3);