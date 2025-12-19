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
import StudentCard from '@/components/re-registration/StudentCard';

const palette = {
  background: '#f8fafc',
  card: '#ffffff',
  cardLight: '#f1f5f9',
  border: '#e2e8f0',
  primary: '#0ea5e9',
  primaryLight: '#cffafe',
  primaryDark: '#0369a1',
  secondary: '#8b5cf6',
  secondaryLight: '#ede9fe',
  success: '#10b981',
  successLight: '#d1fae5',
  danger: '#ef4444',
  dangerLight: '#fee2e2',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  muted: '#64748b',
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  accent: '#06b6d4',
};

const steps = [
  { number: 1, title: 'Select Children', subtitle: 'Choose students to re-register' },
  { number: 2, title: 'Update Details', subtitle: 'Review and update information' },
  { number: 3, title: 'Review & Submit', subtitle: 'Confirm and submit' },
];

const mockStudents = [
  {
    id: '1',
    initials: 'MR',
    name: 'Mikhenso Rikhotso',
    grade: 'Grade 11',
    studentId: '2020155260088',
    date: '03/12/2020',
  },
];

export default function Step1SelectChildren() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const isMedium = width < 768;
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
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

  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one child to continue');
      return;
    }
    router.push('/re-registration/step2-update' as never);
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
        {/* Main Title */}
        <View style={styles.titleSection}>
          <Text style={styles.titleIcon}>🎓</Text>
          <Text style={styles.mainTitle}>Student Re-Registration</Text>
          <Text style={styles.yearText}>2025 Academic Year</Text>
        </View>

        {/* Deadline Banner */}
        <View style={[styles.deadlineBanner, isSmall && styles.deadlineBannerSmall]}>
          <Text style={styles.deadlineIcon}>📅</Text>
          <View style={styles.deadlineContent}>
            <Text style={styles.deadlineTitle}>Registration Deadline</Text>
            <Text style={styles.deadlineDate}>March 31, 2025 - Ensure timely submission</Text>
          </View>
          {!isSmall && (
            <Pressable style={styles.importantBtn}>
              <Text style={styles.importantBtnText}>Important</Text>
            </Pressable>
          )}
        </View>

        <View style={[styles.contentRow, isMedium && styles.contentColumn]}>
          {/* Left Sidebar - Progress */}
          {isMedium ? (
            <ProgressTracker steps={steps} currentStep={1} completion={33} compact={true} />
          ) : (
            <View style={styles.sidebar}>
              <ProgressTracker steps={steps} currentStep={1} completion={33} />
            </View>
          )}

          {/* Main Content */}
          <View style={[styles.mainContent, isMedium && styles.mainContentMobile]}>
            {/* Info Card */}
            <View style={[styles.infoCard, isSmall && styles.infoCardSmall]}>
              <Text style={styles.infoIcon}>👥</Text>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Select Children for Re-Registration</Text>
                <Text style={styles.infoSubtitle}>
                  Choose which children you'd like to re-register for the upcoming academic year.
                  You can select multiple students at once.
                </Text>
              </View>
            </View>

            {/* Your Children Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Children</Text>
              <Text style={styles.sectionSubtitle}>
                {mockStudents.length} student available for re-registration
              </Text>

              {mockStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  initials={student.initials}
                  name={student.name}
                  grade={student.grade}
                  studentId={student.studentId}
                  date={student.date}
                  selected={selectedStudents.includes(student.id)}
                  onSelect={() => toggleStudent(student.id)}
                />
              ))}
            </View>

            {/* Confirmation Banner */}
            {selectedStudents.length > 0 && (
              <View style={[styles.confirmationBanner, isSmall && styles.confirmationBannerSmall]}>
                <View style={styles.confirmationCircle}>
                  <Text style={styles.confirmationNumber}>{selectedStudents.length}</Text>
                </View>
                <View style={styles.confirmationContent}>
                  <Text style={styles.confirmationTitle}>
                    {selectedStudents.length} child selected for re-registration
                  </Text>
                  <Text style={styles.confirmationSubtitle}>Ready to proceed to the next step</Text>
                </View>
              </View>
            )}

            {/* Bottom Navigation */}
            <View style={[styles.navButtons, isSmall && styles.navButtonsSmall]}>
              <Pressable style={[styles.cancelBtn, isSmall && styles.cancelBtnSmall]} onPress={() => router.back()}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.continueBtn,
                  selectedStudents.length === 0 && styles.continueBtnDisabled,
                  isSmall && styles.continueBtnSmall,
                ]}
                onPress={handleContinue}>
                <Text style={styles.continueBtnText}>Continue →</Text>
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
    paddingVertical: 16,
    paddingTop: 40,
    backgroundColor: palette.card,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  hamburgerBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerIcon: { fontSize: 24, color: palette.text },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: palette.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logoLetter: { color: '#fff', fontWeight: '800', fontSize: 18 },
  brandTitle: { color: palette.text, fontSize: 16, fontWeight: '800' },
  brandSubtitle: { color: palette.textSecondary, fontSize: 11 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fecaca',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.danger,
  },
  logoutIcon: { fontSize: 18, color: palette.danger },
  logoutText: { color: palette.danger, fontWeight: '700', fontSize: 12 },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 999,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: palette.card,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 2, height: 0 },
    paddingTop: 12,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  menuTitle: { fontSize: 18, fontWeight: '800', color: palette.text },
  closeIcon: { fontSize: 22, color: palette.muted, fontWeight: '600' },
  menuDivider: { height: 1, backgroundColor: palette.border },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: palette.cardLight,
    gap: 14,
  },
  dropdownIcon: { fontSize: 24 },
  itemContent: { flex: 1 },
  dropdownText: { fontSize: 15, fontWeight: '700', color: palette.text },
  dropdownSubtext: { fontSize: 12, color: palette.textSecondary, marginTop: 3 },
  container: { padding: 20, paddingTop: 24, paddingBottom: 40 },
  titleSection: { marginBottom: 28 },
  titleIcon: { fontSize: 48, marginBottom: 14 },
  mainTitle: { fontSize: 32, fontWeight: '900', color: palette.text, marginBottom: 8 },
  yearText: { fontSize: 15, color: palette.textSecondary, fontWeight: '600' },
  deadlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.primaryLight,
    padding: 18,
    borderRadius: 14,
    marginBottom: 28,
    gap: 14,
    borderLeftWidth: 5,
    borderLeftColor: palette.primary,
    shadowColor: palette.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  deadlineBannerSmall: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  deadlineIcon: { fontSize: 32, flexShrink: 0 },
  deadlineContent: { flex: 1 },
  deadlineTitle: { fontSize: 16, fontWeight: '800', color: palette.text, marginBottom: 4 },
  deadlineDate: { fontSize: 14, color: palette.textSecondary, fontWeight: '500' },
  importantBtn: {
    backgroundColor: palette.danger,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    flexShrink: 0,
    shadowColor: palette.danger,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  importantBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  contentRow: { flexDirection: 'row', gap: 16 },
  contentColumn: { flexDirection: 'column' },
  sidebar: { width: 200, flexShrink: 0 },
  mainContent: { flex: 1, minWidth: 0 },
  mainContentMobile: { width: '100%' },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: palette.successLight,
    padding: 18,
    borderRadius: 14,
    marginBottom: 28,
    gap: 14,
    borderLeftWidth: 5,
    borderLeftColor: palette.success,
    shadowColor: palette.success,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoCardSmall: {
    padding: 14,
    gap: 12,
  },
  infoIcon: { fontSize: 40, flexShrink: 0 },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 17, fontWeight: '800', color: palette.text, marginBottom: 6 },
  infoSubtitle: { fontSize: 14, color: palette.textSecondary, lineHeight: 21, fontWeight: '500' },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: palette.text, marginBottom: 10 },
  sectionSubtitle: { fontSize: 14, color: palette.textSecondary, marginBottom: 18, fontWeight: '500' },
  confirmationBanner: {
    flexDirection: 'row',
    backgroundColor: palette.successLight,
    padding: 18,
    borderRadius: 14,
    marginBottom: 28,
    gap: 14,
    borderLeftWidth: 5,
    borderLeftColor: palette.success,
    shadowColor: palette.success,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  confirmationBannerSmall: {
    padding: 14,
    gap: 12,
  },
  confirmationCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: palette.success,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    shadowColor: palette.success,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  confirmationNumber: { color: '#fff', fontSize: 24, fontWeight: '900' },
  confirmationContent: { flex: 1, justifyContent: 'center' },
  confirmationTitle: { fontSize: 16, fontWeight: '800', color: palette.text, marginBottom: 4 },
  confirmationSubtitle: { fontSize: 13, color: palette.textSecondary, fontWeight: '500' },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 14,
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  navButtonsSmall: {
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 20,
  },
  cancelBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: palette.cardLight,
    borderWidth: 2,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cancelBtnSmall: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    flex: 1,
  },
  cancelBtnText: { color: palette.text, fontWeight: '800', fontSize: 15 },
  continueBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: palette.primary,
    shadowColor: palette.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  continueBtnSmall: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    flex: 1,
  },
  continueBtnDisabled: {
    backgroundColor: palette.muted,
    opacity: 0.5,
    shadowOpacity: 0.1,
  },
  continueBtnText: { color: '#fff', fontWeight: '900', fontSize: 16 },
});

