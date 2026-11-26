
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Student } from '../../navigation/types';

import { useStudents } from '../../context/StudentContext';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'StudentEdit'
>;

function StudentEditScreen({ route, navigation }: Props) {
  const { student } = route.params;
  const { students, updateStudent } = useStudents();

  const [nis, setNis] = useState(student.nis);
  const [name, setName] = useState(student.name);
  const [gender, setGender] = useState<'L' | 'P'>(student.gender);
  const [studentClass, setStudentClass] = useState(student.class);
  const [major, setMajor] = useState(student.major);
  const [phone, setPhone] = useState(student.phone);
  const [isActive, setIsActive] = useState(student.is_active);

  const handleUpdate = () => {
    if (!nis.trim() || !name.trim() || !studentClass.trim()) {
      Alert.alert(
        'Data belum lengkap',
        'NIS, nama, dan kelas wajib diisi.',
      );
      return;
    }

    const duplicate = students.some(
      item =>
        item.nis === nis.trim() &&
        item.student_id !== student.student_id,
    );

    if (duplicate) {
      Alert.alert(
        'NIS sudah digunakan',
        'Gunakan NIS yang berbeda.',
      );
      return;
    }

    const updatedStudent: Student = {
      ...student,
      nis: nis.trim(),
      name: name.trim(),
      gender,
      class: studentClass.trim(),
      major: major.trim(),
      phone: phone.trim(),
      is_active: isActive,
    };

    updateStudent(updatedStudent);

    Alert.alert(
      'Berhasil',
      'Data siswa berhasil diperbarui.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>
          Edit Informasi Siswa
        </Text>

        <Text style={styles.label}>NIS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan NIS"
          placeholderTextColor="#94A3B8"
          value={nis}
          onChangeText={setNis}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Nama Lengkap *</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama lengkap"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Jenis Kelamin *</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              gender === 'L' && styles.selectedOption,
            ]}
            onPress={() => setGender('L')}
          >
            <Text
              style={[
                styles.optionText,
                gender === 'L' && styles.selectedOptionText,
              ]}
            >
              Laki-laki
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              gender === 'P' && styles.selectedOption,
            ]}
            onPress={() => setGender('P')}
          >
            <Text
              style={[
                styles.optionText,
                gender === 'P' && styles.selectedOptionText,
              ]}
            >
              Perempuan
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Kelas *</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: X, XI, XII"
          placeholderTextColor="#94A3B8"
          value={studentClass}
          onChangeText={setStudentClass}
        />

        <Text style={styles.label}>Jurusan</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: RPL, TKJ"
          placeholderTextColor="#94A3B8"
          value={major}
          onChangeText={setMajor}
        />

        <Text style={styles.label}>Nomor Telepon</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nomor telepon"
          placeholderTextColor="#94A3B8"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Status Siswa</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              isActive && styles.selectedOption,
            ]}
            onPress={() => setIsActive(true)}
          >
            <Text
              style={[
                styles.optionText,
                isActive && styles.selectedOptionText,
              ]}
            >
              Aktif
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              !isActive && styles.selectedOption,
            ]}
            onPress={() => setIsActive(false)}
          >
            <Text
              style={[
                styles.optionText,
                !isActive && styles.selectedOptionText,
              ]}
            >
              Tidak Aktif
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={handleUpdate}
        >
          <Text style={styles.saveButtonText}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 7,
    marginTop: 13,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    paddingHorizontal: 12,
    color: '#1E293B',
    backgroundColor: '#FFFFFF',
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    padding: 13,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#DBEAFE',
    borderColor: '#1976D2',
  },
  optionText: {
    color: '#64748B',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StudentEditScreen;
