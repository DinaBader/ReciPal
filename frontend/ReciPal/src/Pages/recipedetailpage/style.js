import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    
    ingredientsTitle:{
        fontSize:20,
        left:30,
        marginTop:20
    },
    ingredientsText:{
        marginLeft:30,
        marginTop:10,
        marginRight:30
    },
    cylinder:{
        marginLeft:20,
        marginTop:20,
        gap:20
    },
    backButtonContainer: {
        display:'flex',
        flexDirection:'row',
        gap:200,
        position: 'absolute',
        zIndex: 1,
      },    
      button:{
        borderRadius:50,
        marginLeft:50,
        marginTop:20,
        marginBottom:20,
      },
      completed:{
        backgroundColor:'#FFBF4D'
      },
      notCompleted:{
        backgroundColor:'grey'
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
})

export default styles;