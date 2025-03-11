import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import data from '../../util/credit.json'; // Importez votre fichier JSON

// Définir le type des éléments de crédit
type CreditItem = {
  id: number;
  name: string;
};

const SelectCredit = () => {
  const [selectedValue, setSelectedValue] = useState(''); // Initialisez avec le premier élément

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choix de crédit" value="null" />
        <Picker.Item label="5 crédits: 5 000 Ar" value="5" />
        <Picker.Item label="12 crédits: 10 000 Ar" value="12" />
        <Picker.Item label="30 crédits: 25 000 Ar" value="option3" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default SelectCredit;