import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
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

import Heart from '../components/Heart';
import redTheme from '../themes/redTheme';
import {
    resetPredict,
    onPredicting
} from '../actions/predictDiseaseActions'
class PredictDiseaseStep3 extends Component {
  componentWillMount(){
    if(!this.props.predicted.date && !this.props.predicted.value){
      this.props.onPredicting();
    }
  }
  render() {
    const { predictedProgress, predicted, resetPredict, navigation } = this.props;
    let contentPredict ;
    if (predictedProgress) {
      contentPredict =  <Spinner color='red'></Spinner> ;
    } else {
      const date = new Date(predicted.date);
      contentPredict = (
              <View style={styles.content}>
                <Text style={{fontSize:20}}>Diagnosticat in data de {date.getDate()}/{date.getMonth()}/{date.getYear()}</Text>
                <Heart value={predicted.value+'%'} scale={10}/>
              </View>);
    }

    return (
        <Container>
            <Content>
                { contentPredict }
                <Card>
                  <CardItem header>
                      <Text style={{fontSize:22}}>Informații Utile</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text style={{fontSize:18}}>
                         Procentajul afișat mai sus semnifică gradul de risc dea avea o problemă cardiacă.{"\n"}
                         Pentru o acuratețe sporită vă rugăm să introduceți corect datele cerute.
                         Vă rugăm să consultați un medic pentru mai multe detali.
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
            </Content>
            <Footer>
              <FooterTab style={redTheme.footerTab}>
                  <Button onPress={()=> {
                    resetPredict(); 
                    navigation.navigate('step1')
                  }}>  
                      <Text style={redTheme.footerTabText}>Rediagnosticare</Text>
                  </Button>
              </FooterTab>
            </Footer>
        </Container>
    );
  }
}
PredictDiseaseStep3.propTypes = {
  predictedProgress: PropTypes.bool.isRequired,
  predicted: PropTypes.object.isRequired,
  resetPredict: PropTypes.func.isRequired,
  onPredicting: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

const styles = {
  content: {
    marginTop: 25,
    marginBottom: 10,
    justifyContent: 'center',
    flex:1,
    flexDirection: 'column',
    alignItems:'center'
  }
}
const mapStateToProps = (state) => {
  return { predictedProgress: state.predictDisease.predictedProgress,
    predicted: state.predictDisease.predicted
  }
}

export default connect(mapStateToProps, {
  onPredicting,
  resetPredict
})(PredictDiseaseStep3);