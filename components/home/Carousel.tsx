import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import Img1 from '../../assets/images/img1.jpg';
import Img2 from '../../assets/images/img2.jpg';
import Img3 from '../../assets/images/img3.jpg';

// Obtenez la largeur de l'écran pour définir la taille de chaque image
const { width } = Dimensions.get('window');

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tableau d'images
  const images = [Img1, Img2, Img3];

  // Utiliser useEffect pour changer l'image automatiquement (autoplay)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Changer toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <Image source={item} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={currentIndex}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={(error) => console.log(error)} // Gestion des erreurs
        snapToAlignment="center"
        contentOffset={{ x: currentIndex * width, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width,
    height: 200, 
    overflow: "hidden",
    borderRadius: 15,
  },
});

export default ImageSlider;
