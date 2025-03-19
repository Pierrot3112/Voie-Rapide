import { ImageStyle, StyleSheet, TextStyle, ViewStyle, Dimensions } from "react-native";
import { COLORS, SIZES } from "../constants";

const { width, height } = Dimensions.get("window");

interface Styles {
    container: ViewStyle;
    input: ViewStyle;
    btn1: ViewStyle;
    suggestionContainer: ViewStyle;
    suggestionItem: ViewStyle;
    pickerContainer: ViewStyle;
    picker: ViewStyle;
    radioTitle: TextStyle;
    radioItem: ViewStyle;
    radioStyle: ViewStyle;
    inputContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        marginVertical: height * 0.02,
        padding: width * 0.03, 
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        elevation: 2,
        width: width * 0.95, 
        height: height * 0.5,
        borderColor: COLORS.bgBlue,
        alignSelf: 'center',
    },

    input: {
        width: '100%',
        height: height * 0.06, 
        borderWidth: 2,
        borderColor: COLORS.secondary,
        marginTop: height * 0.02,
        borderRadius: SIZES.medium - 10,
        backgroundColor: 'transparent',
    },

    btn1: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.secondary,
        padding: width * 0.03,
        marginTop: height * 0.02, 
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
    },

    suggestionContainer: {
        position: 'absolute',
        top: height * 0.1, 
        left: 0,
        right: 0,
        backgroundColor: COLORS.tertiary,
        zIndex: 1000,
        elevation: 5,
        borderWidth: 1,
        borderRadius: 5,
        padding: width * 0.03, 
        gap: height * 0.02, 
    },

    suggestionItem: {
        marginBottom: height * 0.01,
    },

    pickerContainer: {
        marginVertical: height * 0.01, 
        borderWidth: 1,
        borderRadius: 5,
    },

    picker: {
        height: height * 0.06, 
        width: '100%',
    },

    radioTitle: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        marginBottom: height * 0.01, 
    },

    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.01, 
    },

    radioStyle: {
        marginTop: height * 0.02, 
    },

    inputContainer: {
        borderRadius: 100,
        
    },
});

export default styles;