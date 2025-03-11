import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import data from '../../util/credit.json'; // Importez votre fichier JSON

const SelectCredit = () => {
  const [visible, setVisible] = useState(false); // Contrôle la visibilité du menu
  const [selectedValue, setSelectedValue] = useState(data[0].id); // Initialisez avec le premier ID
  const [selectedLabel, setSelectedLabel] = useState(data[0].name); // Initialisez avec le premier nom

  return (
    <Provider>
      <View>
        {/* Bouton pour ouvrir le menu */}
        <TouchableOpacity
          onPress={() => setVisible(true)} // Ouvre le menu
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#f0f0f0',
            borderRadius: 5,
          }}
        >
          <Text>{selectedLabel}</Text> {/* Affiche l'option sélectionnée */}
        </TouchableOpacity>

        {/* Menu déroulant */}
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)} // Ferme le menu
          anchor={
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{ opacity: 0 }} // Ancre invisible
            >
              <Text>{selectedLabel}</Text>
            </TouchableOpacity>
          }
          contentStyle={{ backgroundColor: 'white', marginTop: 10 }} // Style du menu
        >
          {data.map((item) => (
            <Menu.Item
              key={item.id}
              onPress={() => {
                setSelectedValue(item.id); // Met à jour la valeur sélectionnée
                setSelectedLabel(item.name); // Met à jour le texte affiché
                setVisible(false); // Ferme le menu
              }}
              title={item.name} // Affiche le nom de l'option
              titleStyle={{ color: 'black' }} // Style du texte des options
            />
          ))}
        </Menu>
      </View>
    </Provider>
  );
};

export default SelectCredit;