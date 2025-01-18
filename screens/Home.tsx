import React, { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import styles from './home.style';
import { Welcome } from '../components/products';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import ProductCardView from '../components/products/ProductCardView';

const Home: FC = () => {
  return (
    <View>
      <View style={styles.appBarWrapper}> 
        <View style={styles.appBar}> 
           <Ionicons name='location-outline' size={24}/>

           <Text style={styles.location}>Antsirabe Madagascar</Text>

           <View style={{ alignItems: "flex-end"}}>
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>8</Text>
              </View>
              <TouchableOpacity>
                <Fontisto name='shopping-bag' size={24} />
              </TouchableOpacity>
           </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
        <ProductCardView />
      </ScrollView>
    </View>
  );
}

export default Home;
