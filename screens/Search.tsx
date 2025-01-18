import React from 'react';
import { View, Text, TouchableOpacity, TextInput  } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import styles from './search.style';
import { COLORS, SIZES } from '../constants';


const Search = () => {
  return (
    <View style={styles.searchContainer}>
            <TouchableOpacity>
                <Ionicons  name="camera-outline" size={SIZES.xlarge} style={styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
                <TextInput 
                    style={styles.searchInput}
                    value=''
                    onPressIn={()=>{}}
                    placeholder='What are you looking for'
                />
            </View>
            <View>
                <TouchableOpacity style={styles.searchBtn}>
                    <Feather name='search' size={24} color={COLORS.offwhite}/>
                </TouchableOpacity>
            </View>
        </View>
  );
}

export default Search;

