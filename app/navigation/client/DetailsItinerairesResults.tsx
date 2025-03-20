import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import { useNavigation } from '@react-navigation/native';
import api from '../../../config/AxioConfig';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../../components/Header';
import { COLORS } from '../../../constants';

const { width, height } = Dimensions.get('window');

type DetailsItinerairesChoisiParams = {
  itinerairesId: number;
};

const formatDuration = (minutes: number) => {
  const totalSeconds = Math.round(minutes * 60);
  
  if (totalSeconds < 60) {
    return `${totalSeconds} s`;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  if (remainingMinutes > 0 || hours > 0) {
    formattedDuration += `${remainingMinutes}min `;
  }
  if (remainingSeconds > 0 || (remainingMinutes === 0 && hours === 0)) {
    formattedDuration += `${remainingSeconds}s`;
  }

  return formattedDuration.trim();
};


const DetailItineraireScreen = ({ route }) => {
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
      moment.locale('fr');
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
      <Header />
      <View style={styles.appBar}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={[styles.appBarTitle, { flex: 5 }]}>Détail de l'itinéraire choisi </Text>
      </View>
      <View style={styles.itineraireContainer}>
        <Text style={styles.itineraireText}>Départ : {itineraireDetails?.depart_nom}</Text>
        <Text style={styles.itineraireText}>Arrivée : {itineraireDetails?.arrivee_nom}</Text>
        <Text style={styles.itineraireText}>Distance :  {itineraireDetails?.distance} km</Text>
        <Text style={styles.itineraireText}>
          Temps :     {Number(itineraireDetails?.somme_duree_trajection).toFixed(0)} min
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {itineraireDetails?.connections?.map((connection, index) => (
          <View key={index} style={styles.connectionContainer}>
            <View style={styles.connectionHeader}>
              <Ionicons name="location-sharp" size={28} color="white" />
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
                Temps :  {formatDuration(connection.last_information.estimation)}
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
        <View style={styles.connectionContainer}>
          <View style={styles.connectionHeader}>
            <Ionicons name="location-sharp" size={24} color="white" />
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
    paddingTop: height * 0.03,
    flex: 1,
    backgroundColor: COLORS.gray2,
  },
  appBar: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    padding: width * 0.0001,
    borderRadius: 20,
    alignItems: 'center',
    height: height * 0.06,
    marginHorizontal: width * 0.03,
  },
  appBarTitle: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  content: {
    padding: width * 0.04,
    paddingBottom: 70,
  },
  itineraireContainer: {
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
    padding: width * 0.03,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  itineraireText: {
    fontSize: width * 0.035,
    color: 'white',
    marginBottom: height * 0.005,
  },
  connectionContainer: {
    marginBottom: height * 0.01,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.005,
  },
  locationBadge: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    marginLeft: width * 0.02,
  },
  locationBadgeText: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: 'black',
  },
  connectionDetails: {
    marginLeft: width * 0.03,
    borderLeftWidth: 5,
    padding: width * 0.02,
    paddingLeft: width * 0.07,
    height: height * 0.2,
    justifyContent: 'center',
  },
  connectionText: {
    fontSize: width * 0.04,
    color: 'white',
    marginBottom: height * 0.005,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgBlue
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.04,
  },
});