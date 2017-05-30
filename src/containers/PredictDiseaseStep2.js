import React, { Component, PropTypes } from 'react';
import { Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { 
    Container,
    Content, 
    Picker,
    List,
    ListItem,
    Label,
    Input,
    Footer,
    FooterTab,
    Button } from 'native-base';
import redTheme from '../themes/redTheme';


import {
    onChangeMaximumHeartRate,
    onChangeExerciseInducedAngina,
    onChangeOldPeak,
    onChangeSlop,
    onChangeNumberOfVesselsColored,
    onChangeThal,
    onChangeRestingECG
} from '../actions/predictDiseaseActions'

class PredictDiseaseStep2 extends Component {
  render() {
    const { maximumHeartRate, onChangeMaximumHeartRate,
          exerciseInducedAngina, onChangeExerciseInducedAngina,
          oldPeak, onChangeOldPeak,
          slop, onChangeSlop,
          numberOfVesselsColored, onChangeNumberOfVesselsColored,
          thal, onChangeThal,
          navigation } = this.props;
    return (
             <Container>
                <Content>
                    <List>
                     
                        <ListItem>
                            <Label>Maximum Heart Rate: </Label>
                            <Input 
                                placeholder="Enter Maximum Heart Rate"
                                keyboardType='numeric'
                                maxLength={3}
                                value={maximumHeartRate}
                                onChangeText={onChangeMaximumHeartRate.bind(this)}/>
                        </ListItem>
                        <ListItem>
                            <Label>Exercise Induced Angina ?: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={exerciseInducedAngina}
                                onValueChange={onChangeExerciseInducedAngina.bind(this)}>
                                <Picker.Item label='Yes' value='1' />
                                <Picker.Item label='No' value='0' />
                            </Picker>
                        </ListItem>
                         <ListItem>
                            <Label>ST depression induced by exercise </Label>
                            <Input 
                                placeholder="Enter number"
                                keyboardType='numeric'
                                maxLength={3}
                                value={oldPeak}
                                onChangeText={onChangeOldPeak.bind(this)}/>
                        </ListItem>
                         <ListItem>
                            <Label>Slop: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={slop}
                                onValueChange={onChangeSlop.bind(this)}>
                                <Picker.Item label='Up sloping' value='1' />
                                <Picker.Item label='Flat' value='2' />
                                <Picker.Item label='Down sloping' value='3' />
                            </Picker>
                        </ListItem>
                         <ListItem>
                            <Label>Number Of Vessels Colored: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={numberOfVesselsColored}
                                onValueChange={onChangeNumberOfVesselsColored.bind(this)}>
                                <Picker.Item label='0' value='0' />
                                <Picker.Item label='1' value='1' />
                                <Picker.Item label='2' value='2' />
                                <Picker.Item label='3' value='3' />
                            </Picker>
                        </ListItem>
                         <ListItem>
                            <Label>Thallium scan: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={thal}
                                onValueChange={onChangeThal.bind(this)}>
                                <Picker.Item label='Normal' value='3' />
                                <Picker.Item label='Fixed Defect' value='6' />
                                <Picker.Item label='Reversible Defect' value='7' />
                            </Picker>
                        </ListItem>
                      
                      </List>
                      
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

let width = Dimensions.get('window').width;
const style = {
  picker: {
    width
  }
   
};
PredictDiseaseStep2.propTypes = {
  maximumHeartRate: PropTypes.string,
  onChangeMaximumHeartRate: PropTypes.func.isRequired,
  exerciseInducedAngina: PropTypes.string.isRequired,
  onChangeExerciseInducedAngina: PropTypes.func.isRequired,
  oldPeak: PropTypes.string,
  onChangeOldPeak: PropTypes.func.isRequired,
  slop: PropTypes.string.isRequired,
  onChangeSlop: PropTypes.func.isRequired,
  numberOfVesselsColored: PropTypes.string.isRequired,
  onChangeNumberOfVesselsColored: PropTypes.func.isRequired,
  thal: PropTypes.string.isRequired,
  onChangeThal:  PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
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
  onChangeMaximumHeartRate,
  onChangeExerciseInducedAngina,
  onChangeOldPeak,
  onChangeSlop,
  onChangeNumberOfVesselsColored,
  onChangeThal,
  onChangeRestingECG
})(PredictDiseaseStep2);