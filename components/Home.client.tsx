import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/home.style';
import api from "../config/AxioConfig";
import { SIZES } from '../constants';
import FormSearch from './search/FormSearch';
import PullToRefresh from './PullToRefresh';

const HomeClient = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMe = async () => {
    try {
      const response = await api.get("/me"); 
      setUser(response.data);
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMe();
    setRefreshing(false);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <SafeAreaView style={styles.global}>
        <View style={styles.clientContainer}>
          <View style={styles.df}>
              <Text style={styles.idNumber}>{user.num_tel}</Text>
              <Image source={require('../assets/images/user.png')} style={{height: SIZES.xxLarge*2, width: SIZES.xxLarge*2}}/>
          </View>
          <View style={[styles.df, {marginTop: SIZES.xxLarge/1.5}]}>
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
        <FormSearch />
      </SafeAreaView>
    </PullToRefresh>
  );
}

export default HomeClient;