import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    
    ingredientsTitle:{
        fontSize:20,
        left:30,
        marginTop:20
    },
    ingredientsText:{
        marginLeft:30,
        marginTop:10
    },
    cylinder:{
        marginLeft:20,
        marginTop:20,
        gap:20
    },
    backButtonContainer: {
        display:'flex',
        flexDirection:'row',
        gap:200,
        position: 'absolute',
        top: 20, 
        zIndex: 1,
      },
    
})

export default styles;