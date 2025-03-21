import { COLORS } from "../constants";
import { StyleSheet, TextStyle, ViewStyle, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

interface Styles {
  global: ViewStyle;
  creditContainer: ViewStyle;
  creditCard: ViewStyle;
  paymentContainer: ViewStyle;
  paymentTitle: TextStyle;
  achatBtn: ViewStyle;
  textBtn: TextStyle;
  codeContainer: ViewStyle;
  codeInput: ViewStyle;
  validBtn: ViewStyle;
  textValidBtn: TextStyle;
}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    paddingTop: height * 0.035,
  },
  creditCard: {
    padding: width * 0.02,
    height: '90%',
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: 10,
  },
  paymentContainer: {
    marginTop: height * 0.02,
    backgroundColor: 'transparent',
    height: height * 0.5,
    width: width * 0.90,
    borderRadius: 15,
    alignSelf: 'center',
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginHorizontal: height * 0.03,
  },
  paymentTitle: {
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    color: COLORS.gray
  },
  achatBtn: {
    width: width * 0.8,
    alignSelf: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.015,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    marginTop: 10,
  },
  textBtn: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: width * 0.05,
  },
  codeContainer: {
    height: height * 0.2,
    width: width * 0.95,
    marginTop: height * 0.02,
    borderRadius: 10,
    alignSelf: 'center',
  },
  codeInput: {
    width: '100%',
    borderWidth: 0,
    textAlign: 'center',
    borderRadius: 7,
    backgroundColor: COLORS.primary,
  },
  validBtn: {
    width: '95%',
    padding: height * 0.015,
    backgroundColor: COLORS.gray,
    marginTop: height * 0.02,
    borderRadius: 10,
    marginHorizontal: 'auto'
  },
  textValidBtn: {
    fontSize: width * 0.04,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.01, 
    marginBottom: 0, 
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
    padding: width * 0.02, 
    height: width * 0.15, 
    width: width * 0.2, 
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  selected: {
    borderColor: COLORS.gray,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default styles;