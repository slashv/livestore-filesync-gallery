import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider, useAuth } from './components/AuthProvider'
import { Gallery } from './components/Gallery'
import { LoginScreen } from './components/LoginScreen'

function LoadingFallback() {
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

function AuthGate() {
  const { isLoading, isAuthenticated, user } = useAuth()

  if (isLoading) {
    return <LoadingFallback />
  }

  if (!isAuthenticated || !user) {
    return <LoginScreen />
  }

  // Mobile gallery is a placeholder - see GALLERY_IMPLEMENTATION.md Phase 6
  return <Gallery userId={user.id} />
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <AuthGate />
        </SafeAreaView>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
})
