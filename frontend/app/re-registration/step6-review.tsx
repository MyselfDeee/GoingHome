import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import { useColorScheme } from '../../hooks/use-color-scheme'; // If AppHeader uses it internally or passes defaults
import { useColorScheme } from '../../hooks/use-color-scheme';
// import SideMenu from '../../components/SideMenu'; // Handled by AppHeader
import AppHeader from '../../components/AppHeader';

const lightPalette = {
  background: '#F6F8FC',
  card: '#FFFFFF',
  cardAlt: '#F1F5FF',
  border: '#E5EAF3',
  text: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#8A94A6',
  primary: '#6366F1',
  primarySoft: '#EEF2FF',
  success: '#10B981',
  info: '#0EA5E9',
  shadow: '#0F172A',
};

const darkPalette = {
  background: '#0B1220',
  card: '#111827',
  cardAlt: '#0F172A',
  border: '#1F2937',
  text: '#E5E7EB',
  textSecondary: '#A1A1AA',
  textMuted: '#6B7280',
  primary: '#7C83FF',
  primarySoft: '#1D2235',
  success: '#34D399',
  info: '#38BDF8',
  shadow: '#000000',
};

const steps = [
  { title: 'Select Children', done: true },
  { title: 'Update Details', done: true },
  { title: 'Choose Financing', done: true },
  { title: 'Review & Submit', done: false },
];

