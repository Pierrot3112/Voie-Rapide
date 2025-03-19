import { ImageStyle, StyleSheet, TextStyle, ViewStyle, Dimensions } from "react-native";
import { COLORS, SIZES } from "../constants";

const { width, height } = Dimensions.get("window");
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
    logo: ImageStyle;
    forgotPassword: TextStyle;
    loginTitle: ViewStyle;
    textLog1: TextStyle;
    textLog2: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },

    head: {
        height: height * 0.4, 
        width: width,
        position: 'absolute',
        top: 0,
        opacity: 0.85,
    },

    headContent: {
        backgroundColor: COLORS.bgBlue,
        height: '100%',
    },

    logo: {
        height: wp('12%'), 
        width: wp('12%'),
        position: 'absolute',
        right: wp('-38%'),
        opacity: 0.85,
        borderRadius: wp('6%'),
    },

    formLogin: {
        height: height * 0.3, 
        width: width,
        paddingBottom: 20,
        gap: height * 0.03,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingTop: height * 0.15,
    },

    loginTitle: {
        marginTop: height * 0.02, 
        position: 'absolute',
        left: width * 0.25, 
    },

    inputText: {
        width: width * 0.9, 
        padding: height * 0.02, 
        fontSize: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.bgBlue,
        borderRadius: 10,
    },

    inputPassword: {
        flexDirection: "row",
        alignItems: 'center',
        width: width * 0.9, 
        padding: height * 0.01, 
        fontSize: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.bgBlue,
        borderRadius: 10,
        justifyContent: 'space-between',
    },

    icon: {
        color: COLORS.bgBlue,
    },

    forgotPassword: {
        marginTop: height * -0.01, 
        color: COLORS.bgBlue,
        position: 'absolute',
        left: width * 0.05, 
    },

    btnSubmit: {
        width: width * 0.9,
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

    textLog1: {
        fontSize: SIZES.medium,
    },

    textLog2: {
        fontSize: SIZES.large * 1.2,
        fontWeight: 'bold',
        fontFamily: 'Faster One',
        fontStyle: 'normal',
        color: COLORS.gray,
        textAlign: 'center'
    },
});

export default styles;