import { StyleSheet } from "react-native";

const style=StyleSheet.create({

    navIcons:{ 
        width:30,
        height:30, 
    },
    container:{
        display: 'flex',
        flexDirection: 'row', 
        // justifyContent: 'space-between', 
        gap:130,
        alignItems: 'center',
    },
    home:{
        marginLeft:15
    }
})

export default style