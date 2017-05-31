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
    this.props.onPredicting();
  }
  render() {
    const { predictedProgress, predicted, resetPredict, navigation } = this.props;
    let contentPredict ;
    if (predictedProgress) {
      contentPredict =  <Spinner color='red'></Spinner> ;
    } else {
      contentPredict = (
              <View style={styles.content}>
                <Text style={{fontSize:20}}>Diagnosticat in data de {predicted.date.getDate()}/{predicted.date.getMonth()}/{predicted.date.getYear()}</Text>
                <Heart style={{marginTop:10}} value={predicted.value+'%'} scale={10}/>
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
              <FooterTab style={redTheme.footerTab}>
                  <Button onPress={()=> {
                    resetPredict(); 
                    navigation.navigate('step1')
                  }}>  
                      <Text style={redTheme.footerTabText}>Reset Predict</Text>
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