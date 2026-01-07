import React from 'react';
import { SafeAreaView, StyleSheet, View, Pressable, Text, Animated } from 'react-native';
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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -300,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.hamburgerBtn} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </Pressable>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoLetter}>K</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>Knit Edu</Text>
            <Text style={styles.brandSubtitle}>Parent Portal</Text>
          </View>
        </View>
        <Pressable
          style={styles.logoutBtn}
          onPress={() => {
            router.push('/(tabs)' as never);
          }}>
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
            router.push('/profile' as never);
          }}>
          <Text style={styles.dropdownIcon}>👤</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Profile</Text>
            <Text style={styles.dropdownSubtext}>Manage your information</Text>
          </View>
        </Pressable>
      </Animated.View>

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
  hamburgerIcon: {
    fontSize: 24,
    color: palette.text,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  brandTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: palette.muted,
    fontSize: 11,
  },
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
  logoutIcon: {
    fontSize: 18,
    color: '#dc2626',
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 12,
  },
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
  dropdownIcon: {
    fontSize: 28,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
  },
  dropdownSubtext: {
    fontSize: 12,
    color: palette.muted,
    marginTop: 2,
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
