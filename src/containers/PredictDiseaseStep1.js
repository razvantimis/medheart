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
import InputPredict from '../components/InputPredict';
import PickerPredict from '../components/PickerPredict';

import { onChangePropsPredict } from '../actions/predictDiseaseActions'

import redTheme from '../themes/redTheme';

class PredictDiseaseStep1 extends Component {

  render() {
    const { chestPainType, gender, age, restingBloodPressure, cholesterol,
            fastingBloodSugar, restingECG, navigation, onChangePropsPredict } = this.props;
    return (
            <Container>
                <Content>
                    <Form>
                        <InputPredict label="Age:" 
                            placeholder='Enter Age' 
                            maxLength={2} 
                            nameProps="age"
                            value={age}
                            onChangePropsPredict={onChangePropsPredict} />
                        <PickerPredict label='Gender:'
                             value={gender} 
                             nameProps='gender'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='Man' value='1' />
                            <Picker.Item label='Woman' value='0' />
                        </PickerPredict>

                        <PickerPredict label='Chest Pain Type:'
                             value={chestPainType} 
                             nameProps='chestPainType'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='typical angina' value='1' />
                            <Picker.Item label='atypical anginal' value='2' />
                            <Picker.Item label='non-anginal pain' value='3' />
                            <Picker.Item label='asymptotic' value='4' />
                        </PickerPredict>

                         <InputPredict label="Resting Blood Pressure:" 
                            placeholder='Enter resting blood pressure' 
                            maxLength={3} 
                            nameProps="restingBloodPressure"
                            value={restingBloodPressure}
                            onChangePropsPredict={onChangePropsPredict} />

                       <InputPredict label="Cholesterol mg/dl:" 
                            placeholder='Enter cholesterol' 
                            maxLength={3} 
                            nameProps="cholesterol"
                            value={cholesterol}
                            onChangePropsPredict={onChangePropsPredict} />
                        
                        
                        <PickerPredict label='Fasting blood sugar > 120 mg/dl:'
                             value={fastingBloodSugar} 
                             nameProps='fastingBloodSugar'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='True' value='1' />
                            <Picker.Item label='False' value='0' />
                        </PickerPredict>
                        <PickerPredict label='Resting electrocardiographic:'
                             value={restingECG} 
                             nameProps='restingECG'
                             onChangePropsPredict={onChangePropsPredict}>
                             <Picker.Item label='Normal' value='0' />
                            <Picker.Item label='Having ST-T wave abnormality' value='1' />
                            <Picker.Item label='Definite left ventricular Hypertrophy' value='3' />
                        </PickerPredict>
                    </Form>
                    
                </Content>
                <Footer>
              <FooterTab style={redTheme.footerTab}>
                <Button onPress={()=>navigation.navigate('step2')} full >  
                    <Text style={redTheme.footerTabText} >Next</Text>
                </Button>
              </FooterTab>
            </Footer>
            </Container>
    );
  }
}


PredictDiseaseStep1.propTypes = {
  chestPainType: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.string, 
  restingBloodPressure: PropTypes.string,
  cholesterol: PropTypes.string,
  fastingBloodSugar: PropTypes.string,
  restingECG: PropTypes.string.isRequired,
  onChangePropsPredict: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return { 
    chestPainType: state.predictDisease.predict.chestPainType,
    gender: state.predictDisease.predict.gender,
    age: state.predictDisease.predict.age,
    restingBloodPressure: state.predictDisease.predict.restingBloodPressure,
    cholesterol: state.predictDisease.predict.cholesterol,
    fastingBloodSugar: state.predictDisease.predict.fastingBloodSugar,
    restingECG: state.predictDisease.predict.restingECG,
  }
}

export default connect(mapStateToProps, {
  onChangePropsPredict
})(PredictDiseaseStep1);