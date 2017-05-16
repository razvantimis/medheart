import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, 
        Header,
        Title,
        Body,
        Tabs,
        Tab } from 'native-base';

import { HeartRateContainer } from './heartRate';

import { PredictDiseaseContainer } from './predictDisease';

import myTheme from './themes/redTheme';

class MHDashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
            <Body>
                <Title>MedHeart</Title>
            </Body>
        </Header>
        <Tabs >
          <Tab heading="Heart Rate" >
            <HeartRateContainer />
          </Tab>
      
          <Tab heading="Predict Disease" >
            <PredictDiseaseContainer />
          </Tab>
        </Tabs>
        
      </Container>
    );
  }
}

export default connect(
  state => ({}),
  {})
(MHDashboard);
