import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, } from 'react-native';
import { TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Student } from '../../navigation/types';
import { useStudents } from '../../context/StudentContext';



type Props = NativeStackScreenProps<RootStackParamList, 'StudentList'>;

function StudentListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const { students } = useStudents();
  const filteredStudents = students.filter(student => {
    const keyword = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(keyword) ||
      student.nis.toLowerCase().includes(keyword)
    );
  });

  const renderStudent = ({ item }: { item: Student }) => (
    <TouchableOpacity style={styles.studentCard} activeOpacity={0.7} onPress={() => navigation.navigate('StudentDetail', {student: item,})}>

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>

        <Text style={styles.studentDetail}>
          NIS: {item.nis}
        </Text>

        <Text style={styles.studentDetail}>
          Kelas: {item.class} {item.major}
        </Text>

        <Text style={styles.studentDetail}>
          Jenis Kelamin: {item.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: item.is_active ? '#DCFCE7' : '#FEE2E2',
          },
        ]}
      >
        <Text
          style={{
            color: item.is_active ? '#15803D' : '#B91C1C',
            fontSize: 11,
            fontWeight: 'bold',
          }}
        >
          {item.is_active ? 'Aktif' : 'Tidak Aktif'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Data Siswa</Text>
        <Text style={styles.subtitle}>
          Kelola data siswa sekolah
        </Text>
      </View>

      <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => navigation.navigate('StudentAdd')}>
        <Text style={styles.addButtonText}>+ Tambah Siswa</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama atau NIS siswa..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />

        <Text style={styles.totalText}>
          Total ditemukan: {filteredStudents.length} siswa
        </Text>

        <FlatList
          data={filteredStudents}
          keyExtractor={item => item.student_id.toString()}
          renderItem={renderStudent}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Data siswa tidak ditemukan.
            </Text>
          }
        />
      </View>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#1E293B',
  },
  totalText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 16,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    elevation: 2,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  studentDetail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 40,
  },
  addButton: {
  backgroundColor: '#1976D2',
  padding: 13,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 14,
  },
  addButtonText: {
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: 14,
  },
});

export default StudentListScreen;
