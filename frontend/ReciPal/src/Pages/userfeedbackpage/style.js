import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#302E2E',
        marginTop:35,
        width:350,
        height:180,
        marginLeft:15,
        paddingBottom:20,
        borderRadius:10
    },
    deleteButton:{
        backgroundColor:'#A62E2E',
        textAlign:'baseline',
        width:120,
        height:40,
        marginTop:70,
        marginLeft:30,
        borderRadius:10
    },
    align:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:8
    }
})

export default styles;