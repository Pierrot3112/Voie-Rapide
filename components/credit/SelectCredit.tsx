import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const SelectCredit = () => {
  const [selectedValue, setSelectedValue] = useState('');

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
        <Picker.Item label="30 crédits: 25 000 Ar" value="30" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: width * 0.05, 
    backgroundColor: 'white',
    borderRadius: 10,
  },
  picker: {
    height: height * 0.08, 
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default SelectCredit;