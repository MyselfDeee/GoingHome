import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from '../../components/SideMenu';

// Consistent Palette
const palette = {
  background: '#F9FAFC', 
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B', 
  textMuted: '#94A3B8',
  primary: '#6366F1',
  primaryLight: '#EEF2FF',
  border: '#E2E8F0',
  success: '#10B981',
  warningBg: '#FFFBEB',
  warningText: '#B45309',
  shadow: '#0F172A',
  inputBg: '#F8FAFC',
};

// Mock Data
const mockStudents = [
  { 
      id: '1', 
      initials: 'MR',
      firstName: 'Mikhenso', 
      lastName: 'Rikhotso',
      grade: 'Grade 11', 
      annualFees: 'R 32,400' 
  },
  { 
      id: '2', 
      initials: 'TR',
      firstName: 'Tlangelani', 
      lastName: 'Rikhotso',
      grade: 'Grade 9', 
      annualFees: 'R 28,500' 
  },
];

const financingPlans = [
  {
    id: 'monthly',
    category: 'standard',
    title: 'Monthly Debit Order',
    badge: 'Save 3%',
    badgeColor: palette.primary,
    amount: 'R 2,700',
    period: 'pm',
    description: '10 monthly installments via debit order.',
  },
  {
    id: 'term',
    category: 'standard',
    title: 'Pay Per Term',
    badge: 'Popular',
    badgeColor: '#10B981',
    amount: 'R 10,476',
    period: 'per term',
    description: 'Pay 3 times a year at start of term.',
  },
  {
    id: 'annual',
    category: 'standard',
    title: 'Upfront Annual',
    badge: 'Best Value',
    badgeColor: '#F59E0B',
    amount: 'R 30,780',
    period: 'once',
    description: 'Single payment with 5% discount.',
  },
  {
    id: 'bnpl',
    category: 'credit',
    title: 'Buy Now, Pay Later',
    badge: 'Flexible',
    badgeColor: palette.textSecondary,
    amount: 'R 3,024',
    period: 'pm',
    description: 'Immediate fee coverage. 12% cost of credit.',
  },
  {
    id: 'forward',
    category: 'credit',
    title: 'Forward Funding',
    badge: 'Gap Cover',
    badgeColor: palette.textSecondary,
    amount: 'R 3,105',
    period: 'pm',
    description: 'Covers funding gaps. 15% cost of credit.',
  },
  {
    id: 'sibling',
    category: 'special',
    title: 'Sibling Benefit',
    badge: 'Save 10%',
    badgeColor: palette.primary,
    amount: 'R 2,430',
    period: 'pm',
    description: 'Discount per child. Combined billing.',
  },
  {
    id: 'eft',
    category: 'special',
    title: 'Pay via EFT',
    badge: undefined,
    badgeColor: undefined,
    amount: 'R 32,400',
    period: 'year',
    description: 'Direct bank transfer. No intermediary fees.',
  },
];

const PlanItem = ({ plan, selected, onSelect }: PlanCardProps) => (
    <Pressable 
        style={[styles.planItem, selected && styles.planItemSelected]} 
        onPress={onSelect}
    >
        <View style={styles.planItemLeft}>
            <View style={[styles.radioBase, selected && styles.radioSelected]}>
                {selected && <View style={styles.radioDot} />}
            </View>
        </View>
        
        <View style={styles.planItemCenter}>
            <View style={styles.titleRow}>
                 <Text style={styles.planItemTitle}>{plan.title}</Text>
                 {plan.badge && (
                    <View style={[styles.miniBadge, { backgroundColor: plan.badgeColor }]}>
                        <Text style={styles.miniBadgeText}>{plan.badge}</Text>
                    </View>
                 )}
            </View>
            <Text style={styles.planItemDesc}>{plan.description}</Text>
        </View>

        <View style={styles.planItemRight}>
             <Text style={styles.planItemAmount}>{plan.amount}</Text>
             <Text style={styles.planItemPeriod}>{plan.period}</Text>
        </View>
    </Pressable>
);

const PlanGroup = ({ title, plans, selectedPlanId, onSelect }: any) => (
    <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{title}</Text>
        <View style={styles.groupList}>
            {plans.map((plan: any) => (
                <PlanItem 
                    key={plan.id} 
                    plan={plan} 
                    selected={selectedPlanId === plan.id} 
                    onSelect={() => onSelect(plan.id)}
                />
            ))}
        </View>
    </View>
);


