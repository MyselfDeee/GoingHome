import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';

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

export default function Step7Complete() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
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
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Registration Complete!</Text>
        <Text style={styles.subtitle}>
          Your students are now registered and ready for the new academic year
        </Text>

        {/* Student Information Card */}
        <View style={[styles.card, styles.studentCard]}>
          <View style={styles.cardContent}>
            <View style={styles.studentAvatar}>
              <Text style={styles.studentAvatarText}>MR</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>Mikhenso Rikhotso</Text>
              <View style={styles.studentStatus}>
                <View style={styles.gradeBadge}>
                  <Text style={styles.gradeBadgeText}>12</Text>
                </View>
                <Text style={styles.statusIcon}>✓</Text>
                <Text style={styles.statusText}>Confirmed</Text>
              </View>
              <View style={styles.emailRow}>
                <Text style={styles.emailIcon}>✉️</Text>
                <Text style={styles.emailText}>mikhenso@gmail.com</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Parent Notification Card */}
        <View style={[styles.card, styles.notificationCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔔</Text>
            <Text style={styles.cardTitle}>Parent Notification</Text>
          </View>
          <Text style={styles.notificationText}>A confirmation email has been sent to:</Text>
          <View style={styles.emailInput}>
            <TextInput
              style={styles.emailInputText}
              value="ndzhobelad@gmail.com"
              editable={false}
            />
          </View>
        </View>

        {/* Academic Year Start Date Card */}
        <View style={[styles.card, styles.dateCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardTitle}>Academic Year Start Date</Text>
          </View>
          <Text style={styles.dateText}>Term starts on September 1st, 2025</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable
            style={styles.dashboardBtn}
            onPress={() => router.push('/parent-dashboard' as never)}>
            <Text style={styles.dashboardBtnText}>Go to Dashboard</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </Pressable>
          <Pressable
            style={styles.registerAnotherBtn}
            onPress={() => router.push('/re-registration/step1-select' as never)}>
            <Text style={styles.registerAnotherBtnText}>Register Another Child</Text>
            <Text style={styles.arrowIcon}>→</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerIcon}>📚</Text>
          <Text style={styles.footerText}>Knit Edu Parent Portal</Text>
        </View>
        <Text style={styles.footerMessage}>
          Thank you for registering your child with us. We look forward to a great year!
        </Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: 40,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: palette.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 50,
    color: '#fff',
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: palette.muted,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  studentCard: {
    backgroundColor: '#d1fae5',
  },
  notificationCard: {
    backgroundColor: '#e0f2fe',
  },
  dateCard: {
    backgroundColor: '#fce7f3',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  studentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: palette.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentAvatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 8,
  },
  studentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  gradeBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  statusIcon: {
    color: palette.success,
    fontSize: 18,
    fontWeight: '700',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.success,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emailIcon: {
    fontSize: 16,
  },
  emailText: {
    fontSize: 13,
    color: palette.muted,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  notificationText: {
    fontSize: 14,
    color: palette.text,
    marginBottom: 12,
  },
  emailInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.border,
  },
  emailInputText: {
    fontSize: 14,
    color: palette.text,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.text,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  dashboardBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.success,
    paddingVertical: 16,
    borderRadius: 10,
    gap: 8,
  },
  dashboardBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  registerAnotherBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 8,
  },
  registerAnotherBtnText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  arrowIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  footerIcon: {
    fontSize: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
  },
  footerMessage: {
    fontSize: 13,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});

