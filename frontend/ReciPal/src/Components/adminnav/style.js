import { StyleSheet } from "react-native";

const style=StyleSheet.create({

    navIcons:{ 
        width:30,
        height:30, 
    },
    container:{
        display: 'flex',
        flexDirection: 'row', 
        gap:44,
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 8, 
        height:55
    },
    home:{
        marginLeft:25
    }
})

export default style