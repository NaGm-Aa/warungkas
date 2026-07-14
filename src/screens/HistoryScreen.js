import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHistory } from '../storage/store';
import { formatRupiah } from '../utils/format';

export default function HistoryScreen({ route }) {
  const { shopName } = route.params;
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [shopName])
  );

  const loadHistory = async () => {
    const data = await getHistory(shopName);
    setHistory(data);
  };

  const totalIncome = history.reduce((sum, tx) => sum + tx.total, 0);

  return (
    <View style={styles.container}>
      {/* Bagian Statistik */}
      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Total Transaksi</Text>
          <Text style={styles.bigVal}>{history.length}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Total Pemasukan</Text>
          <Text style={styles.bigVal}>{formatRupiah(totalIncome)}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>RIWAYAT TRANSAKSI</Text>
      
      {/* Daftar Riwayat */}
      <FlatList 
        data={history} 
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.totalText}>{formatRupiah(item.total)}</Text>
              <Text style={styles.changeText}>kembalian: {formatRupiah(item.change)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada riwayat transaksi</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },
  statsContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  card: { flex: 1, backgroundColor: '#FFF', padding: 15, borderRadius: 10, elevation: 2 },
  bigVal: { fontSize: 18, fontWeight: 'bold', color: '#10B981', marginTop: 5 },
  label: { fontSize: 12, color: '#6B7280' },
  sectionHeader: { fontWeight: 'bold', marginBottom: 10, color: '#374151' },
  item: { padding: 20, backgroundColor: '#FFF', marginBottom: 5, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateText: { color: '#6B7280', fontSize: 14 },
  totalText: { fontWeight: 'bold', color: '#10B981', fontSize: 16 },
  changeText: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#9CA3AF' }
});