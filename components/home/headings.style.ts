import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, SIZES } from "../../constants";


interface Style  {
    container: ViewStyle;
    header: ViewStyle;
    headerTitle: TextStyle;
}

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        //marginBottom: -SIZES.xSmall,
        marginHorizontal: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTitle: {
        fontFamily: "semibold",
        fontSize: SIZES.xlarge -2,
    }
}) 

export default styles;
