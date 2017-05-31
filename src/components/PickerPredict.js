import React, { PropTypes } from 'react';
import { Dimensions } from 'react-native'
import { Label, Picker, Item} from 'native-base';

const PickerPredict = ({label, nameProps, value, onChangePropsPredict, children}) => {
  return (
    <Item>  
      <Label>{label}</Label>
      <Picker
          style={style.picker}
          supportedOrientations={['portrait','landscape']}
          iosHeader='Select one'
          mode='dropdown'
          selectedValue={value}
          onValueChange={(text)=> onChangePropsPredict(nameProps, text)}>
          {children}
      </Picker>
    </Item>
  );
}
PickerPredict.propTypes = {
  children: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  nameProps: PropTypes.string.isRequired,
  onChangePropsPredict: PropTypes.func.isRequired,
}

let width = Dimensions.get('window').width;
const style = {
  picker: {
    width
  }
};

export default PickerPredict;