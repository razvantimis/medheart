import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Footer,
    FooterTab,
    Button,
    Form,
    Item,
    Label,
    Input
} from 'native-base';
import redTheme from '../themes/redTheme';
import { onChangeTelephone } from '../actions/heartMonitorActions';

class InfoMonitoringContainer extends Component {
  static propTypes = {
    telephone: PropTypes.string.isRequired,
    onChangeTelephone: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }
  componentWillMount(){
    this.check(this.props);
  }
  check(newProps){
    if(newProps.telephone !== ''){
      newProps.navigation.navigate('scannDevices');
    }
  }

  render(){
    const { telephone, onChangeTelephone } = this.props;
    return (
            <Container>
                <Content>
                    <Card>
                      <CardItem header>
                          <Text style={{fontSize:22}}>Informații Utile</Text>
                      </CardItem>
                      <CardItem>
                        <Body>
                          <Text style={{fontSize:18}}>
                           Vă informăm că această parte din aplicație este doar una demonstrativă. 
                           {"\n"}{"\n"}
                           Componenta constă în măsurarea pulsului și depistarea anomaliilor pe baza pulsului, în cazul depistări unei anomalie, aplicație va trimite un email de alertă.
                           {"\n"}{"\n"}
                           Pentru a putea folosi acest modul, aveți nevoie de o brățară xiaomi mini band 2. {"\n"}{"\n"}
                           Va rog să va setați numărul de telefon al persoanei de contact:
                          </Text>
                    
                        </Body>
                        
                      </CardItem>
                       <Form>
                          <Item>   
                            <Label>Număr de telefon:</Label>
                            <Input placeholder='074 635 9070'
                                value={telephone}
                                onChangeText={(text)=> onChangeTelephone(text)}
                            />
                          </Item>
                        </Form>
                    </Card>
                   
                </Content>
                <Footer>
                  <FooterTab style={redTheme.footerTab}>
                      <Button onPress={()=> {
                        this.props.navigation.navigate('scannDevices');
                      }}>  
                          <Text style={redTheme.footerTabText}>Înainte</Text>
                      </Button>
                  </FooterTab>
                </Footer>
            </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return { 
    telephone: state.heart.telephone
  }
}

export default connect(mapStateToProps, {
  onChangeTelephone
})(InfoMonitoringContainer);