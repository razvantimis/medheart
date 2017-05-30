import React, { PropTypes } from 'react';
import { Label, Input, Item} from 'native-base';

const InputPredict = ({label, nameProps, value, maxLength, placeholder, onChangePropsPredict}) => {
  return (
    <Item>   
      <Label>{label}</Label>
      <Input placeholder={placeholder}
          keyboardType='numeric'
          maxLength={maxLength}
          value={value}
          onChangeText={(text)=> onChangePropsPredict(nameProps, text)}
      />
    </Item>
  );
}
InputPredict.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  nameProps: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  onChangePropsPredict: PropTypes.func.isRequired,
}

export default InputPredict;