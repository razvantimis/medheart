import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { 
    Container,
    Content, 
    Picker,
    List,
    ListItem,
    Label,
    Input } from 'native-base';


class PredictDiseaseStepStart extends Component {

    render() {
        const { chestPainType, onChangeChestPainType,
                gender, onChangeGender,
                age, onChangeAge,
                restingBloodPressure, onChangeRestingBloodPressure,
                cholesterol, onChangeCholesterol,
                fastingBloodSugar, onChangeFastingBloodSugar,
                restingECG, onChangeRestingECG,
                maximumHeartRate, onChangeMaximumHeartRate,
                exerciseInducedAngina, onChangeExerciseInducedAngina,
                oldPeak, onChangeOldPeak } = this.props;
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Label>Age: </Label>
                            <Input 
                                placeholder="Enter age"
                                keyboardType='numeric'
                                maxLength={2}
                                value={age}
                                onChangeText={onChangeAge.bind(this)}/>
                        </ListItem>
                        <ListItem>
                            <Label>Gender: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={gender}
                                onValueChange={onChangeGender.bind(this)}>
                                <Picker.Item label='Man' value='1' />
                                <Picker.Item label='Woman' value='0' />
                            </Picker>
                        </ListItem>
                        <ListItem>
                            <Label>Chest Pain Type: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={chestPainType}
                                onValueChange={onChangeChestPainType.bind(this)}>
                                
                                <Picker.Item label='typical angina' value='1' />
                                <Picker.Item label='atypical anginal' value='2' />
                                <Picker.Item label='non-anginal pain' value='3' />
                                <Picker.Item label='asymptotic' value='4' />
                            </Picker>
                        </ListItem>
                        <ListItem>
                            <Label>Resting Blood Pressure: </Label>
                            <Input 
                                placeholder="Enter resting blood pressure"
                                keyboardType='numeric'
                                maxLength={3}
                                value={restingBloodPressure}
                                onChangeText={onChangeRestingBloodPressure.bind(this)}/>
                        </ListItem>
                        <ListItem>
                            <Label>Cholesterol mg/dl : </Label>
                            <Input 
                                placeholder="Enter cholesterol"
                                keyboardType='numeric'
                                maxLength={3}
                                value={cholesterol}
                                onChangeText={onChangeCholesterol.bind(this)}/>
                        </ListItem>
                        <ListItem>
                            <Label>Fasting blood sugar > 120 mg/dl: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={fastingBloodSugar}
                                onValueChange={onChangeFastingBloodSugar.bind(this)}>
                                <Picker.Item label='True' value='1' />
                                <Picker.Item label='False' value='0' />
                            </Picker>
                        </ListItem>
                        <ListItem>
                            <Label>Resting electrocardiographic: </Label>
                            <Picker
                                style={style.picker}
                                supportedOrientations={['portrait','landscape']}
                                iosHeader='Select one'
                                mode='dropdown'
                                selectedValue={restingECG}
                                onValueChange={onChangeRestingECG.bind(this)}>
                                <Picker.Item label='Normal' value='0' />
                                <Picker.Item label='Having ST-T wave abnormality' value='1' />
                                <Picker.Item label='Definite left ventricular Hypertrophy' value='3' />
                            </Picker>
                        </ListItem>
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
                    </List>
                </Content>
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

PredictDiseaseStepStart.propTypes = {
  chestPainType: PropTypes.string.isRequired,
  onChangeChestPainType: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  onChangeGender: PropTypes.func.isRequired,
  age: PropTypes.string, 
  onChangeAge: PropTypes.func.isRequired,
  restingBloodPressure: PropTypes.string,
  onChangeRestingBloodPressure: PropTypes.func.isRequired,
  cholesterol: PropTypes.string,
  onChangeCholesterol: PropTypes.func.isRequired
}

export default PredictDiseaseStepStart;