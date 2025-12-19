import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const palette = {
  background: '#f8fafc',
  card: '#ffffff',
  cardLight: '#f1f5f9',
  border: '#e2e8f0',
  primary: '#0ea5e9',
  primaryLight: '#cffafe',
  primaryDark: '#0369a1',
  success: '#10b981',
  successLight: '#d1fae5',
  danger: '#ef4444',
  dangerLight: '#fee2e2',
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
};

const FeeForecastingScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const isMedium = width < 768;
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
            <Text style={styles.brandSubtitle}>Fee Forecasting</Text>
          </View>
        </View>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>⏻</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      {/* Dropdown Menu */}
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
      </Animated.View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Page Title */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Fee Summary</Text>
          <Text style={styles.pageSubtitle}>2026 Academic Year</Text>
        </View>

        {/* Total Amount Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Annual Fees</Text>
          <Text style={styles.totalAmount}>R 32,400</Text>
          <Text style={styles.totalDesc}>For all terms combined</Text>
        </View>

        {/* Quick Stats - 3 cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statLabel}>Term Fee</Text>
            <Text style={styles.statValue}>R 8,100</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⚽</Text>
            <Text style={styles.statLabel}>Sport Fee</Text>
            <Text style={styles.statValue}>R 300</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statLabel}>Registration</Text>
            <Text style={styles.statValue}>R 800</Text>
          </View>
        </View>

        {/* Student Info Card */}
        <View style={styles.studentCard}>
          <View style={styles.studentHeader}>
            <View style={styles.studentAvatar}>
              <Text style={styles.avatarText}>MR</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>Mikhenso Rikhotso</Text>
              <Text style={styles.studentId}>Student ID: 2020155260088</Text>
              <Text style={styles.studentGrade}>Grade 12</Text>
            </View>
          </View>
        </View>

        {/* Quarterly Breakdown */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quarterly Breakdown</Text>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownQtr}>Q1</Text>
              <Text style={styles.breakdownAmount}>R 8,100</Text>
              <Text style={styles.breakdownMonth}>Jan - Mar</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownQtr}>Q2</Text>
              <Text style={styles.breakdownAmount}>R 8,100</Text>
              <Text style={styles.breakdownMonth}>Apr - Jun</Text>
            </View>
          </View>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownQtr}>Q3</Text>
              <Text style={styles.breakdownAmount}>R 8,100</Text>
              <Text style={styles.breakdownMonth}>Jul - Sep</Text>
            </View>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownQtr}>Q4</Text>
              <Text style={styles.breakdownAmount}>R 8,100</Text>
              <Text style={styles.breakdownMonth}>Oct - Dec</Text>
            </View>
          </View>
        </View>

        {/* Payment Status */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Payment Status</Text>
          <View style={styles.statusItem}>
            <View style={styles.statusLeft}>
              <Text style={styles.statusLabel}>Amount Paid</Text>
              <Text style={styles.statusValue}>R 16,200</Text>
            </View>
            <Text style={styles.statusPercentage}>50%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusLeft}>
              <Text style={styles.statusLabel}>Outstanding</Text>
              <Text style={styles.statusValue}>R 16,200</Text>
            </View>
            <Text style={styles.statusPercentage}>50%</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <Pressable style={[styles.button, { backgroundColor: palette.primary }]}>
            <Text style={styles.buttonText}>💳 Make Payment</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: palette.cardLight, borderWidth: 1, borderColor: palette.border }]}>
            <Text style={[styles.buttonText, { color: palette.primary }]}>⬇ Download Invoice</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingTop: 22,
    backgroundColor: palette.card,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  hamburgerBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerIcon: { fontSize: 22, color: palette.text },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: { color: '#fff', fontWeight: '700', fontSize: 15 },
  brandTitle: { color: palette.text, fontSize: 14, fontWeight: '700' },
  brandSubtitle: { color: palette.textMuted, fontSize: 11 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
  },
  logoutIcon: { fontSize: 16, color: '#dc2626' },
  logoutText: { color: '#dc2626', fontWeight: '600', fontSize: 11 },
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
    width: 280,
    height: '100%',
    backgroundColor: palette.card,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 0 },
    paddingTop: 18,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  closeIcon: {
    fontSize: 22,
    color: palette.textMuted,
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: palette.cardLight,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginBottom: 3,
    borderRadius: 8,
    backgroundColor: palette.background,
    gap: 12,
  },
  dropdownIcon: { fontSize: 26 },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdownText: { fontSize: 14, fontWeight: '600', color: palette.text },
  dropdownSubtext: { fontSize: 11, color: palette.textMuted, marginTop: 2, fontWeight: '400' },
  container: { paddingHorizontal: 14, paddingVertical: 16, paddingBottom: 32, gap: 16 },
  header: { marginBottom: 8 },
  pageTitle: { fontSize: 22, fontWeight: '700', color: palette.text },
  pageSubtitle: { fontSize: 13, color: palette.textMuted, marginTop: 4, fontWeight: '500' },
  totalCard: {
    backgroundColor: palette.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    gap: 6,
    shadowColor: palette.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLabel: { fontSize: 12, color: '#0369a1', fontWeight: '600' },
  totalAmount: { fontSize: 32, fontWeight: '700', color: '#fff' },
  totalDesc: { fontSize: 12, color: '#cffafe', fontWeight: '500' },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statIcon: { fontSize: 28 },
  statLabel: { fontSize: 11, color: palette.textMuted, fontWeight: '500' },
  statValue: { fontSize: 14, fontWeight: '700', color: palette.text },
  studentCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  studentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 14, fontWeight: '700', color: palette.text },
  studentId: { fontSize: 11, color: palette.textMuted, marginTop: 2 },
  studentGrade: { fontSize: 12, fontWeight: '600', color: palette.primary, marginTop: 2 },
  sectionCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: palette.text },
  breakdownRow: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  breakdownItem: {
    flex: 1,
    backgroundColor: palette.cardLight,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  breakdownQtr: { fontSize: 13, fontWeight: '700', color: palette.primary },
  breakdownAmount: { fontSize: 15, fontWeight: '700', color: palette.text, marginTop: 4 },
  breakdownMonth: { fontSize: 10, color: palette.textMuted, marginTop: 3 },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  statusLeft: { flex: 1 },
  statusLabel: { fontSize: 11, color: palette.textMuted, fontWeight: '500' },
  statusValue: { fontSize: 14, fontWeight: '700', color: palette.text, marginTop: 2 },
  statusPercentage: { fontSize: 14, fontWeight: '700', color: palette.primary },
  progressBar: {
    height: 6,
    backgroundColor: palette.cardLight,
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    width: '50%',
    backgroundColor: palette.primary,
  },
  buttonGroup: { gap: 10, marginTop: 8 },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});

export default FeeForecastingScreen;

