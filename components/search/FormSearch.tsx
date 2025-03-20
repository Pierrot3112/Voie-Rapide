import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import styles from '../../styles/formSerach.style';
import data from '../../util/points.json';
import { COLORS } from '../../constants';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: "Veuillez sélectionner un point de départ et un point d'arrivée",
        position: 'top', 
      });
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
      <FlatList
        data={[]} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={
          <>
            {/* Point de départ */}
            <View style={styles.inputContainer}>
              <TextInput
                label="Point de départ"
                textColor={COLORS.secondary}
                onChangeText={(text) => {
                  setDepartureQuery(text);
                  filterSuggestions(text, 'departure');
                }}
                style={styles.input}
              />
              <Text>{departureQuery}</Text>
              {filteredDeparture.length > 0 && (
                <View style={styles.suggestionContainer}>
                  <FlatList
                    data={filteredDeparture}
                    keyExtractor={(item) => item.id.toString()}
                    keyboardShouldPersistTaps="always"
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        onPress={() => {
                          setDepartureQuery(`${item.nom} (${item.location})`);
                          setDepartureId(item.id);
                          setFilteredDeparture([]);
                        }}
                      >
                        <Text style={{ color: COLORS.bgBlue }}>
                          {item.nom} ({item.location})
                        </Text>
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
                textColor={COLORS.secondary}
                onChangeText={(text) => {
                  setArrivalQuery(text);
                  filterSuggestions(text, 'arrival');
                }}
                style={styles.input}
              />
              <Text>{arrivalQuery}</Text>
              {filteredArrival.length > 0 && (
                <View style={styles.suggestionContainer}>
                  <FlatList
                    data={filteredArrival}
                    keyExtractor={(item) => item.id.toString()}
                    keyboardShouldPersistTaps="always"
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        onPress={() => {
                          setArrivalQuery(`${item.nom} (${item.location})`);
                          setArrivalId(item.id);
                          setFilteredArrival([]);
                        }}
                      >
                        <Text style={{ color: COLORS.bgBlue }}>
                          {item.nom} ({item.location})
                        </Text>
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
                <View>
                  <TouchableOpacity 
                    style={styles.radioItem} 
                    onPress={() => setSelectedValue(0)}
                    activeOpacity={0.7}
                  >
                    <RadioButton 
                      value="0"
                      color={COLORS.secondary} 
                      status={selectedValue === 0 ? "checked" : "unchecked"}
                      onPress={() => setSelectedValue(0)}
                    />
                    <Text style={{ color: COLORS.secondary }}>Le plus rapide</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity 
                    style={styles.radioItem} 
                    onPress={() => setSelectedValue(1)}
                    activeOpacity={0.7}
                  >
                    <RadioButton 
                      value="1"
                      color={COLORS.secondary} 
                      status={selectedValue === 1 ? "checked" : "unchecked"}
                      onPress={() => setSelectedValue(1)}
                    />
                    <Text style={{ color: COLORS.secondary }}>Le plus court</Text>
                  </TouchableOpacity>
                </View>
              </RadioButton.Group>
            </View>

            {/* Bouton de recherche */}
            <TouchableOpacity
              onPress={handleSearch}
              disabled={loading}
              style={styles.btn1}
            >
              <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>
                {loading ? 'Recherche en cours...' : 'Rechercher'}
              </Text>
            </TouchableOpacity>
          </>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default FormSearch;
