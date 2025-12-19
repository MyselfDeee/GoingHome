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

const financingPlans = [
  {
    id: 'monthly',
    title: 'Monthly Debit Order',
    badge: 'Save 3%',
    badgeColor: '#2563eb',
    amount: 'R 2,700',
    period: 'per month',
    features: ['Standard debit order', 'No upfront payment required', 'Predictable monthly budget'],
  },
  {
    id: 'term',
    title: 'Pay Per Term',
    badge: 'Save 3%',
    badgeColor: '#2563eb',
    amount: 'R 10,476',
    period: 'per term',
    features: ['Pay 3 times per year', '3% discount on total fees', 'Aligned with school terms'],
  },
  {
    id: 'annual',
    title: 'Pay Once Per Year',
    badge: 'Best Value',
    badgeColor: '#10b981',
    badge2: 'Save 5%',
    amount: 'R 30,780',
    period: 'per year',
    features: ['Maximum discount available', 'One payment, no worries', 'Save R 1,620 annually'],
  },
  {
    id: 'bnpl',
    title: 'Buy Now, Pay Later',
    badge: '12% Cost',
    badgeColor: '#6b7280',
    amount: 'R 3,024',
    period: 'per month',
    features: ['Pay school fees immediately', 'Flexible repayment terms', '12% cost of credit applies'],
  },
  {
    id: 'forward',
    title: 'Forward Funding',
    badge: '15% Cost',
    badgeColor: '#6b7280',
    badge2: '6-12 months',
    amount: 'R 3,105',
    period: 'per month',
    features: ['Cover funding gap', 'Quick approval process', '15% cost of credit applies'],
  },
  {
    id: 'sibling',
    title: 'Sibling Benefit',
    badge: 'Save 10%',
    badgeColor: '#2563eb',
    badge2: 'Multiple children',
    amount: 'R 2,430',
    period: 'per child/month',
    features: ['10% discount per additional child', 'Combined family billing', '1 children selected'],
  },
  {
    id: 'eft',
    title: 'Pay via EFT',
    badge: null,
    amount: 'R 32,400',
    period: 'per year',
    features: ['Direct bank transfer', 'No intermediary fees', 'School instructions provided'],
  },
];

