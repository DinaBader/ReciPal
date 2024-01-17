import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container:{
        flex: 1, 
    },
    text:{
        paddingLeft:50,
        paddingTop:55,
        color:'#FFFFFF',
        fontSize:30
    },
    foodCircleContainer: {
        flexDirection: 'row', 
        marginTop: 20,
        marginLeft:-140,
    },
    recipeText:{
        marginLeft:50,
        marginTop:20,
        fontSize:25
    },
    foodCard:{
        flexDirection:'row',
        flexWrap:'wrap'
    }    
})
 
export default styles;