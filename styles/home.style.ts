import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    global: {
        flex: 1,
    },

    clientContainer: {
        backgroundColor: COLORS.bgBlue,
        padding: SIZES.xlarge,
        justifyContent: 'center',
    },

    searchContainer: {
        width: "100%",
        padding: SIZES.medium,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: SIZES.medium * 2,
        borderTopRightRadius: SIZES.medium * 2,
        position: 'absolute',
        zIndex: 1,
    },

    error: { 
        fontSize: 16, 
        color: "red", 
        textAlign: "center" 
    },

    df: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    number: {
        backgroundColor: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        borderRadius: SIZES.xxLarge,
        paddingVertical: 5,
        paddingHorizontal: 15,
        minWidth: 60, 
    },

    idNumber: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.black,
        borderRadius: 20,
        textAlign: 'center',
    },

    title: {
        marginBottom: 5,
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: '600',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },

    retryButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    retryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
