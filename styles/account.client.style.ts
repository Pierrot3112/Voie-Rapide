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
    paddingTop: height * 0.02,
    paddingHorizontal: width * 0.03,
    backgroundColor: COLORS.gray,
    flex: 1,
  },
  creditContainer: {
    flexDirection: 'row',
    gap: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.2,
    width: width * 0.95,
    paddingVertical: height * 0.02,
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
    backgroundColor: COLORS.green,
    height: height * 0.4,
    width: width * 0.95,
    borderRadius: 15,
    alignSelf: 'center',
    paddingBottom: 20
  },
  paymentTitle: {
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  achatBtn: {
    alignSelf: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.015,
    backgroundColor: COLORS.black,
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
    padding: width * 0.05,
    backgroundColor: COLORS.gray2,
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
    width: '100%',
    padding: height * 0.015,
    backgroundColor: COLORS.black,
    marginTop: height * 0.02,
    borderRadius: 10,
  },
  textValidBtn: {
    fontSize: width * 0.04,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;