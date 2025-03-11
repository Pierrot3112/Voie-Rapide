import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import styles from '../../styles/formSerach.style';
import data from '../../util/points.json'; // Assurez-vous que le chemin est correct

// Définir le type des paramètres de navigation
type ItinerairesResultsParams = {
  departureId: number;
  arrivalId: number;
  selectedValue: number;
};

const FormSearch = () => {
  const [departureQuery, setDepartureQuery] = useState('');
  const [arrivalQuery, setArrivalQuery] = useState('');
  const [departureId, setDepartureId] = useState<number | null>(null); // Typage explicite
  const [arrivalId, setArrivalId] = useState<number | null>(null); // Typage explicite
  const [filteredDeparture, setFilteredDeparture] = useState([]);
  const [filteredArrival, setFilteredArrival] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Fonction pour filtrer la liste en fonction de la saisie
  const filterSuggestions = (query, type) => {
    if (!query) {
      if (type === 'departure') setFilteredDeparture([]);
      else setFilteredArrival([]);
      return;
    }

    const filteredData = data.filter(
      (item) =>
        item.nom.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase()),
    );

    if (type === 'departure') setFilteredDeparture(filteredData);
    else setFilteredArrival(filteredData);
  };

  // Fonction de recherche
  const handleSearch = () => {
    if (departureId === null || arrivalId === null) {
      Alert.alert('Erreur', 'Veuillez sélectionner un point de départ et un point d\'arrivée');
      return;
    }

    // Transférer les données du formulaire à ItinerairesResults
    navigation.navigate('ItinerairesResults', {
      departureId: departureId, 
      arrivalId: arrivalId,     
      selectedValue: selectedValue, 
    } as ItinerairesResultsParams);
  };

  return (
    <View style={styles.container}>
      {/* Champ de recherche - Point de départ */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Point de départ"
          value={departureQuery}
          onChangeText={(text) => {
            setDepartureQuery(text);
            filterSuggestions(text, 'departure');
          }}
          style={styles.input}
        />
        {filteredDeparture.length > 0 && (
          <View style={styles.suggestionContainer}>
            <FlatList
              data={filteredDeparture}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setDepartureQuery(`${item.nom} (${item.location})`);
                    setDepartureId(item.id);
                    setFilteredDeparture([]);
                  }}
                >
                  <Text>{item.nom} ({item.location})</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* Champ de recherche - Point d'arrivée */}
      <View style={styles.inputContainer}>
        <TextInput
          label="Point d'arrivée"
          value={arrivalQuery}
          onChangeText={(text) => {
            setArrivalQuery(text);
            filterSuggestions(text, 'arrival');
          }}
          style={styles.input}
        />
        {filteredArrival.length > 0 && (
          <View style={styles.suggestionContainer}>
            <FlatList
              data={filteredArrival}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setArrivalQuery(`${item.nom} (${item.location})`);
                    setArrivalId(item.id);
                    setFilteredArrival([]);
                  }}
                >
                  <Text>{item.nom} ({item.location})</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* Champ de recherche - Type de Recherche */}
      <View style={styles.radioStyle}>
        <RadioButton.Group
          onValueChange={(newValue) => setSelectedValue(parseInt(newValue))}
          value={selectedValue}
        >
          <View style={styles.radioItem}>
            <RadioButton value={0} />
            <Text>Le plus rapide</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value={1} />
            <Text>Le plus court</Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Bouton de recherche */}
      <Button
        mode="contained"
        onPress={handleSearch}
        loading={loading}
        disabled={loading}
        style={styles.btn1}
      >
        {loading ? 'Recherche en cours...' : 'Rechercher'}
      </Button>
    </View>
  );
};

export default FormSearch;