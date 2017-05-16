import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { 
    Container,
    Content, 
    Picker,
    ListItem,
    Label,
    Input } from 'native-base';


class PredictDiseaseStepStart extends Component {

    render() {
        const { chestPainType, onChangeChestPainType,
                gender, onChangeGender,
                age, onChangeAge,
                restingBloodPressure, onChangeRestingBloodPressure,
                cholesterol, onChangeCholesterol } = this.props;
        return (
            <Container>
                <Content>
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

export default PredictDiseaseStepStart;