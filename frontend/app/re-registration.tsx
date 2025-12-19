import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const palette = {
  background: '#f0f4f8',
  card: '#ffffff',
  border: '#e2e8f0',
  primary: '#2563eb',
  success: '#059669',
  danger: '#dc2626',
  muted: '#64748b',
  text: '#1e293b',
};

export default function ReRegistration() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const buttonScaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -300,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleLogout = () => {
    router.push('/(tabs)' as never);
  };

  const handleStartReregistration = () => {
    router.push('/re-registration/step1-select' as never);
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
            <Text style={styles.brandSubtitle}>Re-registration</Text>
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
      </Animated.View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Re-registration</Text>
          <Text style={styles.pageSubtitle}>Register your learners for the new academic year</Text>
        </View>

        {/* Content Card */}
        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.largeIcon}>📝</Text>
          </View>
          <Text style={styles.cardTitle}>Learner Registration</Text>
          <Text style={styles.cardDescription}>
            Complete the re-registration process for your learners. Update personal information, contact details, and emergency contacts.
          </Text>
          <Animated.View
            style={[
              {
                transform: [{ scale: buttonScaleAnim }],
              },
            ]}>
            <Pressable
              style={styles.actionBtn}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
              onPress={handleStartReregistration}>
              <Text style={styles.actionBtnText}>Start Re-registration</Text>
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Important Dates</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoDot}>•</Text>
            <Text style={styles.infoText}>Registration Opens: January 2026</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoDot}>•</Text>
            <Text style={styles.infoText}>Registration Closes: February 2026</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoDot}>•</Text>
            <Text style={styles.infoText}>Late Registration: Until March 2026</Text>
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
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 0 },
    paddingTop: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.text,
  },
  closeIcon: {
    fontSize: 24,
    color: palette.muted,
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 4,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    gap: 14,
  },
  dropdownIcon: { fontSize: 28 },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdownText: { fontSize: 15, fontWeight: '700', color: palette.text },
  dropdownSubtext: { fontSize: 12, color: palette.muted, marginTop: 2 },
  container: { padding: 16, gap: 16, backgroundColor: palette.background, minHeight: '100%' },
  pageHeader: { marginBottom: 8, marginTop: 8 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: palette.text, marginBottom: 4 },
  pageSubtitle: { color: palette.muted, fontSize: 14, marginTop: 2, lineHeight: 20 },
  card: {
    backgroundColor: palette.card,
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIcon: { marginBottom: 4 },
  largeIcon: { fontSize: 56 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: palette.text, marginBottom: 4 },
  cardDescription: { fontSize: 14, color: palette.muted, textAlign: 'center', lineHeight: 22 },
  actionBtn: {
    backgroundColor: palette.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  actionBtnPressed: {
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  actionBtnText: { color: '#fff', fontWeight: '600', fontSize: 15, textAlign: 'center', letterSpacing: 0.3 },
  infoCard: {
    backgroundColor: '#ecf9f8',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#a1d8d4',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: { fontSize: 16, fontWeight: '700', color: palette.success, marginBottom: 4 },
  infoItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  infoDot: { color: palette.success, fontWeight: '600', fontSize: 14, marginTop: 2 },
  infoText: { fontSize: 14, color: palette.text, flex: 1, lineHeight: 20 },
});
