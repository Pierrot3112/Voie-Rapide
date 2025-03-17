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
        marginVertical: height * 0.02, // 2% de la hauteur
        padding: width * 0.03, // 3% de la largeur
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 2,
        width: width * 0.95, // 95% de la largeur
        height: height * 0.5, // 50% de la hauteur
        borderColor: COLORS.gray2,
        alignSelf: 'center',
    },

    input: {
        width: '100%',
        height: height * 0.06, // 6% de la hauteur
        borderWidth: 2,
        borderColor: COLORS.bgBlue,
        marginTop: height * 0.02, // 2% de la hauteur
        borderRadius: SIZES.medium - 10,
    },

    btn1: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.bgBlue,
        padding: width * 0.03, // 3% de la largeur
        marginTop: height * 0.02, // 2% de la hauteur
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
    },

    suggestionContainer: {
        position: 'absolute',
        top: height * 0.1, // 10% de la hauteur
        left: 0,
        right: 0,
        backgroundColor: 'white',
        zIndex: 1000,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: width * 0.03, // 3% de la largeur
        gap: height * 0.02, // 2% de la hauteur
    },

    suggestionItem: {
        marginBottom: height * 0.01, // 1% de la hauteur
    },

    pickerContainer: {
        marginVertical: height * 0.01, // 1% de la hauteur
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },

    picker: {
        height: height * 0.06, // 6% de la hauteur
        width: '100%',
    },

    radioTitle: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        marginBottom: height * 0.01, // 1% de la hauteur
    },

    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.01, // 1% de la hauteur
    },

    radioStyle: {
        marginTop: height * 0.02, // 2% de la hauteur
    },

    inputContainer: {
        borderRadius: 100,
    },
});

export default styles;