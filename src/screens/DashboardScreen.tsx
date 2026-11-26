
import React from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>UKSMate</Text>
        <Text style={styles.headerSubtitle}>
          Sistem Informasi Unit Kesehatan Sekolah
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Dashboard</Text>
        <Text style={styles.description}>
          Selamat datang di sistem informasi UKS.
        </Text>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#EAF2FF' }]}>
            <Text style={styles.statNumber}>320</Text>
            <Text style={styles.statLabel}>Total Siswa</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#E8F8F1' }]}>
            <Text style={[styles.statNumber, { color: '#059669' }]}>12</Text>
            <Text style={styles.statLabel}>Kunjungan Hari Ini</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F3EFFF' }]}>
            <Text style={[styles.statNumber, { color: '#8B5CF6' }]}>150</Text>
            <Text style={styles.statLabel}>Total Stok</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#FFF5E5' }]}>
            <Text style={[styles.statNumber, { color: '#D97706' }]}>3</Text>
            <Text style={styles.statLabel}>Hampir Kedaluwarsa</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Menu Utama</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuCard} activeOpacity={0.7} onPress={() => navigation.navigate('StudentList')}>
          <Text style={styles.menuIcon}>👥</Text>
          <Text style={styles.menuTitle}>Data Siswa</Text>
        </TouchableOpacity>

          <View style={styles.menuCard}>
            <Text style={styles.menuIcon}>📋</Text>
            <Text style={styles.menuTitle}>Kunjungan UKS</Text>
          </View>

          <View style={styles.menuCard}>
            <Text style={styles.menuIcon}>📦</Text>
            <Text style={styles.menuTitle}>Inventaris</Text>
          </View>

          <View style={styles.menuCard}>
            <Text style={styles.menuIcon}>📊</Text>
            <Text style={styles.menuTitle}>Laporan</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  statLabel: {
    fontSize: 12,
    color: '#475569',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 14,
    marginBottom: 14,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
  },
  menuIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
});

export default DashboardScreen;
