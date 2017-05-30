import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { 
    Container,
    Content, 
    Picker,
    Form,
    Footer,
    FooterTab,
    Button } from 'native-base';
import redTheme from '../themes/redTheme';
import InputPredict from '../components/InputPredict';
import PickerPredict from '../components/PickerPredict';

import { onChangePropsPredict } from '../actions/predictDiseaseActions'

class PredictDiseaseStep2 extends Component {
  render() {
    const { maximumHeartRate, exerciseInducedAngina, oldPeak,
          slop, numberOfVesselsColored, thal, navigation, onChangePropsPredict} = this.props;
    return (
             <Container>
                <Content>
                    <Form>
                         <InputPredict label="Maximum Heart Rate:" 
                            placeholder='Enter Maximum Heart Rate' 
                            maxLength={3} 
                            nameProps="maximumHeartRate"
                            value={maximumHeartRate}
                            onChangePropsPredict={onChangePropsPredict} />

                        <PickerPredict label='Exercise Induced Angina ?: '
                             value={exerciseInducedAngina} 
                             nameProps='exerciseInducedAngina'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='Yes' value='1' />
                            <Picker.Item label='No' value='0' />
                        </PickerPredict>
                       
                        <InputPredict label="ST depression induced by exercise:" 
                            placeholder='Enter number' 
                            maxLength={3} 
                            nameProps="oldPeak"
                            value={oldPeak}
                            onChangePropsPredict={onChangePropsPredict} />
                        
                        <PickerPredict label='Slop:'
                             value={slop} 
                             nameProps='slop'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='Up sloping' value='1' />
                            <Picker.Item label='Flat' value='2' />
                            <Picker.Item label='Down sloping' value='3' />
                         </PickerPredict>
                         
                         <PickerPredict label='Number Of Vessels Colored:'
                             value={numberOfVesselsColored} 
                             nameProps='numberOfVesselsColored'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='0' value='0' />
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                         </PickerPredict>

                         <PickerPredict label='Thallium scan: '
                             value={thal} 
                             nameProps='thal'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='Normal' value='3' />
                            <Picker.Item label='Fixed Defect' value='6' />
                            <Picker.Item label='Reversible Defect' value='7' />
                         </PickerPredict>      
                      </Form>
                      
                </Content>
                <Footer>
                    <FooterTab style={redTheme.footerTab}>
                        <Button onPress={()=> navigation.navigate('step1') }>  
                            <Text style={redTheme.footerTabText}>Prev</Text>
                        </Button>
                        
                        <Button onPress={()=> navigation.navigate('step3')}>  
                            <Text style={redTheme.footerTabText}>Finish</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
    );
  }
}

PredictDiseaseStep2.propTypes = {
  maximumHeartRate: PropTypes.string,
  exerciseInducedAngina: PropTypes.string.isRequired,
  oldPeak: PropTypes.string,
  slop: PropTypes.string.isRequired,
  numberOfVesselsColored: PropTypes.string.isRequired,
  thal: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  onChangePropsPredict: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { maximumHeartRate,
        exerciseInducedAngina,
        oldPeak,
        slop,
        numberOfVesselsColored,
        thal,
        restingECG
     } = state.predictDisease.predict
  return { maximumHeartRate,
    exerciseInducedAngina,
    oldPeak,
    slop,
    numberOfVesselsColored,
    thal,
    restingECG
  }
}


export default connect(mapStateToProps, {
  onChangePropsPredict
})(PredictDiseaseStep2);