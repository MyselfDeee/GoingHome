import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  TextInput,
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

const declarations = [
  {
    title: 'Code of Conduct Acknowledgement',
    text: "By submitting this application, I acknowledge that I have read, understood, and agree to abide by the school's Code of Conduct. I understand that any violation of these standards may result in disciplinary action, including suspension or expulsion.",
  },
  {
    title: 'Financial Responsibility Acceptance',
    text: "I acknowledge full responsibility for all school fees, charges, and associated costs as outlined in the fee agreement. I understand that failure to meet payment obligations may affect my child's continued enrollment at the institution.",
  },
];

const confirmations = [
  "I consent to storing my information for the school audit processes",
  "I consent to the school processing my information for affordability check",
  "I confirm that all information provided in this application is true and correct.",
  "I agree to abide by the school's rules, policies, and code of conduct.",
  "I acknowledge responsibility for all school fees as per the agreement.",
  "I consent to the school verifying my information where required.",
  "I consent to the storage and processing of my personal information.",
];

export default function Step5Declaration() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(confirmations.length).fill(false));
  const [signature, setSignature] = useState('');
  const [city, setCity] = useState('');
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

  const toggleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const allChecked = checkedItems.every((checked) => checked);
  const canContinue = allChecked && signature.trim().length >= 3;

  const handleContinue = () => {
    if (!canContinue) {
      alert('Please complete all required fields and confirmations');
      return;
    }
    router.push('/re-registration/step6-review' as never);
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
        <Text style={styles.mainTitle}>Student Re-Registration 2024</Text>
        <Text style={styles.subtitle}>Complete the re-registration process for the upcoming academic year</Text>

        <View style={[styles.contentRow, isSmall && styles.contentColumn]}>
          {/* Sidebar */}
          {!isSmall && (
            <View style={styles.sidebar}>
              <ProgressTracker steps={steps} currentStep={4} completion={90} />
            </View>
          )}

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.sectionTitle}>Declaration</Text>
            <Text style={styles.sectionSubtitle}>
              Please read and confirm the declarations. Select payment options and sign digitally to proceed.
            </Text>

            {/* Declaration Texts */}
            {declarations.map((declaration, idx) => (
              <View key={idx} style={styles.declarationBox}>
                <ScrollView style={styles.declarationScroll} nestedScrollEnabled>
                  <Text style={styles.declarationText}>{declaration.text}</Text>
                </ScrollView>
              </View>
            ))}

            {/* Download Link */}
            <Pressable style={styles.downloadBtn}>
              <Text style={styles.downloadIcon}>📥</Text>
              <Text style={styles.downloadText}>Download Full Policy (PDF)</Text>
            </Pressable>

            {/* Required Confirmations */}
            <View style={styles.confirmationsSection}>
              <Text style={styles.confirmationsTitle}>Required Confirmations</Text>
              <Text style={styles.confirmationsSubtitle}>All confirmations below are required to proceed</Text>
              {confirmations.map((confirmation, idx) => (
                <Pressable
                  key={idx}
                  style={styles.checkboxRow}
                  onPress={() => toggleCheck(idx)}>
                  <View style={[styles.checkbox, checkedItems[idx] && styles.checkboxChecked]}>
                    {checkedItems[idx] && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxText}>{confirmation}</Text>
                </Pressable>
              ))}
            </View>

            {/* Digital Signature */}
            <View style={styles.signatureSection}>
              <Text style={styles.signatureTitle}>Digital Signature</Text>
              <Text style={styles.signatureSubtitle}>
                Your digital signature is required to complete this declaration
              </Text>
              <View style={styles.signatureFields}>
                <View style={styles.signatureField}>
                  <Text style={styles.label}>Full Name (as Digital Signature) *</Text>
                  <TextInput
                    style={styles.input}
                    value={signature}
                    onChangeText={setSignature}
                    placeholder="Enter your full name"
                  />
                  <Text style={styles.hint}>Minimum 3 characters required</Text>
                </View>
                <View style={styles.signatureField}>
                  <Text style={styles.label}>Place / City</Text>
                  <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                    placeholder="Enter city (optional)"
                  />
                </View>
              </View>
            </View>

            {/* Navigation */}
            <View style={styles.navButtons}>
              <Pressable style={styles.backBtnNav} onPress={() => router.back()}>
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <View style={styles.rightButtons}>
                <Pressable style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>Save Progress</Text>
                </Pressable>
                <Pressable
                  style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
                  onPress={handleContinue}>
                  <Text style={styles.continueBtnText}>Continue</Text>
                </Pressable>
              </View>
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
  mainTitle: { fontSize: 24, fontWeight: '800', color: palette.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: palette.muted, marginBottom: 20 },
  contentRow: { flexDirection: 'row', gap: 16 },
  contentColumn: { flexDirection: 'column' },
  sidebar: { width: 200 },
  mainContent: { flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: palette.text, marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: palette.muted, marginBottom: 20, lineHeight: 18 },
  declarationBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 12,
    marginBottom: 12,
    maxHeight: 120,
  },
  declarationScroll: { maxHeight: 100 },
  declarationText: { fontSize: 13, color: palette.text, lineHeight: 18 },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  downloadIcon: { fontSize: 18 },
  downloadText: { color: palette.primary, fontSize: 13, fontWeight: '600' },
  confirmationsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: palette.border,
  },
  confirmationsTitle: { fontSize: 16, fontWeight: '700', color: palette.text, marginBottom: 4 },
  confirmationsSubtitle: { fontSize: 12, color: palette.muted, marginBottom: 16 },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: palette.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkboxText: { flex: 1, fontSize: 13, color: palette.text, lineHeight: 20 },
  signatureSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: palette.border,
  },
  signatureTitle: { fontSize: 16, fontWeight: '700', color: palette.text, marginBottom: 4 },
  signatureSubtitle: { fontSize: 12, color: palette.muted, marginBottom: 16 },
  signatureFields: { gap: 16 },
  signatureField: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: palette.text, marginBottom: 6 },
  input: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: palette.text,
  },
  hint: { fontSize: 11, color: palette.muted, marginTop: 4 },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  rightButtons: { flexDirection: 'row', gap: 12 },
  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: palette.border,
  },
  saveBtnText: { color: palette.text, fontWeight: '600' },
  continueBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: palette.primary,
  },
  continueBtnDisabled: {
    backgroundColor: palette.muted,
    opacity: 0.5,
  },
  continueBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});

