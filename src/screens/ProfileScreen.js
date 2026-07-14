import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { getShopList, createShop, deleteShop } from '../storage/store';

export default function ProfileScreen({ navigation }) {
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadShops);
    return unsubscribe;
  }, [navigation]);

  const loadShops = async () => setShops(await getShopList());

  const handleAdd = async () => {
    if (newShop.trim()) {
      await createShop(newShop.trim());
      setNewShop('');
      loadShops();
    }
  };

  const handleDelete = (shopName) => {
    Alert.alert('Hapus Warung', `Yakin ingin menghapus ${shopName}?`, [
      { text: 'Batal' },
      { text: 'Hapus', style: 'destructive', onPress: async () => {
        await deleteShop(shopName);
        loadShops();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Warung</Text>
      <View style={styles.addSection}>
        <TextInput style={styles.input} placeholder="Nama Warung Baru..." value={newShop} onChangeText={setNewShop} />
        <TouchableOpacity style={styles.btn} onPress={handleAdd}><Text style={{color:'#FFF'}}>Tambah</Text></TouchableOpacity>
      </View>
      
      <FlatList data={shops} keyExtractor={(item) => item} renderItem={({ item }) => (
        <View style={styles.shopItem}>
          {/* Bagian kiri: Untuk Masuk */}
          <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('ManagePrice', { shopName: item })}>
            <Text style={styles.shopName}>{item}</Text>
          </TouchableOpacity>
          
          {/* Bagian kanan: Tombol Hapus */}
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#DDD', padding: 10, borderRadius: 5 },
  addSection: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  btn: { backgroundColor: '#10B981', padding: 10, borderRadius: 5, justifyContent: 'center' },
  shopItem: { 
    padding: 20, 
    backgroundColor: '#F3F4F6', 
    marginBottom: 10, 
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shopName: { fontSize: 18, fontWeight: '600' },
  deleteText: { color: 'red', fontWeight: 'bold' }
});