export default function Step4Financing() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const isMedium = width < 768;
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
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

  const handleContinue = () => {
    if (!selectedPlan) {
      alert('Please select a payment plan');
      return;
    }
    router.push('/re-registration/step5-declaration' as never);
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

        <View style={[styles.contentRow, isMedium && styles.contentColumn]}>
          {/* Sidebar */}
          {isMedium ? (
            <ProgressTracker steps={steps} currentStep={3} completion={75} compact={true} />
          ) : (
            <View style={styles.sidebar}>
              <ProgressTracker steps={steps} currentStep={3} completion={75} />
            </View>
          )}

          {/* Main Content */}
          <View style={[styles.mainContent, isMedium && styles.mainContentMobile]}>
            {/* Affordability Assessment */}
            <View style={styles.assessmentCard}>
              <View style={styles.assessmentHeader}>
                <Text style={styles.assessmentTitle}>Affordability Assessment</Text>
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>Financing Recommended</Text>
                </View>
              </View>
              <View style={styles.metricsRow}>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Annual School Fees</Text>
                  <Text style={styles.metricValue}>R 32,400</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Available Disposable Income</Text>
                  <Text style={styles.metricValue}>R 65,000</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Funding Gap</Text>
                  <Text style={styles.metricValue}>R 0</Text>
                </View>
              </View>
              <View style={styles.ratioSection}>
                <Text style={styles.ratioLabel}>Fee-to-Income Ratio</Text>
                <Text style={styles.ratioValue}>50%</Text>
                <View style={styles.ratioBar}>
                  <View style={[styles.ratioSegment, styles.ratioComfortable, { width: '50%' }]} />
                  <View style={[styles.ratioSegment, styles.ratioManageable]} />
                  <View style={[styles.ratioSegment, styles.ratioChallenging]} />
                </View>
                <View style={styles.ratioLabels}>
                  <Text style={styles.ratioLabelText}>Comfortable (0-50%)</Text>
                  <Text style={styles.ratioLabelText}>Manageable (50-70%)</Text>
                  <Text style={styles.ratioLabelText}>Challenging (70%+)</Text>
                </View>
              </View>
            </View>

            {/* Financing Options */}
            <Text style={styles.sectionTitle}>Available Financing Options</Text>
            <View style={[styles.plansGrid, isSmall && styles.plansGridMobile]}>
              {financingPlans.map((plan) => (
                <Pressable
                  key={plan.id}
                  style={[
                    styles.planCard,
                    isSmall && styles.planCardMobile,
                    selectedPlan === plan.id && styles.planCardSelected,
                  ]}
                  onPress={() => setSelectedPlan(plan.id)}>
                  {selectedPlan === plan.id && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>✓ Selected</Text>
                    </View>
                  )}
                  <View style={styles.planHeader}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    {plan.badge && (
                      <View style={[styles.planBadge, { backgroundColor: plan.badgeColor }]}>
                        <Text style={styles.planBadgeText}>{plan.badge}</Text>
                      </View>
                    )}
                  </View>
                  {plan.badge2 && (
                    <View style={styles.planBadge2}>
                      <Text style={styles.planBadge2Text}>{plan.badge2}</Text>
                    </View>
                  )}
                  <Text style={styles.planAmount}>{plan.amount}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                  <View style={styles.planFeatures}>
                    {plan.features.map((feature, idx) => (
                      <View key={idx} style={styles.planFeature}>
                        <Text style={styles.planFeatureIcon}>✓</Text>
                        <Text style={styles.planFeatureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  <Pressable
                    style={[
                      styles.selectPlanBtn,
                      selectedPlan === plan.id && styles.selectPlanBtnSelected,
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}>
                    <Text
                      style={[
                        styles.selectPlanBtnText,
                        selectedPlan === plan.id && styles.selectPlanBtnTextSelected,
                      ]}>
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Text>
                  </Pressable>
                </Pressable>
              ))}
            </View>

            {/* Navigation */}
            <View style={styles.navButtons}>
              <Pressable style={styles.backBtnNav} onPress={() => router.back()}>
                <Text style={styles.backBtnText}>Previous</Text>
              </Pressable>
              <Pressable
                style={[styles.continueBtn, !selectedPlan && styles.continueBtnDisabled]}
                onPress={handleContinue}>
                <Text style={styles.continueBtnText}>Continue</Text>
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
  brandSubtitle: { color: palette.muted, fontSize: 11 },
  container: { padding: 16, paddingTop: 24, paddingBottom: 32 },
  mainTitle: { fontSize: 24, fontWeight: '800', color: palette.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: palette.muted, marginBottom: 20 },
  contentRow: { flexDirection: 'row', gap: 16 },
  contentColumn: { flexDirection: 'column' },
  sidebar: { width: 200, flexShrink: 0 },
  mainContent: { flex: 1, minWidth: 0 },
  mainContentMobile: { width: '100%' },
  assessmentCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: palette.border,
  },
  assessmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  assessmentTitle: { fontSize: 16, fontWeight: '700', color: palette.text },
  recommendedBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  recommendedText: { fontSize: 11, fontWeight: '700', color: '#92400e' },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metric: { flex: 1 },
  metricLabel: { fontSize: 12, color: palette.muted, marginBottom: 4 },
  metricValue: { fontSize: 18, fontWeight: '700', color: palette.text },
  ratioSection: { marginTop: 16 },
  ratioLabel: { fontSize: 13, fontWeight: '600', color: palette.text, marginBottom: 4 },
  ratioValue: { fontSize: 20, fontWeight: '700', color: palette.primary, marginBottom: 8 },
  ratioBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
    flexDirection: 'row',
    marginBottom: 8,
    overflow: 'hidden',
  },
  ratioSegment: { height: '100%' },
  ratioComfortable: { backgroundColor: palette.success },
  ratioManageable: { flex: 1, backgroundColor: '#fbbf24' },
  ratioChallenging: { flex: 1, backgroundColor: '#ef4444' },
  ratioLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratioLabelText: { fontSize: 10, color: palette.muted },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 16,
  },
  plansGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  plansGridMobile: {
    gap: 12,
    justifyContent: 'flex-start',
  },
  plansColumn: { flexDirection: 'column' },
  planCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: palette.border,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  planCardMobile: {
    width: '100%',
  },
  planCardSelected: {
    borderColor: palette.primary,
    backgroundColor: '#f0f7ff',
    borderWidth: 2.5,
    shadowColor: palette.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: palette.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: palette.success,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  selectedBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planTitle: { fontSize: 15, fontWeight: '700', color: palette.text, flex: 1 },
  planBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  planBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  planBadge2: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  planBadge2Text: { fontSize: 10, fontWeight: '600', color: palette.muted },
  planAmount: { fontSize: 24, fontWeight: '800', color: palette.text, marginBottom: 4 },
  planPeriod: { fontSize: 13, color: palette.muted, marginBottom: 12 },
  planFeatures: { marginBottom: 12 },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  planFeatureIcon: { color: palette.success, fontSize: 14, marginRight: 8 },
  planFeatureText: { fontSize: 12, color: palette.text, flex: 1 },
  selectPlanBtn: {
    backgroundColor: palette.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 2,
    borderColor: palette.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectPlanBtnSelected: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  selectPlanBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  selectPlanBtnTextSelected: { color: '#fff', fontWeight: '700', fontSize: 13 },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  backBtnNav: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: palette.border,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backBtnText: { color: palette.text, fontWeight: '700', fontSize: 14, textAlign: 'center' },
  continueBtn: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: palette.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  continueBtnDisabled: {
    backgroundColor: palette.muted,
    opacity: 0.5,
  },
  continueBtnText: { color: '#fff', fontWeight: '700', fontSize: 14, textAlign: 'center' },
});

