import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';

import { ListItem, 
        Text, 
        Left, 
        Body, 
        Right,
        Button,
        Thumbnail } from 'native-base';



const ScannedDeviceView = ({name, id, rssi, onClick}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <ListItem thumbnail>
          <Left>
              <Thumbnail square size={80} source={require('./img/miband2.png')} />
          </Left>
          <Body>
              <Text>{name}</Text>
              <Text note>Id: {id} Rssi: {rssi}</Text>
          </Body>
          <Right>
              <Button transparent onPress={onClick}>
                  <Text>Connect</Text>
              </Button>
          </Right>
      </ListItem>
    </TouchableOpacity>
  )
}

ScannedDeviceView.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  rssi: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ScannedDeviceView
