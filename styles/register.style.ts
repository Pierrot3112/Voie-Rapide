import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { COLORS, SIZES } from "../constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Styles {
    container: ViewStyle;
    head: ViewStyle;
    headContent: ViewStyle;
    title: ViewStyle;
    titleText: TextStyle;
    form: ViewStyle;
    formLogin: ViewStyle;
    image: ImageStyle;
    inputText: TextStyle;
    inputPassword: ViewStyle;
    icon: TextStyle;
    btnSubmit: ViewStyle;
    btnSubmitText: TextStyle;
    registerLink: ViewStyle;
    btnQuitModal: ViewStyle;
    modal: ViewStyle;
    headModal: ViewStyle;
    logo: ViewStyle;
    forgotPassword: TextStyle;
    loginTitle: ViewStyle;
    textLog1: TextStyle;
    textLog2: TextStyle;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },

    head: {
        height: hp('40%'), // 40% de la hauteur de l'écran
        width: wp('100%'),
        position: 'absolute',
        top: 0,
        opacity: 0.85,
    },

    logo: {
        height: wp('12%'), 
        width: wp('12%'),
        position: 'absolute',
        right: wp('-55%'),
        opacity: 0.85,
        borderRadius: wp('6%'),
    },

    headContent: {
        backgroundColor: COLORS.bgBlue,
        height: '100%',
    },

    form: {
        height: hp('60%'), 
        width: wp('100%'),
        paddingBottom: hp('2%'),
        gap: hp('2%'),
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position: 'relative',
        paddingTop: hp('15%'),
    },

    loginTitle: {
        position: 'absolute',
        top: hp('2%'),
        left: wp('5%'),
    },

    inputText: {
        width: "90%",
        padding: hp('1.5%'),
        fontSize: SIZES.medium,
        borderWidth: 1,
        borderBottomColor: COLORS.bgBlue,
        borderRadius: 10,
    },

    inputPassword: {
        flexDirection: "row",
        alignItems: 'center',
        width: "90%",
        padding: hp('1.5%'),
        fontSize: SIZES.medium,
        borderWidth: 1,
        borderBottomColor: COLORS.bgBlue,
        borderRadius: 10,
        justifyContent: 'space-between',
    },

    icon: {
        color: COLORS.bgBlue,
    },

    forgotPassword: {
        marginTop: hp('-1%'),
        marginRight: 0,
        color: COLORS.bgBlue,
        position: 'absolute',
        right: wp('-40%'),
    },

    btnSubmit: {
        width: "90%",
        backgroundColor: COLORS.bgBlue,
        paddingHorizontal: 10,
        paddingVertical: SIZES.small,
        borderRadius: SIZES.large,
    },

    btnSubmitText: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },

    btnQuitModal: {
        height: SIZES.xlarge,
        width: SIZES.xlarge,
        backgroundColor: COLORS.gray2,
        fontSize: SIZES.large,
        fontWeight: 'bold',
        borderRadius: SIZES.xlarge / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 10,
    },

    modal: {
        height: hp('100%') - 90,
        width: wp('100%') - 10,
        alignSelf: 'center',
        position: 'relative',
        top: -2,
    },

    headModal: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 10,
        paddingTop: 50,
        paddingBottom: 20,
    },

    textLog1: {
        fontSize: SIZES.medium,
    },

    textLog2: {
        fontSize: SIZES.large * 1.2,
        fontWeight: 'bold',
        fontFamily: 'Faster One',
        fontStyle: 'normal',
        color: COLORS.bgBlue,
    },
});

export default styles;
