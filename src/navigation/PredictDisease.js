import { StackNavigator } from 'react-navigation';

import PredictDiseaseStep1 from '../containers/PredictDiseaseStep1Container';
import PredictDiseaseStep2 from '../containers/PredictDiseaseStep2Container';
import PredictDiseaseStep3 from '../containers/PredictDiseaseStep3Container';

export const PredictDiseaseScreen = StackNavigator({
  step1: { screen: PredictDiseaseStep1 },
  step2: { screen: PredictDiseaseStep2 },
  step3: { screen: PredictDiseaseStep3 }
},{
    // see next line
  headerMode: 'none',
});

export default PredictDiseaseScreen;