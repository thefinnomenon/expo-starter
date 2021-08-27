import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SomeUtility } from '@/utilities/test';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>process.env.NODE_ENV: {process.env.NODE_ENV}</Text>
      <Text>process.env.NAME: {process.env.NAME}</Text>
      <Text>Path Alias: {SomeUtility()}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
