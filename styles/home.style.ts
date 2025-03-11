import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    global: ViewStyle;
    clientContainer: ViewStyle;
    searchContainer: ViewStyle;
    error: TextStyle;
    df: ViewStyle;
    number: TextStyle;
    idNumber: TextStyle;
    title: TextStyle;
}

const styles = StyleSheet.create({
    global:{
        position: "relative"
    },

    clientContainer: {
        height: SIZES.height/3,
        width: SIZES.width,
        backgroundColor: COLORS.bgBlue,
        padding: SIZES.xlarge,
    },

    searchContainer: {
        width: SIZES.width,
        padding: SIZES.medium,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: SIZES.medium*2,
        borderTopRightRadius: SIZES.medium*2,
        position: 'absolute',
        top: SIZES.height/3,
        zIndex: 1
    },

    error: { 
        fontSize: 16, 
        color: "red", 
        textAlign: "center" 
    },

    df: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    number: {
        paddingHorizontal: 'auto',
        paddingVertical: 'auto',
        backgroundColor: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        borderRadius: SIZES.xxLarge
    },

    idNumber: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 13,
        paddingVertical: 25,
        backgroundColor: COLORS.black,
        borderRadius: 20
    },

    title: {
        marginBottom: 5,
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: 'condensedBold'
    }
})

export default styles;