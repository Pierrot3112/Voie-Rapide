import { StyleSheet, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    header: ViewStyle;

}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: SIZES.width,
        height: 50,
        backgroundColor: COLORS.gray,
        paddingHorizontal: 20,
    },


})

export default styles;