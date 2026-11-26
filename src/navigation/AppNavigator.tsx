
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import StudentListScreen from '../screens/students/StudentListScreen';
import StudentDetailScreen from '../screens/students/StudentDetailScreen';
import StudentAddScreen from '../screens/students/StudentAddScreen';
import StudentEditScreen from '../screens/students/StudentEditScreen';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard UKSMate' }} />
        <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: 'Data Siswa' }} />
        <Stack.Screen name="StudentDetail" component={StudentDetailScreen} options={{ title: 'Detail Siswa' }} />
        <Stack.Screen name="StudentAdd" component={StudentAddScreen} options={{ title: 'Tambah Siswa' }} />
        <Stack.Screen name="StudentEdit" component={StudentEditScreen} options={{ title: 'Edit Siswa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
