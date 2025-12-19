import React from 'react';
import { SafeAreaView, StyleSheet, View, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import NoticesScreen from '../components/NoticesScreen';

const palette = {
  background: '#f5f7fb',
  card: '#ffffff',
  border: '#e5e7eb',
  primary: '#1f64f2',
  muted: '#6b7280',
  text: '#1f2937',
};

export default function AnnouncementsPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </Pressable>
        <Text style={styles.pageTitle}>Announcements</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Notices Component */}
      <NoticesScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.primary,
  },
});
