import React from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

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
};

export default function FeeForecasting() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
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

      {/* Dropdown Menu - Slide from left */}
      {menuOpen && <Pressable style={styles.menuOverlay} onPress={() => setMenuOpen(false)} />}
      <Animated.View style={[styles.dropdownMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <Pressable onPress={() => setMenuOpen(false)}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.menuDivider} />

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/parent-dashboard' as never);
          }}>
          <Text style={styles.dropdownIcon}>🏠</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Parent Dashboard</Text>
            <Text style={styles.dropdownSubtext}>Overview & payments</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/re-registration' as never);
          }}>
          <Text style={styles.dropdownIcon}>📝</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Re-registration</Text>
            <Text style={styles.dropdownSubtext}>Register learners</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/fee-forecasting' as never);
          }}>
          <Text style={styles.dropdownIcon}>📊</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Fee Forecasting</Text>
            <Text style={styles.dropdownSubtext}>Budget planning</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/ai-assistant' as never);
          }}>
          <Text style={styles.dropdownIcon}>🤖</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>AI Assistant</Text>
            <Text style={styles.dropdownSubtext}>Get smart help</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/request-statement' as never);
          }}>
          <Text style={styles.dropdownIcon}>📋</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Request Statement</Text>
            <Text style={styles.dropdownSubtext}>Download records</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/admissions' as never);
          }}>
          <Text style={styles.dropdownIcon}>🎓</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Admissions</Text>
            <Text style={styles.dropdownSubtext}>Track applications</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/announcements' as never);
          }}>
          <Text style={styles.dropdownIcon}>📢</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Announcements</Text>
            <Text style={styles.dropdownSubtext}>School news & updates</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/profile' as never);
          }}>
          <Text style={styles.dropdownIcon}>👤</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Profile</Text>
            <Text style={styles.dropdownSubtext}>Manage your information</Text>
          </View>
        </Pressable>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Fee Forecasting</Text>
          <Text style={styles.pageSubtitle}>Plan your budget and manage fee payments</Text>
        </View>

        {/* Content Card */}
        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.largeIcon}>📊</Text>
          </View>
          <Text style={styles.cardTitle}>Budget Planning Tool</Text>
          <Text style={styles.cardDescription}>
            Project future fees and create a budget plan for your learners. Get insights into payment trends and manage cash flow effectively.
          </Text>
          <Pressable style={styles.actionBtn} onPress={() => router.push('/fee-forecasting-screen' as never)}>
            <Text style={styles.actionBtnText}>View Fee Forecast</Text>
          </Pressable>
        </View>

        <View style={styles.forecastCard}>
          <Text style={styles.forecastTitle}>2026 Fee Forecast</Text>
          <View style={styles.forecastRow}>
            <Text style={styles.forecastLabel}>Jan - Mar</Text>
            <Text style={styles.forecastAmount}>R 8,100</Text>
          </View>
          <View style={styles.forecastRow}>
            <Text style={styles.forecastLabel}>Apr - Jun</Text>
            <Text style={styles.forecastAmount}>R 8,100</Text>
          </View>
          <View style={styles.forecastRow}>
            <Text style={styles.forecastLabel}>Jul - Sep</Text>
            <Text style={styles.forecastAmount}>R 8,100</Text>
          </View>
          <View style={styles.forecastRow}>
            <Text style={styles.forecastLabel}>Oct - Dec</Text>
            <Text style={styles.forecastAmount}>R 8,100</Text>
          </View>
          <View style={[styles.forecastRow, styles.totalRow]}>
            <Text style={styles.forecastLabel}>Annual Total</Text>
            <Text style={styles.totalAmount}>R 32,400</Text>
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
  container: { paddingHorizontal: 14, paddingVertical: 16, gap: 14 },
  pageHeader: { marginBottom: 4 },
  pageTitle: { fontSize: 20, fontWeight: '700', color: palette.text },
  pageSubtitle: { color: palette.textMuted, fontSize: 13, marginTop: 3, lineHeight: 18 },
  card: {
    backgroundColor: palette.primaryLight,
    borderRadius: 10,
    padding: 13,
    borderLeftWidth: 4,
    borderLeftColor: palette.primary,
    gap: 9,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  cardIcon: { marginBottom: 4 },
  largeIcon: { fontSize: 40 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: palette.primaryDark },
  cardDescription: { fontSize: 12, color: palette.text, textAlign: 'left', lineHeight: 17, fontWeight: '500' },
  actionBtn: {
    backgroundColor: palette.primary,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    marginTop: 6,
    width: '100%',
    shadowColor: palette.primary,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  actionBtnText: { color: '#fff', fontWeight: '600', fontSize: 13, textAlign: 'center' },
  forecastCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  forecastTitle: { fontSize: 15, fontWeight: '700', color: palette.text, marginBottom: 4 },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: palette.cardLight,
    paddingHorizontal: 2,
  },
  totalRow: { borderBottomWidth: 0, paddingTop: 4, backgroundColor: palette.cardLight, marginHorizontal: -14, paddingHorizontal: 16, borderRadius: 8 },
  forecastLabel: { fontSize: 13, color: palette.textSecondary, fontWeight: '500' },
  forecastAmount: { fontSize: 13, fontWeight: '600', color: palette.text },
  totalAmount: { fontSize: 15, fontWeight: '700', color: palette.primary },
});
