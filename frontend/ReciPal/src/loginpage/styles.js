import {StyleSheet} from 'react-native' 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    
      position: 'relative',
      gap:20
    },
    login: {
      fontWeight: 'bold',
      fontSize: 30,
      paddingLeft:40,
      paddingTop:50,
    },
    reg_input: {
      backgroundColor: 'rgba(101, 101, 101, 0.2)',
      width: 200,
      height: 34,
      borderRadius: 50,
      marginLeft: 35,
      color: '#000', 
      paddingLeft:20
  },
    shape: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '40%',
    },
    submit:{
      backgroundColor:"black",
      width:200,
      marginLeft:35,
      height:30,
      borderRadius:50,
      justifyContent:"center",
      alignItems:"center",
      fontWeight:"bold"
    },
    errorMessage: {
      color: 'red',
      marginTop: 10,
    },
  });

export default styles;