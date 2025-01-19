import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import styles from './productRow.style';
import useFetch from '../../hook/useFetch';

type Product = {
  _id: string;
  title: string;
  supplier: string;
  price: string;
  imageUrl: string;
  description: string;
  product_location: string;
};

const ProductRow = () => {
  // Utilisation du hook useFetch pour récupérer les produits
  const { data, isLoading, error } = useFetch<Product[]>('http://192.168.43.25:3000/api/products/');
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return (
    <View style={styles.container}>
      {/* Affiche un indicateur de chargement pendant que les données sont récupérées */}
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        // Si une erreur se produit, afficher un message d'erreur
        <Text style={{ color: COLORS.primary, fontSize: 18 }}>Something went wrong: {error}</Text>
      ) : (
        // Si les données sont disponibles, afficher la liste des produits
        <FlatList
          data={data}
          keyExtractor={(item) => item._id} // TypeScript reconnaît maintenant "_id"
          renderItem={({ item }) => <ProductCardView item={item} />} // Passe les données à ProductCardView
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default ProductRow;
