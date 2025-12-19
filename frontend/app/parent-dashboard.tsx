import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, useWindowDimensions, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import NoticesScreen from '../components/NoticesScreen';

const palette = {
  background: '#f5f7fb',
  card: '#ffffff',
  border: '#e5e7eb',
  primary: '#1f64f2',
  success: '#1db954',
  danger: '#f87171',
  muted: '#6b7280',
  text: '#1f2937',
  badgeBlue: '#e5edff',
  badgeRed: '#ffecec',
  gradientRed: '#ffecec',
  gradientBlue: '#e9f2ff',
};

export default function ParentDashboard() {
  const { width, height } = useWindowDimensions();
  const isSmall = width < 480;
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

        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/admissions' as never);
        }}>
          <Text style={styles.dropdownIcon}>🎓</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Admissions</Text>
            <Text style={styles.dropdownSubtext}>Track applications</Text>
          </View>
        </Pressable>

        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          // Navigate to announcements/notices
          router.push('/announcements' as never);
        }}>
          <Text style={styles.dropdownIcon}>📢</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Announcements</Text>
            <Text style={styles.dropdownSubtext}>School news & updates</Text>
          </View>
        </Pressable>
      </Animated.View>

      <ScrollView contentContainerStyle={[styles.container, isSmall && styles.containerSmall]} showsVerticalScrollIndicator={false}>
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Parent Portal</Text>
          <Text style={styles.pageSubtitle}>Financial Overview & Payment Management</Text>
        </View>

        {/* Metric Cards */}
        <View style={[styles.metricsRow, isSmall && styles.metricsRowSmall]}>
          <MetricCard title="Total Learners" value="1" accent="#2563EB" bgColor="#EFF6FF" textColor="#2563EB" />
          <MetricCard title="Total Monthly Fees" value="R 2,700" accent="#9333EA" bgColor="#F3E8FF" textColor="#9333EA" />
          <MetricCard title="Outstanding Amount" value="R 2,700" accent="#4F46E5" bgColor="#EEF2FF" textColor="#4F46E5" />
        </View>

        {/* Main Content */}
        <View style={[styles.mainGrid, isSmall && styles.mainGridStack]}>
          {/* Left Column */}
          <View style={[styles.leftCol, isSmall && styles.fullWidth]}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Learner Overview</Text>
                  <Text style={styles.sectionSubtitle}>Monthly fees and payments</Text>
                </View>
                <Pressable style={styles.exportBtn}>
                  <Text style={styles.exportBtnText}>Export</Text>
                </Pressable>
              </View>

              <View style={styles.studentCard}>
                <View style={[styles.studentHeader, isSmall && styles.studentHeaderColumn]}>
                  <View style={styles.studentInfo}>
                    <View style={styles.studentAvatar}>
                      <Text style={styles.studentAvatarText}>MR</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.studentName}>Mikhenso Rikhotso</Text>
                      <Text style={styles.studentMeta}>12 • ID: 2020155260088</Text>
                    </View>
                  </View>
                  <View style={[styles.badgeRow, isSmall && styles.badgeRowStack]}>
                    <Badge text="Facility Linked" color={palette.badgeBlue} textColor={palette.primary} />
                    <Badge text="Overdue" color={palette.badgeRed} textColor={palette.danger} />
                  </View>
                </View>

                <View style={[styles.feeRow, isSmall && styles.feeRowColumn]}>
                  <FeePill label="Monthly Fee" value="R 2,700" color="#FFF2E0" />
                  <FeePill label="Paid" value="R 0" color="#FEFBD4" />
                  <FeePill label="Outstanding" value="R 2,700" color="#E4F0FF" />
                </View>

                <View style={styles.progressTrack}>
                  <View style={styles.progressFill} />
                </View>

                <View style={[styles.nextRow, isSmall && styles.nextRowStack]}>
                  <Text style={styles.nextText}>Next: <Text style={styles.nextBold}>30/12/2025</Text></Text>
                  <Pressable>
                    <Text style={styles.linkText}>View Details</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View style={[styles.rightCol, isSmall && styles.fullWidth]}>
            {/* Fee Breakdown Card */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Fee Breakdown</Text>
              <Text style={styles.sectionSubtitle}>School fees structure</Text>
              <View style={styles.feeList}>
                <FeeItem label="Annual Fee" value="R 32,400" color="#2563eb" />
                <FeeItem label="Term Fee" value="R 8,100" color="#10b981" />
                <FeeItem label="Registration" value="R 800" color="#f59e0b" />
                <FeeItem label="Re-registration" value="R 400" color="#fb923c" />
                <FeeItem label="Sport Fee" value="R 300" color="#6b7280" />
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Monthly</Text>
                <Text style={styles.totalValue}>R 2,700</Text>
              </View>
            </View>

            {/* Upcoming Payments Card */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Upcoming Payments</Text>
              <View style={styles.upcomingCard}>
                <View>
                  <Text style={styles.upcomingName}>Mikhenso Rikhotso</Text>
                  <Text style={styles.upcomingMeta}>Due: 30/12/2025</Text>
                </View>
                <Text style={styles.upcomingAmount}>R 2,700</Text>
                <Pressable style={styles.payBtn}>
                  <Text style={styles.payBtnText}>Make Payment</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Announcements Section */}
        <View style={styles.announcementsSection}>
          <NoticesScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({ title, value, accent, bgColor, textColor, danger }: { title: string; value: string; accent: string; bgColor?: string; textColor?: string; danger?: boolean }) {
  return (
    <View style={[styles.metricCard, { borderColor: accent, backgroundColor: bgColor || '#fff' }]}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={[styles.metricValue, { color: textColor || palette.text }]}>{value}</Text>
    </View>
  );
}

function Badge({ text, color, textColor }: { text: string; color: string; textColor: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

function FeePill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: color }]}>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={styles.pillValue}>{value}</Text>
    </View>
  );
}

function FeeItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.feeItem}>
      <View style={styles.feeItemLeft}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.feeItemLabel}>{label}</Text>
      </View>
      <Text style={styles.feeItemValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  container: { padding: 16, gap: 16 },
  containerSmall: { padding: 12, gap: 12 },
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
  pageHeader: { marginBottom: 8 },
  pageTitle: { fontSize: 22, fontWeight: '800', color: palette.text },
  pageSubtitle: { color: palette.muted, fontSize: 12, marginTop: 2 },
  metricsRow: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  metricsRowSmall: { flexDirection: 'row', gap: 8, justifyContent: 'space-between' },
  metricCard: { flex: 1, borderRadius: 10, padding: 12, borderWidth: 1, backgroundColor: '#fff', minHeight: 90 },
  metricTitle: { color: palette.muted, fontSize: 11, marginBottom: 6, fontWeight: '500' },
  metricValue: { color: palette.text, fontSize: 16, fontWeight: '700' },
  mainGrid: { flexDirection: 'row', gap: 12 },
  mainGridStack: { flexDirection: 'column' },
  fullWidth: { width: '100%' },
  leftCol: { flex: 2 },
  rightCol: { flex: 1, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: palette.border, padding: 14, gap: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: palette.text },
  sectionSubtitle: { color: palette.muted, fontSize: 11, marginTop: 2 },
  exportBtn: { backgroundColor: palette.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  exportBtnText: { color: '#fff', fontWeight: '600', fontSize: 12 },
  studentCard: { backgroundColor: '#f9fafb', borderRadius: 10, borderWidth: 1, borderColor: palette.border, padding: 12, gap: 10 },
  studentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  studentHeaderColumn: { flexDirection: 'column' },
  studentInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  studentAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: palette.badgeBlue, justifyContent: 'center', alignItems: 'center' },
  studentAvatarText: { color: palette.primary, fontWeight: '700', fontSize: 12 },
  studentName: { color: palette.text, fontWeight: '700', fontSize: 14 },
  studentMeta: { color: palette.muted, fontSize: 11 },
  badgeRow: { flexDirection: 'row', gap: 6 },
  badgeRowStack: { width: '100%', marginTop: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  feeRow: { flexDirection: 'row', gap: 8 },
  feeRowColumn: { flexDirection: 'column' },
  pill: { flex: 1, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: palette.border },
  pillLabel: { color: palette.muted, fontSize: 11, marginBottom: 4 },
  pillValue: { color: palette.text, fontWeight: '700', fontSize: 13 },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: '#e5e7eb', overflow: 'hidden' },
  progressFill: { height: '100%', width: '25%', backgroundColor: palette.primary },
  nextRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nextRowStack: { flexDirection: 'column', alignItems: 'flex-start', gap: 8 },
  nextText: { color: palette.text, fontSize: 12 },
  nextBold: { fontWeight: '700' },
  linkText: { color: palette.primary, fontWeight: '700', fontSize: 12 },
  feeList: { gap: 10 },
  feeItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  feeItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  feeItemLabel: { color: palette.text, fontSize: 12 },
  feeItemValue: { color: palette.text, fontWeight: '700', fontSize: 12 },
  totalRow: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: palette.border, flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { color: palette.muted, fontWeight: '600', fontSize: 12 },
  totalValue: { color: palette.text, fontWeight: '800', fontSize: 14 },
  upcomingCard: { borderWidth: 1, borderColor: palette.border, borderRadius: 8, padding: 10, gap: 8, backgroundColor: '#f9fafb' },
  upcomingName: { color: palette.text, fontWeight: '700', fontSize: 13 },
  upcomingMeta: { color: palette.muted, fontSize: 11 },
  upcomingAmount: { color: palette.success, fontWeight: '800', fontSize: 15, marginVertical: 4 },
  payBtn: { backgroundColor: palette.primary, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  payBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  announcementsSection: { marginTop: 8, borderTopWidth: 1, borderTopColor: palette.border, paddingTop: 16 },
});

