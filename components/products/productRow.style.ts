import { StyleSheet, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../../constants";

interface Styles {
    container: ViewStyle;
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        marginLeft: 12
    }
})

export default styles;