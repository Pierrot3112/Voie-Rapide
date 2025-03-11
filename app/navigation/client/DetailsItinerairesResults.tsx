import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import { useNavigation } from '@react-navigation/native';
import api from '../../../config/AxioConfig'; // Remplacez ApiService par AxiosConfig
import { Ionicons } from '@expo/vector-icons';

// Définir le type des paramètres de navigation
type DetailsItinerairesChoisiParams = {
  itinerairesId: number;
};

const DetailItineraireScreen = ({ route }) => {
  // Récupère l'ID transmis en paramètre de la route
  const { itinerairesId } = route.params as DetailsItinerairesChoisiParams;
  const navigation = useNavigation();

  const [itineraireDetails, setItineraireDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchItineraireDetails();
  }, []);

  const fetchItineraireDetails = async () => {
    try {
      const response = await api.get(`/itineraire/${itinerairesId}`);
      setItineraireDetails(response.data);
      moment.locale('fr'); // Active la locale française pour le formatage des dates
    } catch (error) {
      setErrorMessage(`Erreur lors de la récupération des données : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateTimeString?: string) => {
    if (!dateTimeString) return 'Date inconnue';
    return moment(dateTimeString).format('D MMMM à HH:mm');
  };

  const getTrafficIcon = (color?: string) => {
    switch (color?.toUpperCase()) {
      case 'VERT':
        return '🟩 (fluide)';
      case 'ORANGE':
        return '🟧 (moyen)';
      case 'ROUGE':
        return '🟥 (bouché)';
      default:
        return '⚪ (inconnu)';
    }
  };

  const getBorderColor = (color?: string) => {
    switch (color?.toUpperCase()) {
      case 'VERT':
        return 'green';
      case 'ORANGE':
        return 'orange';
      case 'ROUGE':
        return 'red';
      default:
        return 'white';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Remplacement de l'AppBar */}
      <View style={styles.appBar}>
           <TouchableOpacity
              style={{flex: 1}}
              onPress={() => navigation.goBack()} // Revenir à l'écran précédent (HomeClient)
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
        <Text style={[styles.appBarTitle, {flex: 3}]}>Itinéraires</Text>
      </View>
        {/* Bloc d'informations de l'itinéraire */}
        <View style={styles.itineraireContainer}>
          <Text style={styles.itineraireText}>Départ : {itineraireDetails?.depart_nom}</Text>
          <Text style={styles.itineraireText}>Arrivée : {itineraireDetails?.arrivee_nom}</Text>
          <Text style={styles.itineraireText}>Distance : {itineraireDetails?.distance} km</Text>
          <Text style={styles.itineraireText}>
            Temps : {Number(itineraireDetails?.somme_duree_trajection).toFixed(0)} min
          </Text>
        </View>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Liste des connexions */}
        {itineraireDetails?.connections?.map((connection, index) => (
          <View key={index} style={styles.connectionContainer}>
            <View style={styles.connectionHeader}>
              {/* Icône de localisation (ici remplacée par un emoji) */}
              <Ionicons name='location-sharp' size={28} color="white" />
              <View style={styles.locationBadge}>
                <Text style={styles.locationBadgeText}>{connection.point_depart_nom}</Text>
              </View>
            </View>
            <View
              style={[
                styles.connectionDetails,
                { borderLeftColor: getBorderColor(connection.last_information?.couleur) },
              ]}
            >
              <Text style={styles.connectionText}>Distance : {connection.distance} km</Text>
              <Text style={styles.connectionText}>
                Temps : {connection.last_information ? Number(connection.last_information.estimation).toFixed(0) : 'N/A'} min
              </Text>
              <Text style={styles.connectionText}>
                Trafic : {getTrafficIcon(connection.last_information?.couleur)}
              </Text>
              <Text style={styles.connectionText}>
                Date : {formatDate(connection.last_information?.datetime)}
              </Text>
              <Text style={styles.connectionText}>
                Note : {connection.last_information?.description}
              </Text>
            </View>
          </View>
        ))}

        {/* Dernier point avec le nom de l'arrivée */}
        <View style={styles.connectionContainer}>
          <View style={styles.connectionHeader}>
            <Ionicons name='location-sharp' size={24} color="white" />
            <View style={styles.locationBadge}>
              <Text style={styles.locationBadgeText}>{itineraireDetails?.arrivee_nom}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailItineraireScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'blue',
  },
  appBar: {
    display: 'flex',
    flexDirection: "row",
    marginBottom: 16,
    padding: 'auto',
    backgroundColor: '#000000af',
    borderRadius: 20,
    alignItems: 'center',
    height: 30,
    marginHorizontal: 12
  },
  appBarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  itineraireContainer: {
    backgroundColor: 'green',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  itineraireText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  connectionContainer: {
    marginBottom: 10,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationIcon: {
    fontSize: 20,
    color: 'white',
  },
  locationBadge: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
  },
  locationBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  connectionDetails: {
    marginLeft: 13,
    borderLeftWidth: 5,
    padding: 8,
    paddingLeft: 30,
    height: 150,
    justifyContent: 'center',
  },
  connectionText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold', 
    fontSize: 16
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
