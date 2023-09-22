import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const CountryInfo = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState({});
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
        }));

        countries.sort((a, b) => a.name.localeCompare(b.name));
        setCountryList(countries);
      } catch (error) {
        console.error('Erro ao buscar a lista de países:', error);
      }
    };

    fetchCountryList();
  }, []);

  const getCountryInfo = async () => {
    try {
      if (selectedCountry) {
        setLoading(true);
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${selectedCountry}`);
        setCountryData(response.data[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar informações do país:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Informações do País</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
        >
          <Picker.Item label="Selecione um país" value="" />
          {countryList.map((country) => (
            <Picker.Item key={country.code} label={country.name} value={country.code} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={getCountryInfo} disabled={!selectedCountry}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <View style={styles.countryInfo}>
          <Text style={styles.countryName}>{countryData.name?.common}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sigla:</Text>
            <Text style={styles.infoText}>{selectedCountry}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Capital:</Text>
            <Text style={styles.infoText}>{countryData.capital}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>População:</Text>
            <Text style={styles.infoText}>{countryData.population}</Text>
          </View>
          {countryData.flags && (
            <View style={styles.flagContainer}>
              <Text style={styles.flagText}>Bandeira do País</Text>
              <Image
                source={{ uri: countryData.flags.png }}
                style={styles.flagImage}
              />
            </View>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.goBackButtonText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#3498db',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#e74c3c', // Cor do botão alterada
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  countryInfo: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  countryName: {
    fontSize: 28,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 24,
    color: '#333',
    marginRight: 10,
  },
  infoText: {
    fontSize: 24,
    color: '#333',
  },
  flagContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  flagText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  flagImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: 'black', // Cor da borda da bandeira alterada
    borderRadius: 10,
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CountryInfo;
