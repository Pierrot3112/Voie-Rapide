import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    container: ViewStyle;
    input: ViewStyle;
    btn: ViewStyle;
    marginTop: ViewStyle;
    suggestionItem: ViewStyle;
}

const styles = StyleSheet.create({

    input: {
        width: '100%',
        height: SIZES.height/14,
        borderWidth: 2, 
        borderColor: COLORS.bgBlue, 
        borderStyle: 'solid',
        marginTop: 20,
        borderRadius: SIZES.medium-10
    },

    btn1: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%', 
        backgroundColor: COLORS.bgBlue,
        padding: 10,
        marginTop: 'auto',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        fontSize: 24,
        color:  COLORS.primary,
        fontWeight: 'bold'
    },

    btnText: {
    },

    suggestionContainer: {
        position: 'absolute',
        top: 75, 
        left: 0,
        right: 0,
        backgroundColor: 'white',
        zIndex: 1000, 
        elevation: 5, 
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 20,
        gap: 20,
    },

    suggestionItem:{
      marginBottom: 10,
    },

    pickerContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
      picker: {
        height: 50,
        width: '100%',
      },  
      
      container: {
        marginVertical: 15,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 2,
        width: '95%',
        height: SIZES.height/2,
        borderColor: COLORS.gray2, 
        borderStyle: 'solid',
        margin: 'auto'
      },
      
      radioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      
      radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      },
      
      radioStyle: {
        marginTop: 15
      },

      inputContainer: {
        borderRadius: 100
      }
})

export default styles;