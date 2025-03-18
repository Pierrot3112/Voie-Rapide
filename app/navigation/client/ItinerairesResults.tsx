import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../config/AxioConfig'; // Importer la config Axios
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants';
import Toast from 'react-native-toast-message';
import Header from '../../../components/Header';

const { width, height } = Dimensions.get('window');

// Définir le type des paramètres de navigation
type ItinerairesResultsParams = {
  departureId: number;
  arrivalId: number;
  selectedValue: number;
};

// Définir le type des résultats de l'API
type ItineraireResult = {
  arrivee_nom: string;
  depart_nom: string;
  distance: number;
  id_arrive: number;
  id_depart: number;
  itineraires_id: number;
  somme_duree_trajection: number;
  connections: any[];
  en_passant: string;
};

const ItinerairesResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { departureId, arrivalId, selectedValue } = route.params as ItinerairesResultsParams;
  const [results, setResults] = useState<ItineraireResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour faire l'appel à l'API
  const fetchResults = useCallback(async () => {
    try {
      const response = await api.post<ItineraireResult[]>('/get_itineraire', {
        id_depart: departureId,
        id_arrive: arrivalId,
        type_rec: selectedValue,
      });
      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Infos',
        text2: 'Aucun itinéraire trouvé!'
      });
    } finally {
      setLoading(false);
    }
  }, [departureId, arrivalId, selectedValue]);

  // Appeler l'API au chargement du composant
  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // Filtrer les résultats invalides
  const validResults = results.filter((item) => item && item.itineraires_id !== undefined);

  return (
    <SafeAreaView style={styles.container}>
      {/* Bouton Retour */}
      <Header />
      <View style={styles.backButton}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={[styles.titlePage, { flex: 3, color: COLORS.primary }]}>Itinéraires {selectedValue === 0 ? 'Le plus rapide' : 'Le plus court'}</Text>
      </View>

      {/* Afficher les résultats */}
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <>
          {/* Bloc 1 : Départ et Arrivée */}
          {validResults.length > 0 && (
            <View style={styles.block}>
              <Text style={styles.blockTitle}><Ionicons name="location-sharp" size={16} color={COLORS.primary} />    {validResults[0].depart_nom}</Text>
              <Text style={styles.blockTitle}><Ionicons name="flag" size={16} color={COLORS.primary} />    {validResults[0].arrivee_nom}</Text>
            </View>
          )}

          {/* ScrollView pour le reste des informations */}
          <ScrollView style={styles.scrollView}>
            {validResults.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => navigation.navigate('DetailsItinerairesResults', { itinerairesId: item.itineraires_id })}
              >
                <Ionicons name="car" style={styles.icon} size={30} color={COLORS.bgBlue} />
                <View style={styles.itemContent}>
                  <Text style={styles.title}>En passant : {item.en_passant}</Text>
                  <Text style={styles.distance}>Distance: {item.distance} km</Text>
                  <Text style={styles.duration}>Durée: {item.somme_duree_trajection} min</Text>
                </View>
                <Ionicons name="arrow-forward" style={styles.arrowIcon} size={30} color={COLORS.gray2} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
  },
  titlePage: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  block: {
    padding: 16,
    backgroundColor: COLORS.yellow,
    marginBottom: 16,
    marginHorizontal: '2%',
    borderRadius: height*0.02
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingTop: 1,
    paddingBottom: height * 0.5,
    marginBottom: 70,
    marginHorizontal: '2%',
    gap: 10
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    borderRadius: 20,
  },
  itemContent: {
    flex: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: COLORS.gray2,
    borderRadius: 10,
    marginBottom: 3,
    color: COLORS.primary,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  icon: {
    flex: 1,
  },
  arrowIcon: {
    flex: 1,
    paddingLeft: 10,
    textAlign: 'right',
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    height: 40,
  },
});

export default ItinerairesResults;
