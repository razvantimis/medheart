import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Header, Body, Title, Icon,Footer ,FooterTab ,Button ,Text } from 'native-base';


class PredictDiseaseStep1 extends Component {

    render() {
        return (
           <Container>
                <Header>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                </Header>
                <Content />
                <Footer >
                    <FooterTab>
                        <Button onPress={()=>Actions.predictDisease()}>
                            <Text>PredictDisease</Text>
                        </Button>
                        <Button onPress={()=>Actions.heartRate()}>
                            <Text>Heart Rate</Text>
                        </Button>
                       
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default connect(
  state => ({}),
  {})
(PredictDiseaseStep1);