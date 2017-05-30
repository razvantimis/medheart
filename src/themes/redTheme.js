
const primaryColor = '#B71C1C';
const secondColor = '#dd2421';

export default {
  primaryColor,
  secondColor,
  // head
  headerTitle: {
    color:'#fff'
  },
  header : {
    backgroundColor: primaryColor,
    alignItems:'center',
  },
  headerTab: {
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
  },
  // footer
  footerTab: {
    backgroundColor: primaryColor,
  },
  footerTabButtonActive: {
    backgroundColor: '#c63835',
  },
  footerTabButton: {
    backgroundColor: primaryColor
  },
  footerTabText: {
    color: 'white',
    fontSize: 14
  } , 
  // error component
  errorComponent: {
    container: {
      padding: 20,
      backgroundColor: primaryColor,
    },
    message: {
      color: 'white',
      fontWeight: 'bold'
    }
  }
}