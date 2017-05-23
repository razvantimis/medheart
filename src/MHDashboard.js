import React, { Component } from 'react';
import { Container, 
        Header,
        Title,
        Body,
        Tabs,
        Tab } from 'native-base';

import { HeartRateContainer } from './heartRate';

import { PredictDiseaseContainer } from './predictDisease';

import redTheme from './themes/redTheme';

class MHDashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <Container>
          <Header hasTabs androidStatusBarColor={redTheme.primaryColor} style={redTheme.header}>
              <Body>
                  <Title style={redTheme.headerTitle} >MedHeart</Title>
              </Body>
          </Header>
          <Tabs tabBarUnderlineStyle={redTheme.headerTab.underline} >
            <Tab heading="Predict Disease" 
            tabStyle={redTheme.headerTab.content} textStyle={redTheme.headerTab.text} 
            activeTabStyle={redTheme.headerTab.activeContent} 
            activeTextStyle={redTheme.headerTab.activeText} >
              <PredictDiseaseContainer />
            </Tab>

            <Tab heading="Heart Rate" 
             tabStyle={redTheme.headerTab.content} textStyle={redTheme.headerTab.text} 
            activeTabStyle={redTheme.headerTab.activeContent} 
            activeTextStyle={redTheme.headerTab.activeText} >
              <HeartRateContainer />
            </Tab>
        
            
          </Tabs>
          
        </Container>
    );
  }
}


export default MHDashboard;
