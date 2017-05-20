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
      contentPredict = (<View style={styles.content}>
                <Text> Aveti probleme de inima {predicted.value} </Text>
                <Heart precent={predicted.value} scale={11}/>
                <Text>In data de {predicted.data.getDate()}/{predicted.data.getMonth()}/{predicted.data.getYear()} </Text>
                </View>);
    }

    return (
        <Container>
            <Content>
                { contentPredict }
            </Content>
            <Footer>
            <FooterTab style={{backgroundColor:'#D9534F'}}>
                <Button onPress={()=> resetPredict()}>  
                    <Text style={{color: 'white', fontSize: 18}}>Reset Predict</Text>
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
const styles = {
  content: {
    justifyContent: 'center',
    flex:1,
    flexDirection: 'column',
    alignItems:'center'
  }
}
export default PredictDiseaseStepEnd;