import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../constants";

interface Styles {
    container: ViewStyle;
    upperRow: ViewStyle;
    image: ImageStyle;
    details: ViewStyle;
    titleRow: ViewStyle;
    title: TextStyle;
    priceWrapper: ViewStyle;
    price: TextStyle;
    ratingRow: ViewStyle;
    rating: ViewStyle;
    ratingText: TextStyle;
    descriptionWrapper: ViewStyle;
    description: TextStyle;
    desText: TextStyle;
    location: ViewStyle;
    cartRow: ViewStyle;
    cartBtn: TextStyle;
    addCart: TextStyle;
    cartTitle: TextStyle;
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
        resizeMode: "cover",
        height: 300,
        width: "100%"
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
        alignItems: "center",
        width: SIZES.width -44,
        top: 20
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.large
    },
    priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: "semibold",
        fontSize: SIZES.large
    },
    ratingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width -10,
        top: 5
    },
    rating: {
        top: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: SIZES.large
    },
    ratingText: {
        color: COLORS.gray,
        fontFamily: "medium",
        paddingHorizontal: SIZES.xSmall
    },
    descriptionWrapper: {
        marginTop: SIZES.large*2,
        marginHorizontal: SIZES.large
    },
    description: {
        fontFamily: "medium",
        fontSize: SIZES.large -2
    },
    desText: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        textAlign: "justify",
        marginBottom: SIZES.small
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        padding: 5,
        borderRadius: SIZES.large
    },
    cartRow: {
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width,
    },
    cartBtn: {
        width: SIZES.width*0.7,
        backgroundColor: COLORS.black,
        padding: SIZES.small/2,
        borderRadius: SIZES.large,
        marginLeft: 12
    },
    cartTitle: {
        marginLeft: SIZES.small,
        fontFamily: "bold",
        fontSize: SIZES.medium,
        color: COLORS.lightWhite
    },
    addCart: {
        width: 37,
        height: 37,
        borderRadius: 50,
        margin: SIZES.small,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default styles;