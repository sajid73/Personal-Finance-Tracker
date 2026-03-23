import React from 'react';
import { View, useColorScheme, StyleSheet } from 'react-native';

export function ThemedView({ style, ...props }) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';

  return <View style={[{ backgroundColor }, style]} {...props} />;
}