import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Header, Body, Title, Icon,Footer ,FooterTab ,Button ,Text } from 'native-base';

import { STEP_START, STEP_2, STEP_END} from './actions/types';
import { onChangeGender, 
  onChangeChestPainType, 
  onChangeAge, 
  onChangeRestingBloodPressure,
  onChangeCholesterol,
  onChangeFastingBloodSugar,
  onChangeRestingECG,
  onChangeMaximumHeartRate,
  onChangeExerciseInducedAngina,
  onChangeOldPeak } from './actions'

import PredictDiseaseStepStart from './components/PredictDiseaseStepStart';
import PredictDiseaseStep2 from './components/PredictDiseaseStep2';
import PredictDiseaseStepEnd from './components/PredictDiseaseStepEnd';

class PredictDiseaseContainer extends Component {

    render() {
      const { step, 
              onChangeChestPainType, 
              onChangeGender, 
              onChangeAge, 
              onChangeRestingBloodPressure,
              onChangeCholesterol,
              onChangeFastingBloodSugar,
              onChangeRestingECG,
              onChangeMaximumHeartRate,
              onChangeExerciseInducedAngina,
              onChangeOldPeak }  = this.props;
      const { gender, 
        chestPainType, 
        age, 
        restingBloodPressure, 
        cholesterol, 
        fastingBloodSugar,
        restingECG,
        maximumHeartRate,
        exerciseInducedAngina,
        oldPeak } = this.props.predict;
      switch(step){
        case STEP_START:
          return <PredictDiseaseStepStart 
                      chestPainType={chestPainType} 
                      onChangeChestPainType={onChangeChestPainType}
                     
                      gender={gender} 
                      onChangeGender = {onChangeGender}
                     
                      age={age}
                      onChangeAge={onChangeAge}
                     
                      restingBloodPressure={restingBloodPressure}
                      onChangeRestingBloodPressure={onChangeRestingBloodPressure}
                     
                      cholesterol={cholesterol}
                      onChangeCholesterol={onChangeCholesterol}
                     
                      fastingBloodSugar={fastingBloodSugar}
                      onChangeFastingBloodSugar={onChangeFastingBloodSugar}
                     
                      restingECG={restingECG} 
                      onChangeRestingECG={onChangeRestingECG}
                     
                      maximumHeartRate={maximumHeartRate}
                      onChangeMaximumHeartRate={onChangeMaximumHeartRate}
                     
                      exerciseInducedAngina={exerciseInducedAngina}
                      onChangeExerciseInducedAngina={onChangeExerciseInducedAngina}
                      
                      oldPeak={oldPeak}
                      onChangeOldPeak={onChangeOldPeak}
                      />;
        case STEP_2:
          return <PredictDiseaseStep2 />;
        case STEP_END:
          return <PredictDiseaseStepEnd />;
        default:
          return <PredictDiseaseStepStart />
    
      };

    }
}

export default connect(
  state => ({
    step: state.predictDisease.step,
    predict: state.predictDisease.predict
  }),
  {
     onChangeChestPainType,
     onChangeGender,
     onChangeAge,
     onChangeRestingBloodPressure,
     onChangeCholesterol,
     onChangeFastingBloodSugar,
     onChangeRestingECG,
     onChangeMaximumHeartRate,
     onChangeExerciseInducedAngina,
     onChangeOldPeak
  })
(PredictDiseaseContainer);