import { COLORS } from '../../constants';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ChoixPayment = () => {
  // État pour stocker l'ID de l'option sélectionnée
  const [selectedId, setSelectedId] = useState(null);

  // Données des images (remplacez par vos propres images)
  const options = [
    { id: 1, image: require('../../assets/images/mvola.png') },
    { id: 2, image: require('../../assets/images/orangeMoney.png') },
    { id: 3, image: require('../../assets/images/airtelMoney.png') },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => setSelectedId(option.id)} // Mettre à jour l'état avec l'ID sélectionné
          style={[
            styles.imageContainer,
            selectedId === option.id && styles.selected, // Appliquer un style si l'option est sélectionnée
          ]}
        >
          <Image source={option.image} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    height: 75,
    width: 75,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
  },
  selected: {
    borderColor: COLORS.black, // Couleur de la bordure pour l'option sélectionnée
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ChoixPayment;