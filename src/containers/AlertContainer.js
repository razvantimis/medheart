import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PageComponent from '../components/PageComponent';

class AlertContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  render() {
    const { navigation } = this.props;
    return (
      <PageComponent navigation={navigation} title='My Account'>
        
      </PageComponent>
    )
  }
}


export default connect(
  state => ({
   
  }),
  {
   
  }
)(AlertContainer)