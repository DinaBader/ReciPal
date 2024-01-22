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
    },
    deleteButton:{
        backgroundColor:'#A62E2E',
        textAlign:'baseline',
        width:120,
        height:40,
        marginTop:20,
        marginLeft:50,
        borderRadius:10
    },
    align:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:8
    },
    getRecipes:{
        paddingLeft:150
    }
})

export default styles;