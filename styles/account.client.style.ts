import { COLORS, SIZES } from "../constants";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Styles {
  global: ViewStyle;
  creditContainer: ViewStyle;
  creditCard: ViewStyle;
  paymentContainer: ViewStyle;
  paymentTitle: ViewStyle;
  achatBtn: ViewStyle;
  textBtn: ViewStyle;
  codeContainer: ViewStyle;
  codeInput: ViewStyle;
  validBtn: ViewStyle;
  textValidBtn: TextStyle;
}

const styles = StyleSheet.create({
  global: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.gray,
    height: SIZES.height,
  },
  creditContainer: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height / 5,
    width: SIZES.width - 28,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  creditCard: {
    padding: 10,
    height: '90%',
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: 10,
  },
  paymentContainer: {
    marginTop: SIZES.medium,
    backgroundColor: COLORS.green,
    height: SIZES.height / 2.5,
    width: SIZES.width - 30,
    borderRadius: 15,
    marginHorizontal: 5
  },
  paymentTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  achatBtn: {
    textAlign: 'center',
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: COLORS.black,
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 20
  },
  textBtn: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: 24,
  },

  codeContainer: {
    height: SIZES.height/4.5,
    width: SIZES.width-30,
    marginTop:20,
    padding: 20,
    backgroundColor: COLORS.gray2,
    borderRadius: 10
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
    padding: 15,
    backgroundColor: COLORS.black,
    marginTop: 20,
    borderRadius: 10
  },

  textValidBtn: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default styles;