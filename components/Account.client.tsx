import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../styles/account.client.style';
import SelectCredit from './credit/SelectCredit';
import ChoixPayment from './payment/ChoixPayment';
import { TextInput } from 'react-native-paper';

import api from "../config/AxioConfig";

const AccountClient = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchMe = async () => {
      try {
        const response = await api.get("/me"); 
        setUser(response.data);
      } catch (err: any) {
        setError(err.message || "Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <SafeAreaView style={styles.global}>
      <View style={styles.creditContainer}>
        <View style={styles.creditCard}>
          <Text>Mes crédits</Text>
          <Text>{user.credit}</Text>
        </View>
        <View style={styles.creditCard}>
          {/* Contenu de la deuxième carte de crédit */}
          <Text>Fix crédits</Text>
          <Text>5 crédits: 5 000 Ar</Text>
          <Text>12 crédits: 10 000 Ar</Text>
          <Text>30 crédits: 25 000 Ar</Text>
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