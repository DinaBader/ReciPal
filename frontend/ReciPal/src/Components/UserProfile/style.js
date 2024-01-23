import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    image:{
        width:220,
        height:220,
        borderRadius:200,
        marginTop:70,
    },
    ChangeProfile:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,
        textDecorationLine:'underline',
        color:'#FFBF4D',
    },
    button:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,
    },
    editProfile:{
        marginTop:10,
        width:180
    },
    Icon:{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 30,
        marginTop: 10
    },
    btn:{
        width:80,
        height:25,
        marginBottom:10,
        marginLeft:180,
        borderRadius:5,
        marginTop:5
    },
    next:{
        display:'flex',
        flexDirection:'column'
    }


})

export default style;