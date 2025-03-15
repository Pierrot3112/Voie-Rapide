import { COLORS } from '../../constants';
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PullToRefresh from '../../components/PullToRefresh';
import * as Permissions from 'expo'; 


const ChoixPayment = () => {
  const [selectedId, setSelectedId] = useState(null);

  const options = [
    { id: 1, image: require('../../assets/images/mvola.png') },
    { id: 2, image: require('../../assets/images/orangeMoney.png') },
    { id: 3, image: require('../../assets/images/airtelMoney.png') },
  ];

  const handleRefresh = async () => {
    // Logique de rafraîchissement ici
    console.log("Refreshing ChoixPayment page...");
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
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
            <Image source={option.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </PullToRefresh>
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
    borderColor: COLORS.black,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ChoixPayment;