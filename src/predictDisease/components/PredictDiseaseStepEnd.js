import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {
    Container,
    Content,
    Spinner
} from 'native-base';

class PredictDiseaseStepEnd extends Component {
  render() {
        this.props.onPredict();
        const { predictedProgress } = this.props;
        return (
            <Container>
                <Content>
                    {predictedProgress && <Spinner color='red'></Spinner> }
                </Content>
            </Container>
        );
    }
}

export default PredictDiseaseStepEnd;