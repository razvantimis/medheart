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
                  <Title style={style.headerTitle} >MedHeart</Title>
              </Body>
          </Header>
          <Tabs tabBarUnderlineStyle={style.tab.underline} >
            <Tab heading="Heart Rate" 
             tabStyle={style.tab.content} textStyle={style.tab.text} 
            activeTabStyle={style.tab.activeContent} 
            activeTextStyle={style.tab.activeText} >
              <HeartRateContainer />
            </Tab>
        
            <Tab heading="Predict Disease" 
            tabStyle={style.tab.content} textStyle={style.tab.text} 
            activeTabStyle={style.tab.activeContent} 
            activeTextStyle={style.tab.activeText} >
            
              <PredictDiseaseContainer />
            </Tab>
          </Tabs>
          
        </Container>
    );
  }
}

const style = {
  headerTitle: {
    color:'#fff'
  },
  header : {
    backgroundColor:'#B71C1C',

  },
  tab: {
    underline: {
      borderBottomWidth:2.3,
      borderColor:'#fff',
      bottom: 0.7,
      backgroundColor: '#B71C1C'
    },
    content: {
      backgroundColor:'#B71C1C',
    },
    activeContent: {
      backgroundColor: '#B71C1C'
    },
    text: {
      fontWeight: '600',
      color: '#fff'
    },
    activeText: {
      color: '#fff',
      fontWeight: '700'
    }
   
  }
}

export default connect(
  state => ({}),
  {})
(MHDashboard);
