import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container:{
        flex: 1, 
    },
    text:{
        paddingLeft:50,
        paddingTop:55,
        color:'#FFFFFF',
        fontSize:30,
        paddingBottom:9
    },
    foodCircleContainer: {
        flexDirection: 'row', 
        marginTop: 20,
        marginLeft:-140,
    },
    recipeText:{
        marginLeft:50,
        fontSize:27
    },
    foodCard:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    foodCircleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5,
      },
      
})
 
export default styles;