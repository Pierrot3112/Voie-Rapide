import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import RadioButtonIOS from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonIOS';
import styles from '../styles/account.client.style';
import SelectCredit from './credit/SelectCredit';
import ChoixPayment from './payment/ChoixPayment';


const AccountClient = () => {
  return (
    <SafeAreaView style={styles.global}>
      <View style={styles.creditContainer}>
        <View style={styles.creditCard}>

        </View>
        <View style={styles.creditCard}>

        </View>
      </View>
      <View style={styles.paymentContainer}>
        <SelectCredit />
       <ScrollView>

        <View>
          <Text style={{textAlign: 'center'}}>Choix de paiement</Text>
        </View>
          <ChoixPayment />
          <TouchableOpacity style={styles.achatBtn}>
            <Text style={styles.textBtn}>Acheter</Text>
          </TouchableOpacity>
       </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default AccountClient;
