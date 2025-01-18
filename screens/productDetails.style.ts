import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    container: ViewStyle;
    upperRow: ViewStyle;
    image: ImageStyle;
    details: ViewStyle;
    titleRow: ViewStyle;
    title: TextStyle;
}
const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    upperRow: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position
        : "absolute",
        top: SIZES.xxLarge,
        width: SIZES.width -44,
        zIndex: 999
    },
    image: {
        aspectRatio: 1,
        resizeMode: "cover",
        height: 100
    },
    details: {
        marginTop: -SIZES.large,
        backgroundColor: COLORS.lightWhite,
        width: SIZES.width,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
    },
    titleRow: {
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        width: SIZES.width -44,
        top: 20
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.large
    }
})

export default styles;