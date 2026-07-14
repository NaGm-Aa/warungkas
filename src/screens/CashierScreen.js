import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
  KeyboardAvoidingView, ScrollView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPrices, saveTransaction } from '../storage/store';
import { formatRupiah } from '../utils/format';

export default function CashierScreen({ route, navigation }) {
  const { shopName } = route.params;
  const [prices, setPrices] = useState([]);
  const [cart, setCart] = useState([]);
  const [receivedMoney, setReceivedMoney] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => setPrices(await getPrices(shopName));

  const addToCart = (price) => {
    let newCart = [...cart];
    let index = newCart.findIndex(item => item.price === price);
    if (index > -1) newCart[index].qty += 1;
    else newCart.push({ price, qty: 1 });
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    let newCart = [...cart];
    if (newCart[index].qty > 1) newCart[index].qty -= 1;
    else newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const received = parseInt(receivedMoney) || 0;
  const change = received - total;
  const isInsufficient = received < total || cart.length === 0;

  const handleSave = async () => {
    await saveTransaction(shopName, total, received, change, cart.length);
    setCart([]); 
    setReceivedMoney('');
    Alert.alert('Sukses', 'Transaksi tersimpan!');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{shopName}</Text>
            <View style={{width: 40}} />
          </View>
          
          <Text style={styles.label}>PILIH HARGA ITEM</Text>
          <View style={styles.grid}>{prices.map((p, i) => (
            <TouchableOpacity key={i} style={styles.priceBtn} onPress={() => addToCart(p)}>
              <Text>{formatRupiah(p)}</Text>
            </TouchableOpacity>
          ))}</View>

          <Text style={styles.label}>KERANJANG</Text>
          <View style={styles.cartBox}>
            {/* Mengganti FlatList dengan View.map agar tidak error nested scroll */}
            {cart.length === 0 ? <Text style={styles.textGray}>Belum ada item dipilih</Text> : 
              cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Text>{formatRupiah(item.price)} x {item.qty}</Text>
                  <TouchableOpacity onPress={() => removeFromCart(index)}><Text style={{color:'red'}}>Hapus</Text></TouchableOpacity>
                </View>
              ))
            }
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.label}>UANG PEMBELI</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={receivedMoney} onChangeText={setReceivedMoney} placeholder="Masukkan jumlah uang..." />
            
            <View style={styles.row}>
              <Text>Total Harga:</Text>
              <Text style={styles.val}>{formatRupiah(total)}</Text>
            </View>
            <View style={styles.row}>
              <Text>Kembalian:</Text>
              <Text style={[styles.val, {color: change < 0 ? 'red' : '#10B981'}]}>{formatRupiah(change)}</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.saveBtn, isInsufficient && styles.disabledBtn]} 
              onPress={handleSave} 
              disabled={isInsufficient}
            >
              <Text style={styles.saveBtnText}>Simpan Transaksi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingBottom: 20 },
  header: { backgroundColor: '#10B981', padding: 5, paddingTop:5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { padding: 5 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  label: { paddingHorizontal: 15, paddingTop: 10, fontWeight: 'bold', color: '#6B7280', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, gap: 10, marginTop: 5 },
  priceBtn: { width: '30%', padding: 15, backgroundColor: '#FFF', alignItems: 'center', borderRadius: 8, elevation: 1 },
  cartBox: { minHeight: 120, marginHorizontal: 15, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', borderStyle: 'dashed', padding: 10, marginTop: 5 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  summaryBox: { backgroundColor: '#FFF', padding: 20, marginTop: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 5 },
  input: { borderBottomWidth: 1, borderColor: '#10B981', padding: 5, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  val: { fontWeight: 'bold' },
  textGray: { color: '#9CA3AF', textAlign: 'center', marginTop: 30 },
  saveBtn: { backgroundColor: '#10B981', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  disabledBtn: { backgroundColor: '#D1D5DB' },
  saveBtnText: { color: '#FFF', fontWeight: 'bold' }
});