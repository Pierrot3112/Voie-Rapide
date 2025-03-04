import React from 'react';
import { View, Text } from 'react-native';
import styles from './profile.style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
const Profile = () => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfile}>
        <Ionicons 
          name='person'
          color={COLORS.gray2}
          size={50}
        />
      </View>
        <Text style={styles.profileName}>Mon Profile</Text>
    </View>
  );
}

export default Profile;