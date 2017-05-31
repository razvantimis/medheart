/*
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-Copyright: Copyright (c) Capital One Services, LLC
SPDX-License-Identifier: Apache-2.0
*/

'use strict'

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import Bar  from './Bar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class BarChartColumnBasic extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    accessorKey: PropTypes.string.isRequired
  }
  render() {
    let { data, accessorKey} = this.props;
    
    if(data.length == 4){
      for(let i=0; i < 8;i=i+2){
        data.splice(i,0,[{
          'heartRate': 0,
          'name': ''
        }, {
          'heartRate': 0,
          'name': ''
        }]);
      }
    }
  

    let options = {
      width: 300,
      height: 200,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#B71C1C',
      gutter: 1,
      animate: {
        type: 'oneByOne',
        duration: 1000,
        fillTransition: 3
      },
      axisX: {
        showAxis: false,
        showLines: false,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          bold: true,
          fontWeight: true,
          fill: 'red',
          rotate: 35
        }
      },
      axisY: {
        min: false,
        max: false,
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: 'black'
        }
      }
    }

    return (
      <View style={styles.container}>
        <Bar data={data} options={options} accessorKey={accessorKey}/>
      </View>
    )
  }
}

export default BarChartColumnBasic;
