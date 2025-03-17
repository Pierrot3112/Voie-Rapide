import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../config/AxioConfig'; // Importer la config Axios
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants';
import Toast from 'react-native-toast-message';

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
      <View style={styles.backButton}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={[styles.titlePage, { flex: 3 }]}>Itinéraires</Text>
      </View>

      {/* Afficher les résultats */}
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <>
          {/* Bloc 1 : Départ et Arrivée */}
          {validResults.length > 0 && (
            <View style={styles.block}>
              <Text style={styles.blockTitle}>Départ: {validResults[0].depart_nom}</Text>
              <Text style={styles.blockTitle}>Arrivée: {validResults[0].arrivee_nom}</Text>
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
                <Ionicons name="arrow-forward" style={styles.arrowIcon} size={30} />
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
    paddingHorizontal: '5%',
    backgroundColor: COLORS.gray2,
  },
  titlePage: {
    textAlign: 'left',
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  block: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingTop: 1,
    paddingBottom: height * 0.5,
    marginBottom: 70
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.primary,
    marginBottom: 20,
    borderRadius: 20,
  },
  itemContent: {
    flex: 4,
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: COLORS.green,
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
    marginBottom: 16,
    paddingVertical: 8,
    backgroundColor: '#000000af',
    borderRadius: 20,
    alignItems: 'center',
    height: 40,
  },
});

export default ItinerairesResults;
