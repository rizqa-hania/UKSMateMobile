import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useStudents } from '../../context/StudentContext';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'StudentDetail'
>;

function StudentDetailScreen({ route, navigation }: Props) {
  const { student: routeStudent } = route.params;
  const { students, deleteStudent } = useStudents();

  const student =
    students.find(
      item => item.student_id === routeStudent.student_id,
    ) ?? routeStudent;

  const handleDelete = () => {
  Alert.alert(
    'Hapus Data Siswa',
    `Apakah kamu yakin ingin menghapus ${student.name}?`,
    [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          deleteStudent(student.student_id);
          navigation.goBack();
        },
      },
    ],
  );
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.nis}>
          NIS: {student.nis}
        </Text>

        <View style={[
            styles.statusBadge,
            {
              backgroundColor: student.is_active
                ? '#DCFCE7'
                : '#FEE2E2',
            },
          ]} >
          <Text
            style={{
              color: student.is_active ? '#15803D' : '#B91C1C',
              fontWeight: 'bold',
              fontSize: 12,
            }}
          >
            {student.is_active ? 'Aktif' : 'Tidak Aktif'}
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          Informasi Siswa
        </Text>
        <InfoRow label="NIS" value={student.nis} />
        <InfoRow label="Nama Lengkap" value={student.name} />
        <InfoRow label="Jenis Kelamin" value={student.gender === 'L' ? 'Laki-laki' : 'Perempuan'} />
        <InfoRow label="Kelas" value={`${student.class} ${student.major}`} />
        <InfoRow label="Nomor Telepon" value={student.phone || '-'} />
        <InfoRow label="Status" value={student.is_active ? 'Aktif' : 'Tidak Aktif'} />
      </View>

      <TouchableOpacity style={styles.editButton} activeOpacity={0.8} 
      onPress={() => navigation.navigate('StudentEdit', { student })}>
        <Text style={styles.editButtonText}>
            Edit Data Siswa
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8}
      onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>
            Hapus Data Siswa
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

function InfoRow({ label, value }: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
    margin: 16,
    borderRadius: 14,
    elevation: 2,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  nis: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 14,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  infoRow: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  editButton: {
  backgroundColor: '#1976D2',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginHorizontal: 16,
  marginBottom: 25,
  },
  editButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
  },
  deleteButton: {
  backgroundColor: '#DC2626',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginHorizontal: 16,
  marginBottom: 25,
 },
 deleteButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
 },
});

export default StudentDetailScreen;