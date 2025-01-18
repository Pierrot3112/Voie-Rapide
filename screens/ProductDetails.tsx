import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './productDetails.style'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import img from '../assets/images/FB_IMG_17362571201264390.jpg';

const ProductDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
            <Ionicons name='heart' size={30} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
      <Image  
        source={img}
        style={styles.image}
      />

      <View style={styles.details}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Product</Text>
            </View>
      </View>
     </View>
  );
}

export default ProductDetails;