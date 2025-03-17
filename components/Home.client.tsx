import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/home.style';
import api from "../config/AxioConfig";
import { SIZES } from '../constants';
import FormSearch from './search/FormSearch';
import PullToRefresh from './PullToRefresh';

const HomeClient = () => {
  const { width, height } = useWindowDimensions(); 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

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

  // Gestion du rafraîchissement
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMe();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchMe} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <SafeAreaView style={styles.global}>
        {user && (
          <View style={[styles.clientContainer, { width, height: height * 0.25 }]}>
            <View style={styles.df}>
              <Text style={styles.idNumber}>{user.num_tel}</Text>
              <Image 
                source={require('../assets/images/user.png')} 
                style={{
                  height: SIZES.xxLarge * 1.5,
                  width: SIZES.xxLarge * 1.5,
                  resizeMode: 'contain'
                }}
              />
            </View>
            <View style={[styles.df, { marginTop: SIZES.xxLarge / 4 }]}>
              <View>
                <Text style={styles.title}>Mes crédits</Text>
                <Text style={styles.number}>{user.credit}</Text>
              </View>
              <View>
                <Text style={styles.title}>Consultations</Text>
                <Text style={styles.number}>{user.nb_consultation}</Text>
              </View>
            </View>
          </View>
        )}
        <FormSearch />
      </SafeAreaView>
    </PullToRefresh>
  );
};

export default HomeClient;
