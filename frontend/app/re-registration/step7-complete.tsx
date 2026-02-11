import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '../../hooks/use-color-scheme';
// import SideMenu from '../../components/SideMenu'; // Handled by AppHeader
import AppHeader from '../../components/AppHeader';

const lightPalette = {
  background: '#F6F8FC',
  card: '#FFFFFF',
  border: '#E5EAF3',
  text: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#8A94A6',
  primary: '#6366F1',
  primarySoft: '#EEF2FF',
  success: '#10B981',
  successSoft: '#D1FAE5',
  shadow: '#0F172A',
};

const darkPalette = {
  background: '#0B1220',
  card: '#111827',
  border: '#1F2937',
  text: '#E5E7EB',
  textSecondary: '#A1A1AA',
  textMuted: '#6B7280',
  primary: '#818CF8',
  primarySoft: '#1E1B4B',
  success: '#34D399',
  successSoft: '#064E3B',
  shadow: '#000000',
};

export default function Step7Complete() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const palette = useMemo(
    () => (colorScheme === 'dark' ? darkPalette : lightPalette),
    [colorScheme]
  );
  // const [menuOpen, setMenuOpen] = useState(false); // Handled by AppHeader

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.breadcrumb, { color: palette.textMuted }]}>
          Parent Portal · Re-Registration · Complete
        </Text>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={[styles.successIconBubble, { backgroundColor: palette.successSoft }]}>
            <Ionicons name="checkmark-sharp" size={48} color={palette.success} />
          </View>
          <Text style={[styles.heroTitle, { color: palette.text }]}>Registration Complete!</Text>
          <Text style={[styles.heroSubtitle, { color: palette.textSecondary }]}>
            We have successfully received your re-registration for Mikhenso Rikhotso.
          </Text>
        </View>

        {/* Status Card */}
        <View style={[styles.statusCard, { backgroundColor: palette.card, borderColor: palette.border, shadowColor: palette.shadow }]}>
            <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: palette.success }]} />
                <Text style={[styles.statusText, { color: palette.text }]}>Application Submitted</Text>
            </View>
            <Text style={[styles.statusDate, { color: palette.textMuted }]}>February 11, 2026 • 10:42 AM</Text>
            
            <View style={[styles.divider, { backgroundColor: palette.border }]} />
            
            <View style={styles.referenceRow}>
                <Text style={[styles.refLabel, { color: palette.textSecondary }]}>Reference ID</Text>
                <View style={[styles.refBadge, { backgroundColor: palette.primarySoft }]}>
                    <Text style={[styles.refCode, { color: palette.primary }]}>REG-2026-8892</Text>
                    <Ionicons name="copy-outline" size={14} color={palette.primary} style={{ marginLeft: 6}} />
                </View>
            </View>
        </View>

        {/* Next Steps */}
        <View style={[styles.sectionCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <Text style={[styles.cardTitle, { color: palette.text }]}>What happens next?</Text>
            
            <View style={styles.stepRow}>
                <View style={[styles.stepIconBox, { backgroundColor: palette.primarySoft }]}>
                    <Text style={styles.stepNumber}>1</Text>
                </View>
                <View style={styles.stepTextBox}>
                    <Text style={[styles.stepTitle, { color: palette.text }]}>Verification</Text>
                    <Text style={[styles.stepDesc, { color: palette.textSecondary }]}>
                        Our team will verify the submitted documents within 24 hours.
                    </Text>
                </View>
            </View>

            <View style={styles.stepConnector} />

            <View style={styles.stepRow}>
                <View style={[styles.stepIconBox, { backgroundColor: palette.primarySoft }]}>
                    <Text style={styles.stepNumber}>2</Text>
                </View>
                <View style={styles.stepTextBox}>
                    <Text style={[styles.stepTitle, { color: palette.text }]}>Fees & Billing</Text>
                    <Text style={[styles.stepDesc, { color: palette.textSecondary }]}>
                        The first invoice for the 2026 academic year will be sent to your email.
                    </Text>
                </View>
            </View>
            
            <View style={styles.stepConnector} />

            <View style={styles.stepRow}>
                <View style={[styles.stepIconBox, { backgroundColor: palette.primarySoft }]}>
                    <Text style={styles.stepNumber}>3</Text>
                </View>
                <View style={styles.stepTextBox}>
                    <Text style={[styles.stepTitle, { color: palette.text }]}>Confirmation</Text>
                    <Text style={[styles.stepDesc, { color: palette.textSecondary }]}>
                        You will receive a final confirmation SMS once the process is closed.
                    </Text>
                </View>
            </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: palette.primary, shadowColor: palette.primary },
              pressed && styles.pressedBtn,
            ]}
            onPress={() => router.replace('/(tabs)' as never)}
          >
            <Text style={styles.primaryBtnText}>Go to Dashboard</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              { borderColor: palette.border, backgroundColor: palette.card },
              pressed && styles.pressedBtn,
            ]}
            onPress={() => router.push('/re-registration' as never)} // Start over/another
          >
            <Text style={[styles.secondaryBtnText, { color: palette.textSecondary }]}>Register Another Student</Text>
          </Pressable>

          <Pressable
             style={({ pressed }) => [
                styles.linkButton,
                pressed && { opacity: 0.6 }
             ]}
          >
             <Ionicons name="download-outline" size={16} color={palette.primary} />
             <Text style={[styles.linkBtnText, { color: palette.primary }]}>Download Proof of Registration</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  topNav: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6 },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pressedBtn: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  scrollContent: { padding: 20, paddingBottom: 60 },
  breadcrumb: { fontSize: 12, marginBottom: 24, textAlign: 'center', opacity: 0.7 },

  heroContainer: { alignItems: 'center', marginBottom: 32 },
  successIconBubble: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, maxWidth: '80%' },

  statusCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 16, fontWeight: '700' },
  statusDate: { fontSize: 13, marginBottom: 16 },
  divider: { height: 1, width: '100%', marginBottom: 16 },
  referenceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  refLabel: { fontSize: 13 },
  refBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  refCode: { fontSize: 13, fontWeight: '700', fontFamily: 'System' },

  sectionCard: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 20 },
  stepRow: { flexDirection: 'row', gap: 16 },
  stepIconBox: {
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', zIndex: 1,
  },
  stepNumber: { fontSize: 14, fontWeight: '700', color: '#6366F1' },
  stepTextBox: { flex: 1 },
  stepTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  stepDesc: { fontSize: 13, lineHeight: 18 },
  stepConnector: {
      width: 2, height: 24, backgroundColor: '#E0E7FF',
      marginLeft: 15, marginVertical: 4,
  },

  actionsContainer: { gap: 12 },
  primaryButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 16, borderRadius: 100,
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 16, borderRadius: 100,
    borderWidth: 1,
  },
  secondaryBtnText: { fontSize: 15, fontWeight: '600' },
  linkButton: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      marginTop: 8, padding: 8,
  },
  linkBtnText: { fontSize: 14, fontWeight: '600' },
});

