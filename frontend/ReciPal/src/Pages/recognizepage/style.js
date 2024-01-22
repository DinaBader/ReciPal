import { StyleSheet } from "react-native";

const Styles=StyleSheet.create({
     btn:{
        textAlign:'center',
        paddingTop:15,
        marginTop:20
     },
     image:{
        width:320,
        height:200,
    },
    imageContainer:{
        paddingLeft:40,
        paddingTop:30
    },
    tagsContainer:{
        paddingLeft:70,
        paddingTop:20,
        marginLeft:-70,
    },
    foodCard:{
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },
    options:{
        marginLeft:20,
        marginTop:10,
        marginBottom:10
    },
    tag:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        borderRadius:5,
    },
    indTag:{
        backgroundColor:'#FFBF4D',
        width:110,
        height:40,
        borderRadius:10,
        paddingLeft:30,
        display:'flex',
        flexWrap:'wrap'
    }

})

export default Styles;