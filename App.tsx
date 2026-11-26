import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StudentProvider } from './src/context/StudentContext';

import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StudentProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F5F7FA"
        />

        <AppNavigator />
      </StudentProvider>
    </SafeAreaProvider>
  );
}
export default App;