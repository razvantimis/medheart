import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import {
    Container,
    Content,
    Spinner,
    Footer,
    FooterTab,
    Button,
    Card,
    CardItem,
    Body
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
      contentPredict = (
              <View style={styles.content}>
                <Text style={{fontSize:20}}>Diagnosticat in data de {predicted.data.getDate()}/{predicted.data.getMonth()}/{predicted.data.getYear()}</Text>
                <Heart style={{marginTop:10}} precent={predicted.value} scale={10}/>
              </View>);
    }

    return (
        <Container>
            <Content>
                { contentPredict }
                <Card>
                  <CardItem header>
                      <Text style={{fontSize:22}}>Informati Utile</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text style={{fontSize:18}}>
                         Procentajul de mai sus reprezinta gradul de risc de a avea o problema cardiaca, 
                         gradul de risk este corect daca informatile introduse sunt corect,
                        va rog sa consultati un medic. 
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
            </Content>
            <Footer>
            <FooterTab style={styles.footerTab}>
                <Button onPress={()=> resetPredict()}>  
                    <Text style={styles.footerText}>Reset Predict</Text>
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
    marginTop: 25,
    marginBottom: 10,
    justifyContent: 'center',
    flex:1,
    flexDirection: 'column',
    alignItems:'center'
  },
  footerTab: {
    backgroundColor:'#D9534F'
  },
  footerText: {
    color: 'white', fontSize: 18
  }
}
export default PredictDiseaseStepEnd;