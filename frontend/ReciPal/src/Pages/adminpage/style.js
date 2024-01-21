import { StyleSheet } from "react-native";

const styles= StyleSheet.create({
    text:{
        paddingLeft:50,
        color:'#FFFFFF',
        paddingTop:50,
        fontSize:40,
    },
    image:{
        width:150,
        height:150,
    },
    imageContainer:{
        paddingLeft:120
    },
    button:{
        width:200,
        height:50,
        marginBottom:20,
        borderRadius:10,
        marginTop:10,
        textAlign:'center',
    },
    recipes:{
        fontSize:20, 
        marginLeft:50
    },
    foodCard:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    allRecipes:{
        paddingLeft:150
    }
})

export default styles;