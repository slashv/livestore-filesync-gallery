import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useAuth } from './AuthProvider'

export function LoginScreen() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setIsLoading(true)

    const result = await signIn(email, password)

    if (result.error) {
      setError(result.error.message)
    }
    setIsLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>todos</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Sign In</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            testID="email-input"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="test1@example.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            testID="password-input"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        {error ? (
          <Text testID="login-error" style={styles.error}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          testID="login-button"
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>
          Test accounts: test1@example.com or test2@example.com{'\n'}
          Password: password
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '100',
    color: '#b83f45',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#b83f45',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
})