export default function Step4Financing() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleLogout = () => {
    router.replace('/(tabs)' as never);
  };

  const handleContinue = () => {
      if (!selectedPlanId) {
          alert("Please select a financing plan to continue.");
          return;
      }
      router.push('/re-registration/step5-declaration' as never);
  };

  const totalFee = mockStudents.reduce((acc, s) => {
      const amount = parseInt(s.annualFees.replace(/[^0-9]/g, ''));
      return acc + amount;
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />

      {/* Top Nav */}
      <View style={styles.topNav}>
        <Pressable 
            style={({pressed}) => [styles.menuBtn, pressed && styles.pressedBtn]} 
            onPress={() => setMenuOpen(true)}
        >
          <Ionicons name="menu" size={24} color={palette.text} />
        </Pressable>
      </View>

      <SideMenu isVisible={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.headerContainer}>
              <View style={styles.headerIconBox}>
                  <Ionicons name="wallet-outline" size={24} color={palette.primary} />
              </View>
              <View>
                  <Text style={styles.headerTitle}>School Fees</Text>
                  <Text style={styles.headerSubtitle}>Choose your payment terms</Text>
              </View>
          </View>

          {/* Affordability Summary */}
          <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                  <Text style={styles.summaryTitle}>Total Annual Fees</Text>
                  <Text style={styles.summaryAmount}>R {totalFee.toLocaleString()}</Text>
              </View>
              
              <View style={styles.ratioBarContainer}>
                  <View style={styles.ratioLabels}>
                      <Text style={styles.ratioText}>Affordability Check</Text>
                      <Text style={[styles.ratioText, { color: palette.success }]}>Good</Text>
                  </View>
                  <View style={styles.ratioTrack}>
                      <View style={[styles.ratioFill, { width: '35%' }]} />
                  </View>
                  <Text style={styles.ratioHelper}>Fees are approx. 12% of reported income</Text>
              </View>
          </View>

         {/* Steps Indicator */}
         <View style={styles.stepsCard}>
            <Text style={styles.sectionHeaderTitle}>Registration Steps</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.stepsScrollContent}
            >
                {/* Step 1 */}
                <View style={styles.stepItemCompleted}>
                    <Ionicons name="checkmark-circle" size={20} color={palette.success} />
                    <Text style={styles.stepTextCompleted}>Children</Text>
                </View>
                <View style={styles.stepDivider} />
                {/* Step 2 */}
                <View style={styles.stepItemCompleted}>
                    <Ionicons name="checkmark-circle" size={20} color={palette.success} />
                    <Text style={styles.stepTextCompleted}>Details</Text>
                </View>
                <View style={styles.stepDivider} />
                {/* Step 3 */}
                <View style={styles.stepItemActive}>
                    <View style={styles.stepCircleActive}>
                            <Text style={styles.stepNumberActive}>3</Text>
                    </View>
                    <Text style={styles.stepTextActive}>Financing</Text>
                </View>
                <View style={styles.stepDivider} />
                {/* Step 4 */}
                <View style={styles.stepItemInactive}>
                    <Text style={styles.stepNumberInactive}>4</Text>
                    <Text style={styles.stepTextInactive}>Confirm</Text>
                </View>
            </ScrollView>
        </View>

        {/* Global Plan Selection */}
        <Text style={styles.listTitle}>Select Payment Plan</Text>
        <Text style={styles.listSubtitle}>This plan will apply to all students listed above.</Text>
        
        <View style={styles.plansList}>
            <PlanGroup 
                title="Standard Payment Terms"
                plans={financingPlans.filter(p => p.category === 'standard')}
                selectedPlanId={selectedPlanId}
                onSelect={setSelectedPlanId}
            />
            <PlanGroup 
                title="Credit & Financing"
                plans={financingPlans.filter(p => p.category === 'credit')}
                selectedPlanId={selectedPlanId}
                onSelect={setSelectedPlanId}
            />
            <PlanGroup 
                title="Other Arrangements"
                plans={financingPlans.filter(p => p.category === 'special')}
                selectedPlanId={selectedPlanId}
                onSelect={setSelectedPlanId}
            />
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
            <Pressable 
                style={({pressed}) => [styles.cancelBtn, pressed && styles.pressedBtn]}
                onPress={() => router.back()}
            >
                <Text style={styles.cancelBtnText}>Back</Text>
            </Pressable>
            
            <Pressable
                style={({pressed}) => [styles.continueBtn, pressed && styles.pressedBtn]}
                onPress={handleContinue}
            >
                <Text style={styles.continueBtnText}>Review & Submit →</Text>
            </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  topNav: {
      paddingHorizontal: 16,
      paddingVertical: 10,
  },
  menuBtn: {
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
  },
  pressedBtn: { opacity: 0.8 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Header
  headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 8,
  },
  headerIconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: palette.text },
  headerSubtitle: { fontSize: 14, color: palette.textSecondary },

  // Summary Card
  summaryCard: {
      backgroundColor: palette.text, // Dark card
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: palette.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
  },
  summaryHeader: {
      marginBottom: 20,
  },
  summaryTitle: { fontSize: 13, color: palette.textMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  summaryAmount: { fontSize: 32, fontWeight: '700', color: '#fff' },
  
  ratioBarContainer: { gap: 8 },
  ratioLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  ratioText: { fontSize: 12, fontWeight: '600', color: '#fff' },
  ratioTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' },
  ratioFill: { height: '100%', backgroundColor: palette.success, borderRadius: 3 },
  ratioHelper: { fontSize: 11, color: palette.textMuted, marginTop: 4 },

  // Steps
  stepsCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 32,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
  },
  sectionHeaderTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.textSecondary,
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
  },
  stepsScrollContent: { flexDirection: 'row', alignItems: 'center' },
  stepItemCompleted: { flexDirection: 'row', alignItems: 'center', gap: 6, opacity: 0.6 },
  stepTextCompleted: { fontSize: 13, fontWeight: '600', color: palette.text, textDecorationLine: 'line-through' },
  stepItemActive: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: palette.primaryLight,
      paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, gap: 8,
  },
  stepCircleActive: {
      width: 20, height: 20, borderRadius: 10, backgroundColor: palette.primary,
      justifyContent: 'center', alignItems: 'center',
  },
  stepNumberActive: { color: '#fff', fontSize: 11, fontWeight: '700' },
  stepTextActive: { fontSize: 13, fontWeight: '600', color: palette.primary },
  stepItemInactive: { flexDirection: 'row', alignItems: 'center', gap: 6, opacity: 0.5 },
  stepNumberInactive: {
      width: 20, height: 20, borderRadius: 10, backgroundColor: palette.border,
      textAlign: 'center', textAlignVertical: 'center', fontSize: 11, fontWeight: '600',
      color: palette.textSecondary, overflow: 'hidden',
  },
  stepTextInactive: { fontSize: 13, color: palette.textSecondary },
  stepDivider: { height: 1, width: 24, backgroundColor: palette.border, marginHorizontal: 8 },

  // Students List
  studentsListCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 32,
      borderWidth: 1, borderColor: palette.border,
  },
  studentSimpleRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: palette.background,
  },
  studentSimpleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarCircleSmall: {
      width: 32, height: 32, borderRadius: 16, backgroundColor: palette.primaryLight,
      justifyContent: 'center', alignItems: 'center',
  },
  avatarTextSmall: { fontSize: 12, fontWeight: '700', color: palette.primary },
  studentNameSimple: { fontSize: 14, fontWeight: '600', color: palette.text },
  studentGradeSimple: { fontSize: 12, color: palette.textSecondary },
  studentFeeSimple: { fontSize: 14, fontWeight: '600', color: palette.text },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 },
  totalLabel: { fontSize: 14, fontWeight: '600', color: palette.textSecondary },
  totalValue: { fontSize: 14, fontWeight: '700', color: palette.text },

  // Plan Selection
  listTitle: { fontSize: 16, fontWeight: '700', color: palette.text, marginBottom: 4 },
  listSubtitle: { fontSize: 13, color: palette.textSecondary, marginBottom: 16 },
  plansList: { gap: 16, marginBottom: 40 },
  
  // Plan Groups
  groupContainer: { marginBottom: 24 },
  groupTitle: { fontSize: 13, fontWeight: '700', color: palette.textSecondary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  groupList: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: palette.border },

  // Plan Item (Compact)
  planItem: {
      flexDirection: 'row', alignItems: 'center', padding: 16,
      borderBottomWidth: 1, borderBottomColor: palette.border,
      backgroundColor: '#fff',
  },
  planItemSelected: { backgroundColor: '#F5F7FF' },
  planItemLeft: { marginRight: 12 },
  radioBase: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: palette.border, justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: palette.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: palette.primary },
  
  planItemCenter: { flex: 1, paddingRight: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  planItemTitle: { fontSize: 14, fontWeight: '700', color: palette.text },
  planItemDesc: { fontSize: 12, color: palette.textSecondary, lineHeight: 16 },
  
  planItemRight: { alignItems: 'flex-end', minWidth: 70 },
  planItemAmount: { fontSize: 15, fontWeight: '700', color: palette.text },
  planItemPeriod: { fontSize: 11, color: palette.textSecondary },

  miniBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  miniBadgeText: { fontSize: 9, fontWeight: '700', color: '#fff' },

  // Footer Buttons
  footerRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 20,
  },
  cancelBtn: {
      paddingVertical: 12, paddingHorizontal: 24, borderRadius: 26, borderWidth: 1, borderColor: palette.border, backgroundColor: '#fff',
  },
  cancelBtnText: { fontSize: 14, fontWeight: '600', color: palette.textSecondary },
  continueBtn: {
      flex: 1, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 26, backgroundColor: palette.primary,
      alignItems: 'center', shadowColor: palette.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  continueBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
});
