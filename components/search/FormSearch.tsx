import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import styles from '../../styles/formSerach.style';
import data from '../../util/points.json';

type ItinerairesResultsParams = {
  departureId: number;
  arrivalId: number;
  selectedValue: number;
};

const FormSearch = () => {
  const [departureQuery, setDepartureQuery] = useState('');
  const [arrivalQuery, setArrivalQuery] = useState('');
  const [departureId, setDepartureId] = useState<number | null>(null);
  const [arrivalId, setArrivalId] = useState<number | null>(null);
  const [filteredDeparture, setFilteredDeparture] = useState<any[]>([]);
  const [filteredArrival, setFilteredArrival] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const filterSuggestions = (query: string, type: 'departure' | 'arrival') => {
    if (!query) {
      if (type === 'departure') setFilteredDeparture([]);
      else setFilteredArrival([]);
      return;
    }

    const filteredData = data.filter(
      (item) =>
        item.nom.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );

    if (type === 'departure') setFilteredDeparture(filteredData);
    else setFilteredArrival(filteredData);
  };

  const handleSearch = () => {
    if (departureId === null || arrivalId === null) {
      Alert.alert('Erreur', 'Veuillez sélectionner un point de départ et un point d\'arrivée');
      return;
    }

    navigation.navigate('ItinerairesResults', {
      departureId: departureId,
      arrivalId: arrivalId,
      selectedValue: selectedValue,
    } as ItinerairesResultsParams);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    console.log("Refreshing FormSearch page...");
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* Champs de recherche */}
      <FlatList
        data={[]} // Pas de données à afficher, car nous utilisons FlatList uniquement pour le rafraîchissement
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        ListHeaderComponent={
          <>
            {/* Point de départ */}
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

            {/* Point d'arrivée */}
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

            {/* Type de Recherche */}
            <View style={styles.radioStyle}>
              <RadioButton.Group
                onValueChange={(newValue) => setSelectedValue(parseInt(newValue))}
                value={selectedValue.toString()}
              >
                <View style={styles.radioItem}>
                  <RadioButton value="0" />
                  <Text>Le plus rapide</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="1" />
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
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </View>
  );
};

export default FormSearch;
