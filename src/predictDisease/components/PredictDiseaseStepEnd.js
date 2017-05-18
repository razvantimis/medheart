import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import {
    Container,
    Content,
    Spinner,
    Footer,
    FooterTab,
    Button
} from 'native-base';

import Heart from './Heart';

class PredictDiseaseStepEnd extends Component {
  componentWillMount(){
    this.props.onPredicting();
  }
  render() {
    
    const { predictedProgress, predicted, resetPredict } = this.props;
    let contentPredict ;
    if (predictedProgress) {
      contentPredict =  <Spinner color='red'></Spinner> ;
    } else {
      contentPredict = (<View style={{justifyContent: 'center', flex:1,flexDirection: 'column'}}>
                <Text> Aveti probleme de inima {predicted.value} </Text>
                <Heart />
                <Text>{predicted.data.toString()}</Text>
                </View>);
    }

    return (
        <Container>
            <Content>
                { contentPredict }
            </Content>
            <Footer>
            <FooterTab>
                <Button onPress={()=> resetPredict()}>  
                    <Text>Reset Predict</Text>
                </Button>
            </FooterTab>
        </Footer>
        </Container>
    );
  }
}
PredictDiseaseStepEnd.propTypes = {
  predictedProgress: PropTypes.bool.isRequired,
  predicted: PropTypes.object.isRequired,
  resetPredict: PropTypes.func.isRequired,
  onPredicting: PropTypes.func.isRequired

}
export default PredictDiseaseStepEnd;