export default function Step6Review() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const palette = useMemo(
    () => (colorScheme === 'dark' ? darkPalette : lightPalette),
    [colorScheme]
  );

  // const [menuOpen, setMenuOpen] = useState(false); // Handled by AppHeader
  const [confirmed, setConfirmed] = useState(false);

  const handleComplete = () => {
    if (!confirmed) {
      alert('Please confirm that all information is accurate and complete.');
      return;
    }
    router.push('/re-registration/step7-complete' as never);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <AppHeader />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 150 }]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.breadcrumb, { color: palette.textMuted }]}>Parent Portal · Re-Registration · Step 4: Review & Submit</Text>

        <View style={styles.headerRow}>
          <View style={[styles.headerIcon, { backgroundColor: palette.primarySoft }]}
          >
            <Text style={[styles.headerIconText, { color: palette.primary }]}>📋</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headerTitle, { color: palette.text }]}>Review & Submit</Text>
            <Text style={[styles.headerSubtitle, { color: palette.textSecondary }]}>Final step – Confirm your registration</Text>
          </View>
        </View>

        <View style={[styles.infoBanner, { backgroundColor: palette.cardAlt, borderColor: palette.border }]}>
          <Ionicons name="information-circle-outline" size={18} color={palette.info} />
          <Text style={[styles.infoText, { color: palette.textSecondary }]}>Please review all information carefully before submitting. You can go back to make changes if needed.</Text>
        </View>

        <View style={[styles.progressCard, { backgroundColor: palette.card, borderColor: palette.border, shadowColor: palette.shadow }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: palette.text }]}>Progress</Text>
            <Text style={[styles.progressValue, { color: palette.primary }]}>100%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: palette.cardAlt }]}
          >
            <View style={[styles.progressFill, { backgroundColor: palette.primary, width: '100%' }]} />
          </View>
          <View style={styles.stepsRow}>
            {steps.map((step, index) => (
              <View key={step.title} style={styles.stepItem}>
                <View style={[styles.stepIcon, { backgroundColor: step.done ? palette.success : palette.primarySoft }]}>
                  {step.done ? (
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  ) : (
                    <Text style={[styles.stepNumber, { color: palette.primary }]}>4</Text>
                  )}
                </View>
                <Text style={[styles.stepText, { color: palette.textSecondary }]}>{step.title}</Text>
                {index < steps.length - 1 && <View style={[styles.stepDivider, { backgroundColor: palette.border }]} />}
              </View>
            ))}
          </View>
          <Text style={[styles.stepFooter, { color: palette.textMuted }]}>Step 4 of 4 • 1 student</Text>
        </View>

        <View style={[styles.studentCard, { backgroundColor: palette.card, borderColor: palette.border, shadowColor: palette.shadow }]}>
          <View style={styles.studentRow}>
            <View style={[styles.avatar, { backgroundColor: palette.primary }]}
            >
              <Text style={styles.avatarText}>MR</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.studentName, { color: palette.text }]}>Mikhenso Rikhotso</Text>
              <Text style={[styles.studentId, { color: palette.textMuted }]}>Student ID: 2020155260088</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: palette.success }]}>
              <Ionicons name="checkmark-circle" size={14} color="#fff" />
              <Text style={styles.statusBadgeText}>Ready to Submit</Text>
            </View>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: palette.card, borderColor: palette.border, shadowColor: palette.shadow }]}>
          <Text style={[styles.cardTitle, { color: palette.text }]}>Registration Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>Student Name</Text>
            <Text style={[styles.summaryValue, { color: palette.text }]}>Mikhenso Rikhotso</Text>
          </View>
          <View style={[styles.rowDivider, { backgroundColor: palette.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>Grade Level</Text>
            <Text style={[styles.summaryValue, { color: palette.text }]}>12</Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: palette.card, borderColor: palette.border, shadowColor: palette.shadow }]}>
          <View style={styles.cardTitleRow}>
            <Text style={[styles.cardTitle, { color: palette.text }]}>Payment Plan Details</Text>
            <Text style={[styles.cardTitleIcon, { color: palette.textMuted }]}>📄</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>Selected Plan</Text>
            <Text style={[styles.summaryValue, { color: palette.text }]}>Forward Funding</Text>
          </View>
          <View style={[styles.rowDivider, { backgroundColor: palette.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>Total Amount</Text>
            <Text style={[styles.summaryValue, { color: palette.text }]}>R 3,105</Text>
          </View>
          <View style={[styles.rowDivider, { backgroundColor: palette.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>Payment Period</Text>
            <Text style={[styles.summaryValue, { color: palette.text }]}>–</Text>
          </View>
          <View style={[styles.rowDivider, { backgroundColor: palette.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: palette.textMuted }]}>Status</Text>
            <View style={[styles.statusPill, { backgroundColor: palette.primarySoft }]}>
              <Ionicons name="checkmark-circle" size={14} color={palette.success} />
              <Text style={[styles.statusPillText, { color: palette.textSecondary }]}>Confirmed</Text>
            </View>
          </View>
        </View>

        <View style={[styles.confirmationCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <Pressable style={styles.confirmationRow} onPress={() => setConfirmed(!confirmed)}>
            <View style={[styles.checkbox, { borderColor: palette.border }, confirmed && { backgroundColor: palette.primary, borderColor: palette.primary }]}>
              {confirmed && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.confirmationTitle, { color: palette.text }]}>I confirm that all information provided is accurate and complete.</Text>
              <Text style={[styles.confirmationSubtitle, { color: palette.textSecondary }]}>By checking this box, you authorize the submission of this re-registration.</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.stickyFooter, { backgroundColor: palette.background, borderColor: palette.border }]}>
        <Text style={[styles.footerNote, { color: palette.textMuted }]}>Step 4 of 4 • 1 student</Text>
        <View style={styles.footerActions}>
          <Pressable style={[styles.ghostButton, { borderColor: palette.border }]} onPress={() => router.back()}>
            <Text style={[styles.ghostButtonText, { color: palette.textSecondary }]}>Back</Text>
          </Pressable>
          <Pressable
            style={[
              styles.primaryButton,
              { backgroundColor: palette.primary },
              !confirmed && styles.primaryButtonDisabled,
            ]}
            onPress={handleComplete}
            disabled={!confirmed}
          >
            <Text style={styles.primaryButtonText}>Complete Registration →</Text>
          </Pressable>
        </View>
      </View>
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
  pressedBtn: { opacity: 0.8 },
  scrollContent: { padding: 16 },
  breadcrumb: { fontSize: 12, marginBottom: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  headerIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  headerIconText: { fontSize: 20 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 4 },
  infoBanner: { flexDirection: 'row', gap: 10, padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  infoText: { flex: 1, fontSize: 13, lineHeight: 18 },

  progressCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progressTitle: { fontSize: 14, fontWeight: '600' },
  progressValue: { fontSize: 14, fontWeight: '700' },
  progressTrack: { height: 8, borderRadius: 999, overflow: 'hidden', marginBottom: 14 },
  progressFill: { height: 8, borderRadius: 999 },
  stepsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, alignItems: 'center' },
  stepItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stepIcon: { width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  stepNumber: { fontSize: 11, fontWeight: '700' },
  stepText: { fontSize: 12 },
  stepDivider: { width: 12, height: 1 },
  stepFooter: { fontSize: 12, marginTop: 10 },

  studentCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  studentName: { fontSize: 16, fontWeight: '700' },
  studentId: { fontSize: 12, marginTop: 2 },
  statusBadge: { flexDirection: 'row', gap: 6, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  statusBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  cardTitleIcon: { fontSize: 18 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  summaryLabel: { fontSize: 12 },
  summaryValue: { fontSize: 13, fontWeight: '700' },
  rowDivider: { height: 1 },
  statusPill: { flexDirection: 'row', gap: 6, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusPillText: { fontSize: 12, fontWeight: '600' },

  confirmationCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  confirmationRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  confirmationTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  confirmationSubtitle: { fontSize: 12, lineHeight: 16 },

  stickyFooter: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  footerNote: { fontSize: 12, marginBottom: 10, textAlign: 'center' },
  footerActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  ghostButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
  },
  ghostButtonText: { fontSize: 14, fontWeight: '600' },
  primaryButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryButtonDisabled: { opacity: 0.5 },
  primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
