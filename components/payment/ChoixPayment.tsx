import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import PullToRefresh from '../../components/PullToRefresh';
import { COLORS } from '../../constants';

const { width, height } = Dimensions.get('window');

const ChoixPayment = () => {
  const [selectedId, setSelectedId] = useState(null);

  const options = [
    { id: 1, image: require('../../assets/images/mvola.png') },
    { id: 2, image: require('../../assets/images/orangeMoney.png') },
    { id: 3, image: require('../../assets/images/airtelMoney.png') },
  ];

  const handleRefresh = async () => {
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
    backgroundColor: COLORS.secondary,
  },
  selected: {
    borderColor: COLORS.gray,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ChoixPayment;