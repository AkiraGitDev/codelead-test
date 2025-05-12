import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { styles } from './styles';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setIsButtonDisabled(text.trim() === '');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to CodeLeap network!</Text>
        
        <Text style={styles.label}>Please enter your username</Text>
        
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="John doe"
          autoCapitalize="none"
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled
            ]}
            disabled={isButtonDisabled}
            onPress={() => console.log('Username:', username)}
          >
            <Text style={styles.buttonText}>ENTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
