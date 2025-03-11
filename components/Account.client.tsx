import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/account.client.style';
import SelectCredit from './credit/SelectCredit';
import ChoixPayment from './payment/ChoixPayment';
import { TextInput } from 'react-native-paper';

const AccountClient = () => {
  return (
    <SafeAreaView style={styles.global}>
      <View style={styles.creditContainer}>
        <View style={styles.creditCard}>
          {/* Contenu de la première carte de crédit */}
        </View>
        <View style={styles.creditCard}>
          {/* Contenu de la deuxième carte de crédit */}
        </View>
      </View>
      <View style={styles.paymentContainer}>
        <SelectCredit />
        <Text style={styles.paymentTitle}>Choix de paiement</Text>
        <ChoixPayment />
        <TouchableOpacity style={styles.achatBtn}>
          <Text style={styles.textBtn}>Acheter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.codeContainer}>
        <TextInput
        style={styles.codeInput}
          placeholder='Entrer ici votre code'
        />
        <TouchableOpacity style={styles.validBtn}>
          <Text style={styles.textValidBtn}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountClient;