import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, NativeSyntheticEvent, ImageErrorEventData } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './productCardView.style';
import { COLORS } from '../../constants';
import { RootStackParamList } from './types'; // Importez les types
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Définir le type des props
type ProductCardViewProps = {
  item?: { // Ajoutez '?' pour rendre 'item' optionnel
    _id: string;
    title: string;
    supplier: string;
    price: string;
    imageUrl: string;
    description: string;
    product_location: string;
  };
};

const ProductCardView = ({ item }: ProductCardViewProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
    if (!item) return null;
  
    const [imageUrl, setImageUrl] = useState(item.imageUrl);
  
    const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
      setImageUrl('https://via.placeholder.com/150'); // Image par défaut si l'originale échoue
    };
  
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { item })}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              onError={handleImageError}
            />
          </View>
  
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title || 'No Title'}
            </Text>
            <Text style={styles.supplier} numberOfLines={1}>
              {item.supplier || 'No Supplier'}
            </Text>
            <Text style={styles.price}>
              ${item.price || '0.00'}
            </Text>
          </View>
  
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle" size={35} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  
export default ProductCardView;
