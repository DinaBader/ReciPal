import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cylinder:{
        backgroundColor:'#A62E2E',
        width:70,
        height:120,
        borderRadius:90
    },
    absoluteContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        paddingTop:600
      },
    
})

export default styles;