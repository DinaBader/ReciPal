import {StyleSheet} from 'react-native' 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      gap:20
    },
    login: {
      fontWeight: 'bold',
      fontSize: 50,
      paddingLeft:50,
      paddingTop:50,
    },
    reg_input: {
      backgroundColor: 'rgba(101, 101, 101, 0.2)',
      width: 280,
      height: 40,
      borderRadius: 50,
      marginLeft: 50,
      color: '#000', 
      paddingLeft:20,
      marginBottom:10
    },
    submit:{
      backgroundColor:"black",
      width:280,
      marginLeft:50,
      height:40,
      borderRadius:50,
      justifyContent:"center",
      alignItems:"center",
    },
    errorMessage: {
      color: 'red',
      marginTop: 10,
    },
  });

export default styles;