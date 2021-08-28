import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Sentry, { initSentry } from '@/services/sentry';
import { SomeUtility } from '@/utilities/test';

initSentry(true);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>process.env.NODE_ENV: {process.env.NODE_ENV}</Text>
      <Text>process.env.NAME: {process.env.NAME}</Text>
      <Text>Path Alias: {SomeUtility()}</Text>
      <Button title='Press to cause error!' onPress={() => Sentry.captureException(new Error('Oops!'))}/>
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
