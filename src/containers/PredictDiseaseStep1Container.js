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

  componentWillMount(){
    if(this.props.predicted.date && this.props.predicted.value){
      this.props.navigation.navigate('step3');
    }
  }

  render() {
    const { chestPainType, gender, age, restingBloodPressure, cholesterol,
            fastingBloodSugar, restingECG, navigation, onChangePropsPredict } = this.props;
    return (
            <Container>
                <Content>
                    <Form>
                        <InputPredict label="Vârstă:" 
                            placeholder='45' 
                            maxLength={2} 
                            nameProps="age"
                            value={age}
                            onChangePropsPredict={onChangePropsPredict} />
                        <PickerPredict label='Genul:'
                             value={gender} 
                             nameProps='gender'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='Bărbat' value='1' />
                            <Picker.Item label='Femeie' value='0' />
                        </PickerPredict>

                        <PickerPredict label='Tipul dureri de piept:'
                             value={chestPainType} 
                             nameProps='chestPainType'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='typical angina' value='1' />
                            <Picker.Item label='atypical anginal' value='2' />
                            <Picker.Item label='non-anginal pain' value='3' />
                            <Picker.Item label='asymptotic' value='4' />
                        </PickerPredict>

                         <InputPredict label="Tensiunea arterială:" 
                            placeholder='123' 
                            maxLength={3} 
                            nameProps="restingBloodPressure"
                            value={restingBloodPressure}
                            onChangePropsPredict={onChangePropsPredict} />

                       <InputPredict label="Colesterol mg/dl:" 
                            placeholder='' 
                            maxLength={3} 
                            nameProps="cholesterol"
                            value={cholesterol}
                            onChangePropsPredict={onChangePropsPredict} />
                        
                        
                        <PickerPredict label='Aveți glicemia mai mare de 120 mg/dl?'
                             value={fastingBloodSugar} 
                             nameProps='fastingBloodSugar'
                             onChangePropsPredict={onChangePropsPredict}>
                            <Picker.Item label='Adevărat' value='1' />
                            <Picker.Item label='Fals' value='0' />
                        </PickerPredict>
                        <PickerPredict label='Rezultatul EKG:'
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
                    <Text style={redTheme.footerTabText} >Înainte</Text>
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
  navigation: PropTypes.object.isRequired,
  predicted: PropTypes.object.isRequired
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
    predicted: state.predictDisease.predicted
  }
}

export default connect(mapStateToProps, {
  onChangePropsPredict
})(PredictDiseaseStep1);