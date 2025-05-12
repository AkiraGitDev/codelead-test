import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { styles } from './styles';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setIsButtonDisabled(text.trim() === '');
  };

  const handleEnter = async () => {
    try {
      router.push({
        pathname: '/main-screen',
        params: { username }
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <Animated.View 
        style={styles.card}
        entering={FadeInUp.duration(800).springify()}
      >
        <Animated.Text 
          style={styles.title}
          entering={FadeInDown.delay(300).duration(800)}
        >
          Welcome to CodeLeap network!
        </Animated.Text>
        
        <Animated.Text 
          style={styles.label}
          entering={FadeInDown.delay(400).duration(800)}
        >
          Please enter your username
        </Animated.Text>
        
        <Animated.View entering={FadeInDown.delay(500).duration(800)}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={handleUsernameChange}
            placeholder="John doe"
            autoCapitalize="none"
          />
        </Animated.View>
        
        <Animated.View 
          style={styles.buttonContainer}
          entering={FadeInDown.delay(600).duration(800)}
        >
          <TouchableOpacity
            style={[
              styles.button,
              isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled
            ]}
            disabled={isButtonDisabled}
            onPress={handleEnter}
          >
            <Text style={styles.buttonText}>ENTER</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
