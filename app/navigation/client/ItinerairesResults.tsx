import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../config/AxioConfig'; // Importer la config Axios
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants';

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
};



const ItinerairesResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { departureId, arrivalId, selectedValue } = route.params as ItinerairesResultsParams; // Appliquer le type
  const [results, setResults] = useState<ItineraireResult[]>([]); // Typage explicite
  const [loading, setLoading] = useState(true);

  // Fonction pour faire l'appel à l'API
  const fetchResults = async () => {
    try {
      const response = await api.post<ItineraireResult[]>('/get_itineraire', {
        id_depart: departureId,
        id_arrive: arrivalId,
        type_rec: selectedValue,
      });
      console.log('Réponse de l\'API:', response.data); // Ajouter un log pour vérifier la réponse
      setResults(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des résultats');
    } finally {
      setLoading(false);
    }
  };

  // Appeler l'API au chargement du composant
  useEffect(() => {
    fetchResults();
  }, []);

  // Filtrer les résultats invalides
  const validResults = results.filter((item) => item && item.itineraires_id !== undefined);

  return (
    <SafeAreaView style={styles.container}>
      {/* Bouton Retour */}
      <View style={styles.backButton}>
        <TouchableOpacity
        style={{flex: 1}}
          onPress={() => navigation.goBack()} // Revenir à l'écran précédent (HomeClient)
        >
          <Ionicons  name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={[styles.titlePage, {flex: 3}]}>Itineraires</Text>
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
              <Ionicons name='car' style={{flex: 1}} size={30} color={COLORS.bgBlue} />
              <View style={{flex: 4}}>
                <Text style={styles.title}>Itinéraire ID: {item.itineraires_id}</Text>
                <Text style={styles.distance}>Distance: {item.distance} km</Text>
                <Text style={styles.duration}>Durée: {item.somme_duree_trajection} min</Text>
                <Text style={styles.connections}>Connections: {item.connections.length}</Text>
              </View>
              <Ionicons name="arrow-forward" style={{flex: 1}} size={30} />
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
    padding: 16,
    backgroundColor: COLORS.gray2
  },
  titlePage: {
    textAlign: 'left',
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold'
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
  },
  item: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: COLORS.primary,
    marginBottom: 20,
    borderRadius: 20

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  connections: {
    fontSize: 14,
    color: '#666',
  },
  backButton: {
    display: 'flex',
    flexDirection: "row",
    marginBottom: 16,
    padding: 'auto',
    backgroundColor: '#000000af',
    borderRadius: 20,
    alignItems: 'center',
    height: 30,
  },
  backButtonText: {
    height: '80%',
    width: 25,
    marginLeft: 3,
    padding: 'auto',
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    color: COLORS.black,
    fontSize: 18,
    backgroundColor: COLORS.primary,
    borderRadius: 50
  },
});

export default ItinerairesResults;