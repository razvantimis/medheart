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


class MHDashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <Container >
          <Header hasTabs style={style.header}>
              <Body>
                  <Title style={{color:'#fff'}} >MedHeart</Title>
              </Body>
          </Header>
          <Tabs tabBarUnderlineStyle={{borderBottomWidth:0.5}} >
            <Tab heading="Heart Rate" 
            tabStyle={style.tab.content} textStyle={style.tab.text} 
            activeTabStyle={{backgroundColor: '#B71C1C'}} activeTextStyle={{color: '#fff', fontWeight: '700'}} >
              <HeartRateContainer />
            </Tab>
        
            <Tab heading="Predict Disease" 
            tabStyle={style.tab.content} textStyle={style.tab.text} 
            activeTabStyle={{backgroundColor: '#B71C1C'}} activeTextStyle={{color: '#fff', fontWeight: '700'}} >
            
              <PredictDiseaseContainer />
            </Tab>
          </Tabs>
          
        </Container>
    );
  }
}

const style = {
  header : {
    backgroundColor:'#B71C1C',

  },
  tab: {
    content: {
      backgroundColor:'#B71C1C',
    },
    text: {
      fontWeight: '600',
      color: '#fff'
    }
   
  }
}

export default connect(
  state => ({}),
  {})
(MHDashboard);
