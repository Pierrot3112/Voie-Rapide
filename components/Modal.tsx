import React from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import data from '../util/data.json';
import styles from '../styles/ConditionModal.style';

const ConditionModal = () => {
  const conditionData = data.conditions;

  return (
    <ScrollView style={styles.modalContainer}>
      <Text style={styles.titleCondition}>
        Conditions Générales d'Utilisation (CGU)
      </Text>

      <FlatList
        style={{ marginTop: 15 }}
        data={conditionData}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={true} // Permet un défilement fluide
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.title}>
              {item.id}: {item.titre}
            </Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />

      {/* Texts bien enveloppés */}
      <View style={{ marginTop: 20 }}>
        <Text>
          Pour toute question ou réclamation, veuillez contacter notre support
          via l'application ou par e-mail.
        </Text>
        <Text>Dernière mise à jour : Janvier 2025</Text>
      </View>
    </ScrollView>
  );
};

export default ConditionModal;
