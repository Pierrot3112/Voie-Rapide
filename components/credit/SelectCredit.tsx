import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity,  Dimensions, Text } from 'react-native';
import { COLORS } from '../../constants';

const { width, height } = Dimensions.get('window');

const SelectCredit = () => {
  const [selectedId, setSelectedId] = useState(null);

  const options = [
    { id: 1, name: "5 Crédits" }, 
    { id: 2, name: "12 Cédits" }, 
    { id: 3, name: "30 Crédits" }, 
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => setSelectedId(option.id)}
          style={[
            styles.imageContainer,
            selectedId === option.id && styles.selected,
          ]}
        >
          <Text>{option.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: width * 0.2, 
    width: width * 0.2, 
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
  },
  selected: {
    borderColor: COLORS.black,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SelectCredit;