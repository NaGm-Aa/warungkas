import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { getPrices, savePrices } from '../storage/store';
import { formatRupiah } from '../utils/format';

export default function ManagePriceScreen({ navigation, route }) {
  const { shopName } = route.params; 
  const [prices, setPrices] = useState([]);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    const data = await getPrices(shopName);
    setPrices(data);
  };

  const handleAddPrice = async () => {
    const priceNum = parseInt(newPrice);
    if (!priceNum || priceNum <= 0) return Alert.alert('Error', 'Masukkan harga yang valid!');
    if (prices.includes(priceNum)) return Alert.alert('Info', 'Harga ini sudah ada!');

    const updatedPrices = [...prices, priceNum].sort((a, b) => a - b);
    setPrices(updatedPrices);
    await savePrices(shopName, updatedPrices);
    setNewPrice('');
  };

  // Fungsi untuk hapus harga
  const deletePrice = async (priceToDelete) => {
    const updatedPrices = prices.filter(p => p !== priceToDelete);
    setPrices(updatedPrices);
    await savePrices(shopName, updatedPrices);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.shopTitle}>Warung: {shopName}</Text>
      
      <Text style={styles.sectionHeader}>TAMBAH HARGA BARU</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="cth: 1500" 
          keyboardType="numeric" 
          value={newPrice} 
          onChangeText={setNewPrice} 
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPrice}>
          <Text style={styles.addButtonText}>Tambah</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>DAFTAR HARGA</Text>
      <FlatList
        data={prices}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.priceItem}>
            <Text style={styles.priceText}>{formatRupiah(item)}</Text>
            {/* Tombol Hapus */}
            <TouchableOpacity onPress={() => deletePrice(item)}>
              <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.mainButton} 
        onPress={() => navigation.navigate('MainApp', { shopName })}
      >
        <Text style={styles.mainButtonText}>Mulai Transaksi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  shopTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#10B981' },
  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#6B7280', marginTop: 10 },
  inputContainer: { flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 10 },
  input: { flex: 1, borderBottomWidth: 1, borderColor: '#10B981', padding: 5 },
  addButton: { backgroundColor: '#10B981', padding: 10, borderRadius: 5, paddingHorizontal: 20 },
  addButtonText: { color: '#FFF', fontWeight: 'bold' },
  // Perubahan pada priceItem agar tombol berada di sebelah kanan
  priceItem: { 
    padding: 15, 
    backgroundColor: '#F3F4F6', 
    marginBottom: 5, 
    borderRadius: 8, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  priceText: { fontSize: 16 },
  deleteText: { color: 'red', fontWeight: 'bold' },
  mainButton: { backgroundColor: '#10B981', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  mainButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});