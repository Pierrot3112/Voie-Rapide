import { COLORS, SIZES } from "../constants";
import { StyleSheet, ViewStyle } from "react-native";


interface Styles {
    global: ViewStyle;
    creditContainer: ViewStyle;
    creditCard: ViewStyle;
    paymentContainer: ViewStyle;
    achatBtn: ViewStyle;
}

const styles = StyleSheet.create({
    global: {
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: COLORS.gray,
        height: SIZES.height,
    },

    creditContainer: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZES.height/5,
        width: SIZES.width-28,
        flexDirection: 'row',
        paddingVertical: 'auto',
        paddingHorizontal: 'auto',
        paddingTop: 30
    },

    creditCard: {
        padding: 10,
        height: '90%',
        backgroundColor: COLORS.primary,
        flex: 1,
        borderRadius: 10
    },

    paymentContainer: {
        marginTop: SIZES.medium,
        padding: SIZES.xlarge,
        backgroundColor: COLORS.green,
        height: SIZES.height/2,
        width: SIZES.width-30,
        borderRadius: 15
    },

    achatBtn: {
        textAlign: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        backgroundColor: COLORS.black,
        borderRadius: 20
    },

    textBtn: {
        textAlign: 'center',
        color: COLORS.primary,
        fontSize: 24
    }
})

export default styles;