import { StyleSheet, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    global: ViewStyle;
    container: ViewStyle;
    formContainer: ViewStyle;
    codeInput: ViewStyle;
    btnCodeValid: ViewStyle;
}

const styles = StyleSheet.create({
    global: {
        height: SIZES.height,
        width: SIZES.width,
        paddingHorizontal: SIZES.medium,
        paddingTop: 50,
        backgroundColor: COLORS.bgBlue
    },

    container: {
        height: '100%',
        width: '100%',

    },

    formContainer: {
        height: SIZES.height/2,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.primary,
        padding: 'auto'
    },

    codeInput: {
        width: '95%',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: COLORS.gray,

    }
})

export default styles;