import React, { Component } from 'react';
import { connect } from 'react-redux';

import { STEP_START, STEP_2, STEP_END} from './constants';
import { onChangeGender, 
  onChangeChestPainType, 
  onChangeAge, 
  onChangeRestingBloodPressure,
  onChangeCholesterol,
  onChangeFastingBloodSugar,
  onChangeRestingECG,
  onChangeMaximumHeartRate,
  onChangeExerciseInducedAngina,
  onChangeOldPeak,
  onChangeSlop,
  onChangeNumberOfVesselsColored,
  onChangeThal,
  onPredicting,
  nextStep,
  prevStep,
  resetPredict } from './actions'

import PredictDiseaseStepStart from './components/PredictDiseaseStepStart';
import PredictDiseaseStep2 from './components/PredictDiseaseStep2';
import PredictDiseaseStepEnd from './components/PredictDiseaseStepEnd';



class PredictDiseaseContainer extends Component {

  render() {
    const { step, 
              predictedProgress,
              predicted,
              nextStep,
              prevStep,
              onChangeChestPainType, 
              onChangeGender, 
              onChangeAge, 
              onChangeRestingBloodPressure,
              onChangeCholesterol,
              onChangeFastingBloodSugar,
              onChangeRestingECG,
              onChangeMaximumHeartRate,
              onChangeExerciseInducedAngina,
              onChangeOldPeak,
              onChangeSlop,
              onChangeNumberOfVesselsColored,
              onChangeThal,
              onPredicting,
              resetPredict }  = this.props;
    const { gender, 
        chestPainType, 
        age, 
        restingBloodPressure, 
        cholesterol, 
        fastingBloodSugar,
        restingECG,
        maximumHeartRate,
        exerciseInducedAngina,
        oldPeak,
        slop,
        numberOfVesselsColored,
        thal } = this.props.predict;
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

              nextStep={()=>nextStep()}                      
              />;
    case STEP_2:
      return <PredictDiseaseStep2
              maximumHeartRate={maximumHeartRate}
              onChangeMaximumHeartRate={onChangeMaximumHeartRate}
              
              exerciseInducedAngina={exerciseInducedAngina}
              onChangeExerciseInducedAngina={onChangeExerciseInducedAngina}
              
              oldPeak={oldPeak}
              onChangeOldPeak={onChangeOldPeak}

              slop={slop}
              onChangeSlop={onChangeSlop}

              numberOfVesselsColored={numberOfVesselsColored}
              onChangeNumberOfVesselsColored={onChangeNumberOfVesselsColored}

              thal={thal}
              onChangeThal={onChangeThal}

              nextStep={()=>nextStep()} 
              prevStep={()=>prevStep()} 
                    />;
    case STEP_END:
      return <PredictDiseaseStepEnd 
              onPredicting={()=> onPredicting(this.props.predict)} 
              predictedProgress={predictedProgress} 
              predicted={predicted}
              resetPredict={resetPredict}/>;
    }
  }
}

const mapStateToProps = (state) => {
    return { step: state.predictDisease.step,
      predictedProgress: state.predictDisease.predictedProgress,
      predict: state.predictDisease.predict,
      predicted: state.predictDisease.predicted
      }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeChestPainType,
    onChangeGender,
    onChangeAge,
    onChangeRestingBloodPressure,
    onChangeCholesterol,
    onChangeFastingBloodSugar,
    onChangeRestingECG,
    onChangeMaximumHeartRate,
    onChangeExerciseInducedAngina,
    onChangeOldPeak,
    onChangeSlop,
    onChangeNumberOfVesselsColored,
    onChangeThal,
    onPredicting,
    nextStep,
    prevStep,
    resetPredict
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PredictDiseaseContainer);