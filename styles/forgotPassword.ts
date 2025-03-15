import { SIZES } from "../constants";
import { StyleSheet, ViewStyle } from "react-native";

interface Styles {
    container: ViewStyle;
    formContainer: ViewStyle,
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        height: SIZES.height,
        padding: 20,
    },

    formContainer: {
        marginTop: 50,
        padding: 'auto',
        width: '100%'
    }
})

export default styles;