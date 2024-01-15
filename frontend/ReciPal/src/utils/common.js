import {StyleSheet} from 'react-native'
const common = StyleSheet.create({
    yellow_bg: {
      backgroundColor:'#FFBF4D',
    },
    black_bg:{
        backgroundColor:'#000000',
    },
    backgroundColor:{
        backgroundColor:'#161616',
        flex:1
    },
    transparent_inputs:{
        backgroundColor: 'rgba(101, 101, 101, 0.2)',
    },
    yellow:{
        color:'#FFBF4D',
    },
    black:{
        color:'#000000',
    },
    gray:{
        color:'#5F5E5E'
    } ,
    white:{
        color:'#FFFFFF'
    },
    bold:{
        fontWeight:'bold'
    },
    raduis:{
        borderRadius:50
    },
    button_w:{
        width:280
    },
    button_h:{
        height:45
    },
    center:{
        justifyContent:"center",
        alignItems:"center"
    },
    header:{
        marginTop:25 ,
        marginLeft:50,
        fontSize:35,
        letterSpacing:1

    },
    flex:{
        flexDirection:'row'
    }
  });

export default common;