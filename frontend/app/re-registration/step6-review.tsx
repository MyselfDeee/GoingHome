import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import ProgressTracker from '@/components/re-registration/ProgressTracker';

const palette = {
  background: '#f0f4f8',
  card: '#ffffff',
  cardLight: '#f8fafc',
  border: '#e2e8f0',
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1d4ed8',
  success: '#059669',
  danger: '#dc2626',
  muted: '#64748b',
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
};

const steps = [
  { number: 1, title: 'Select Children', subtitle: 'Choose students to re-register' },
  { number: 2, title: 'Update Details', subtitle: 'Review and update information' },
  { number: 3, title: 'Choose Financing', subtitle: 'Select a payment option' },
  { number: 4, title: 'Review & Submit', subtitle: 'Confirm and submit' },
];

export default function Step6Review() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const [confirmed, setConfirmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -300,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

  const handleLogout = () => {
    router.push('/(tabs)' as never);
  };

  const handleComplete = () => {
    if (!confirmed) {
      alert('Please confirm that all information is accurate');
      return;
    }
    router.push('/re-registration/step7-complete' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.hamburgerBtn} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </Pressable>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoLetter}>P</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>Knit Edu</Text>
            <Text style={styles.brandSubtitle}>Parent Portal</Text>
          </View>
        </View>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>⏻</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      {/* Dropdown Menu - Slide from left */}
      {menuOpen && (
        <Pressable style={styles.menuOverlay} onPress={() => setMenuOpen(false)} />
      )}
      <Animated.View style={[styles.dropdownMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <Pressable onPress={() => setMenuOpen(false)}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>
        
        <View style={styles.menuDivider} />
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/re-registration' as never);
        }}>
          <Text style={styles.dropdownIcon}>📝</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Re-registration</Text>
            <Text style={styles.dropdownSubtext}>Register learners</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/fee-forecasting' as never);
        }}>
          <Text style={styles.dropdownIcon}>📊</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Fee Forecasting</Text>
            <Text style={styles.dropdownSubtext}>Budget planning</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/ai-assistant' as never);
        }}>
          <Text style={styles.dropdownIcon}>🤖</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>AI Assistant</Text>
            <Text style={styles.dropdownSubtext}>Get smart help</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/request-statement' as never);
        }}>
          <Text style={styles.dropdownIcon}>📋</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Request Statement</Text>
            <Text style={styles.dropdownSubtext}>Download records</Text>
          </View>
        </Pressable>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>📋</Text>
          </View>
          <View>
            <Text style={styles.mainTitle}>Review & Submit</Text>
            <Text style={styles.subtitle}>Final step - Confirm your registration</Text>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Please review all information carefully before submitting. You can go back to make changes if needed.
          </Text>
        </View>

        <View style={[styles.contentRow, isSmall && styles.contentColumn]}>
          {/* Sidebar */}
          {!isSmall && (
            <View style={styles.sidebar}>
              <ProgressTracker steps={steps} currentStep={4} completion={100} />
            </View>
          )}

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Student Information Card */}
            <View style={styles.studentCard}>
              <View style={styles.studentInfo}>
                <View style={styles.studentAvatar}>
                  <Text style={styles.studentAvatarText}>MR</Text>
                </View>
                <View style={styles.studentDetails}>
                  <Text style={styles.studentName}>Mikhenso Rikhotso</Text>
                  <Text style={styles.studentId}>Student ID: 2020155260088</Text>
                </View>
              </View>
              <View style={styles.readyBadge}>
                <Text style={styles.readyBadgeText}>Ready to Submit</Text>
              </View>
            </View>

            {/* Registration Summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <View style={styles.summaryIcon}>
                  <Text style={styles.summaryIconText}>✓</Text>
                </View>
                <Text style={styles.summaryTitle}>Registration Summary</Text>
              </View>
              <View style={styles.summaryTable}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Student Name</Text>
                  <Text style={styles.summaryValue}>Mikhenso Rikhotso</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Grade Level</Text>
                  <Text style={styles.summaryValue}>12</Text>
                </View>
              </View>
            </View>

            {/* Payment Plan Details */}
            <View style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <Text style={styles.paymentIcon}>📄</Text>
                <Text style={styles.paymentTitle}>Payment Plan Details</Text>
              </View>
              <View style={styles.paymentTable}>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Selected Plan</Text>
                  <Text style={styles.paymentValue}>forward funding</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Total Amount</Text>
                  <Text style={styles.paymentValue}>R 3,105</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Payment Period</Text>
                  <Text style={styles.paymentValue}>-</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Status</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Confirmed</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Confirmation Checkbox */}
            <View style={styles.confirmationBox}>
              <Pressable
                style={styles.confirmationCheckboxRow}
                onPress={() => setConfirmed(!confirmed)}>
                <View style={[styles.confirmationCheckbox, confirmed && styles.confirmationCheckboxChecked]}>
                  {confirmed && <Text style={styles.confirmationCheckmark}>✓</Text>}
                </View>
                <View style={styles.confirmationText}>
                  <Text style={styles.confirmationTitle}>
                    I confirm that all information provided is accurate and complete.
                  </Text>
                  <Text style={styles.confirmationSubtitle}>
                    By checking this box, you confirm that the registration details are correct and you authorize the submission of this re-registration.
                  </Text>
                </View>
              </Pressable>
            </View>

            {/* Navigation */}
            <View style={styles.navButtons}>
              <Pressable style={styles.backBtnNav} onPress={() => router.back()}>
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <View style={styles.navCenter}>
                <Text style={styles.navCenterText}>Step 4 of 4 • 1 student</Text>
              </View>
              <Pressable
                style={[styles.completeBtn, !confirmed && styles.completeBtnDisabled]}
                onPress={handleComplete}>
                <Text style={styles.completeBtnText}>Complete Registration →</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: 12,
  },
  hamburgerBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerIcon: { fontSize: 24, color: palette.text },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: { color: '#fff', fontWeight: '700', fontSize: 16 },
  brandTitle: { color: palette.text, fontSize: 15, fontWeight: '700' },
  brandSubtitle: { color: palette.muted, fontSize: 11 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
  },
  logoutIcon: { fontSize: 18, color: '#dc2626' },
  logoutText: { color: '#dc2626', fontWeight: '600', fontSize: 12 },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
    borderRightWidth: 1,
    borderRightColor: palette.border,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  menuTitle: { fontSize: 16, fontWeight: '700', color: palette.text },
  closeIcon: { fontSize: 20, color: palette.text },
  menuDivider: { height: 1, backgroundColor: palette.border },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: 12,
  },
  dropdownIcon: { fontSize: 20 },
  itemContent: { flex: 1 },
  dropdownText: { fontSize: 14, fontWeight: '600', color: palette.text },
  dropdownSubtext: { fontSize: 12, color: palette.muted, marginTop: 2 },
  container: { padding: 16, paddingTop: 24, paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: { fontSize: 24 },
  mainTitle: { fontSize: 22, fontWeight: '800', color: palette.text },
  subtitle: { fontSize: 13, color: palette.muted, marginTop: 2 },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#e0f2fe',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
  },
  infoIcon: { fontSize: 20 },
  infoText: { flex: 1, fontSize: 13, color: palette.text, lineHeight: 18 },
  contentRow: { flexDirection: 'row', gap: 16 },
  contentColumn: { flexDirection: 'column' },
  sidebar: { width: 200 },
  mainContent: { flex: 1 },
  studentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentAvatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  studentDetails: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: '700', color: palette.text, marginBottom: 4 },
  studentId: { fontSize: 12, color: palette.muted },
  readyBadge: {
    backgroundColor: palette.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  readyBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  summaryCard: {
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryIconText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: palette.text },
  summaryTable: { gap: 8 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: { fontSize: 13, color: palette.muted },
  summaryValue: { fontSize: 13, fontWeight: '700', color: palette.text },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  paymentIcon: { fontSize: 24 },
  paymentTitle: { fontSize: 16, fontWeight: '700', color: palette.text },
  paymentTable: { gap: 8 },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  paymentLabel: { fontSize: 13, color: palette.muted },
  paymentValue: { fontSize: 13, fontWeight: '700', color: palette.text },
  statusBadge: {
    backgroundColor: palette.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  confirmationBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  confirmationCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  confirmationCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: palette.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  confirmationCheckboxChecked: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  confirmationCheckmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  confirmationText: { flex: 1 },
  confirmationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  confirmationSubtitle: {
    fontSize: 12,
    color: palette.muted,
    lineHeight: 16,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  backBtnNav: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: palette.border,
  },
  backBtnText: { color: palette.text, fontWeight: '600' },
  navCenter: { flex: 1, alignItems: 'center' },
  navCenterText: { fontSize: 12, color: palette.muted },
  completeBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#e0f2fe',
  },
  completeBtnDisabled: {
    backgroundColor: palette.muted,
    opacity: 0.5,
  },
  completeBtnText: { color: palette.primary, fontWeight: '700', fontSize: 14 },
});

