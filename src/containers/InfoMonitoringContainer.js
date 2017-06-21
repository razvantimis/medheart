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
import { onChangeEmail } from '../actions/heartMonitorActions';

class PairingDevice extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }
  componentWillMount(){
    this.check(this.props);
  }
  check(newProps){
    if(newProps.email !== ''){
      newProps.navigation.navigate('scannDevices');
    }
  }

  render(){
    const { email, onChangeEmail } = this.props;
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
                           Va rog să va setați mail persoanei de contact:
                          </Text>
                    
                        </Body>
                        
                      </CardItem>
                       <Form>
                          <Item>   
                            <Label>Email:</Label>
                            <Input placeholder='admin@gmail.com'
                                value={email}
                                onChangeText={(text)=> onChangeEmail(text)}
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
    email: state.heart.email
  }
}

export default connect(mapStateToProps, {
  onChangeEmail
})(PairingDevice);