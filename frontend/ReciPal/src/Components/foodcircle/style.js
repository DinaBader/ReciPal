import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text:{
        color:'#FFFFFF',
        textAlign:'center',
        marginTop:10,
        fontWeight:'bold'
    },
    selectedFoodCircle: {
        borderColor: 'yellow',
        borderWidth: 2,
        borderRadius: 100,
        padding: 10,
      },
      foodcircle:{
        width: 70, 
        height: 70, 
        borderRadius: 100
      }
})

export default styles;