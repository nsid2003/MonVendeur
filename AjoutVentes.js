import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

export function AjoutVentes() {
  const database = SQLite.openDatabase('vente.db');
  const [vente, setVente] = useState('');
  const [quantite, setQuantite] = useState('');
  const [prixUnitaire, setPrixUnitaire] = useState('');
  const [date, setDate] = useState('');

  const insertVente = (nom, quantite, prix_unitaire, prix_total, ladate) => {
    database.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO vente(nom, quantite, prix_unitaire, prix_total, ladate) VALUES(?,?,?,?,?)",
        [nom, quantite, prix_unitaire, prix_total, ladate],
        (tx, result) => console.log('Les données ont été insérées avec succès!'),
        (error) => console.log('Erreur! Données non insérées!')
      );
    });
  };

  function CreateTable() {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS vente(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nom TEXT,
          quantite INTEGER,
          prix_unitaire REAL,
          prix_total REAL,
          ladate DATE

        )`,
        [],
        (tx, result) => console.log('table créée avec succès !'),
        (error) => console.log('erreur lors de la creation de la table!', error)
      );
    });
  }

  useEffect(() => {
    CreateTable();
  }, []);

  return (
    <ImageBackground source={require('./fond.jpg')} style={Styles.backgroundImage}>
      <View style={Styles.contenair}>
        <Text style={Styles.titre}> MonVendeur </Text>
        <MaterialCommunityIcons name="cash-register" size={36} color="black" />
        <View style={{height:200}}/>

        <View style={Styles.row}>
          <Text style={Styles.label}>Nom produit</Text>
          <TextInput
            style={Styles.input}
            value={vente}
            onChangeText={(text) => setVente(text)}
          />
        </View>

        <View style={Styles.row}>
          <Text style={Styles.label}>Quantité</Text>
          <TextInput
            style={Styles.input}
            value={quantite}
            onChangeText={(text) => setQuantite(text)}
          />
        </View>

        <View style={Styles.row}>
          <Text style={Styles.label}>Prix unitaire</Text>
          <TextInput
            style={Styles.input}
            value={prixUnitaire}
            onChangeText={(text) => setPrixUnitaire(text)}
          />
        </View>

        <View style={Styles.row}>
          <Text style={Styles.label}>Date</Text>
          <TextInput
            placeholder="dd/mm/yyyy"
            style={Styles.input}
            value={date}
            onChangeText={(text) => setDate(text)}
          />
        </View>

        <TouchableOpacity
          style={Styles.button}
          onPress={() => {
            let pt = parseFloat(prixUnitaire) * parseFloat(quantite);
            insertVente(vente, quantite, prixUnitaire, pt);
            setPrixUnitaire('');
            setQuantite('');
            setVente('');
            alert('Vente enregistrée avec succès !');
          }}>
          <Text style={Styles.buttonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const Styles = StyleSheet.create({
  contenair: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  backgroundImage:{
    flex:1,
    resizeMode:'cover'
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },
  label: {
    fontWeight: 'bold',
    marginRight:10,
    width:100
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding:10,
    flex:1
  },
  button:{
    backgroundColor:'#4CAF50',
    paddingVertical:12,
    paddingHorizontal:25,
    borderRadius:4,
    marginTop:10
  },
  buttonText:{
    color:'#fff',
    fontSize:18
  }
});