import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../config/AxioConfig';
import { useNavigation } from "@react-navigation/native";
import styles from 'styles/header.style';

const Header = () => {
const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fonction de récupération des données avec gestion des erreurs
  const fetchMe = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/me"); 
      setUser(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <View style={styles.header}>
      {/* Dynamic user phone number */}
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold'}}>{user ? user.num_tel : 'Chargement...'}</Text>
      </View>

      <View>
        <Text>Voie Rapide</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Mon Compte')}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Crédits</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        ) : (
          user && <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>{user.credit}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
