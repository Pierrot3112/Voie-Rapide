import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    profileContainer: ViewStyle;
    imageProfile: ViewStyle;
    profileName: TextStyle;
}

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: COLORS.gray,
        height: 300,
        borderRadius: 30,
        marginTop: -50,
        textAlign: 'center',
    },

    imageProfile: {
        marginTop: 100,
        height: 80,
        width: 80,
        backgroundColor: COLORS.secondary,
        position: 'absolute',
        left: 140,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }, 

    profileName: {
        color: COLORS.green,
        marginTop: 190,
        marginLeft: 140
    }
})

export default styles;
