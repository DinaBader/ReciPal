import { StyleSheet } from "react-native";

const style=StyleSheet.create({

    navIcons:{ 
        width:30,
        height:30, 
    },
    container:{
        display: 'flex',
        flexDirection: 'row', 
        gap:130,
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom:5, 
        height:55
    },
    home:{
        marginLeft:15
    }
})

export default style