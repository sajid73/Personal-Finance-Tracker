import React from 'react';
import { Text, useColorScheme } from 'react-native';

export function ThemedText({ style, ...props }) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';

  return <Text style={[{ color: textColor }, style]} {...props} />;
}