import Color from 'color';

import {Platform} from 'react-native';

export default {
  // header
  iosToolbarBtnColor: '#007aff',
  toolbarDefaultBg: (Platform.OS === 'ios' ) ? '#F8F8F8' : '#FF0000',
  toolbarHeight: (Platform.OS === 'ios' ) ? 64 : 56,
  toolbarIconSize: (Platform.OS === 'ios' ) ? 20 : 22,
  toolbarInputColor: '#CECDD2',
  toolbarInverseBg: '#222',
  toolbarTextColor: (Platform.OS==='ios') ? '#000' : '#fff',
  get statusBarColor() {
      return Color(this.toolbarDefaultBg).darken(0.2).hexString();
  },
}