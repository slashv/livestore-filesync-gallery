import { StyleSheet, Text, View } from 'react-native'

// Mobile gallery implementation is future work - see GALLERY_IMPLEMENTATION.md Phase 6
// Current blockers:
// - No @livestore-filesync/opfs support on React Native
// - Need expo-filesystem adapter
// - wasm-vips doesn't work on RN (thumbnails need alternative)

interface GalleryProps {
  userId: string
}

export function Gallery({ userId }: GalleryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
      <Text style={styles.message}>
        Mobile gallery support requires expo-filesystem adapter. See GALLERY_IMPLEMENTATION.md for
        details.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '200',
    color: '#b83f45',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
})
