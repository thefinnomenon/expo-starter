import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
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
  title: {
    fontSize: 50,
  }
});
