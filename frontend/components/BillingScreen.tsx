import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  getStudentFeeData,
  generateBillingInsights,
  calculatePaymentPlans,
  formatCurrency,
  getPaymentStatusColor,
  FeeData,
  PaymentPlan,
} from '../utils/billingService';

const palette = {
  background: '#f5f7fb',
  card: '#ffffff',
  border: '#e5e7eb',
  primary: '#1f64f2',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  muted: '#6b7280',
  text: '#1f2937',
};

export default function BillingScreen() {
  const [feeData, setFeeData] = useState<FeeData | null>(null);
  const [insights, setInsights] = useState<string>('');
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    loadBillingData();
  }, []);

  async function loadBillingData() {
    try {
      setLoading(true);

      // Fetch fee data
      const data = await getStudentFeeData('2020155260088');
      setFeeData(data);

      // Generate AI insights
      const aiInsights = await generateBillingInsights(data);
      setInsights(aiInsights);

      // Calculate payment plans
      const plans = calculatePaymentPlans(data);
      setPaymentPlans(plans);
    } catch (error) {
      console.error('Error loading billing data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !feeData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary} />
          <Text style={styles.loadingText}>Loading billing information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = getPaymentStatusColor(feeData.outstandingAmount, feeData.totalFees);
  const paidPercentage = ((feeData.paidAmount / feeData.totalFees) * 100).toFixed(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Billing & Fees</Text>
          <Text style={styles.subtitle}>Student Fee Management</Text>
        </View>

        {/* Fee Summary Cards */}
        <View style={styles.feeCards}>
          <View style={[styles.feeCard, { backgroundColor: '#eff6ff' }]}>
            <Text style={styles.feeLabel}>Total Fees</Text>
            <Text style={styles.feeAmount}>{formatCurrency(feeData.totalFees)}</Text>
            <Text style={styles.feeDetail}>Annual commitment</Text>
          </View>

          <View style={[styles.feeCard, { backgroundColor: '#f0fdf4' }]}>
            <Text style={styles.feeLabel}>Amount Paid</Text>
            <Text style={[styles.feeAmount, { color: palette.success }]}>
              {formatCurrency(feeData.paidAmount)}
            </Text>
            <Text style={styles.feeDetail}>{paidPercentage}% complete</Text>
          </View>

          <View style={[styles.feeCard, { backgroundColor: '#fef2f2' }]}>
            <Text style={styles.feeLabel}>Outstanding</Text>
            <Text style={[styles.feeAmount, { color: palette.danger }]}>
              {formatCurrency(feeData.outstandingAmount)}
            </Text>
            <Text style={styles.feeDetail}>Amount due</Text>
          </View>
        </View>

        {/* Fee Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fee Breakdown</Text>
          <View style={styles.breakdownCard}>
            <FeeBreakdownRow label="Annual Fees" amount={feeData.annualFees} />
            <FeeBreakdownRow label="Term Fees" amount={feeData.termFees} />
            <FeeBreakdownRow label="Sport Fees" amount={feeData.sportFees} />
            <FeeBreakdownRow label="Registration Fee" amount={feeData.registrationFee} />
            <FeeBreakdownRow
              label="Re-registration Fee"
              amount={feeData.reRegistrationFee}
              isBorder={false}
            />
          </View>
        </View>

        {/* Payment Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Payment Plans</Text>
          {paymentPlans.map((plan, index) => (
            <Pressable
              key={index}
              style={[
                styles.planCard,
                selectedPlan === plan.name && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan(plan.name)}
            >
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planFrequency}>{plan.frequency}</Text>
                </View>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>Save {plan.discount}</Text>
                </View>
              </View>
              <View style={styles.planAmount}>
                <Text style={styles.planAmountLabel}>Per Payment</Text>
                <Text style={styles.planAmountValue}>
                  {formatCurrency(plan.discountedAmount)}
                </Text>
              </View>
              {selectedPlan === plan.name && (
                <View style={styles.selectIndicator}>
                  <Text style={styles.selectIndicatorText}>✓ Selected</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* AI Insights */}
        {insights && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financial Insights</Text>
            <View style={styles.insightsCard}>
              <Text style={styles.insightsText}>{insights}</Text>
            </View>
          </View>
        )}

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          {feeData.paymentMethods.map((method, index) => (
            <View key={index} style={styles.methodCard}>
              <View style={styles.methodIcon}>
                <Text style={styles.methodIconText}>
                  {method.type === 'card' ? '💳' : '🏦'}
                </Text>
              </View>
              <View style={styles.methodDetails}>
                <Text style={styles.methodType}>{method.details}</Text>
                {method.expiryDate && (
                  <Text style={styles.methodExpiry}>{method.expiryDate}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Payment Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Alerts</Text>
          {feeData.paymentAlerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <View
                style={[
                  styles.alertIcon,
                  {
                    backgroundColor:
                      alert.type === 'due_soon'
                        ? '#fef3c7'
                        : alert.type === 'overdue'
                          ? '#fee2e2'
                          : '#e0f2fe',
                  },
                ]}
              >
                <Text style={styles.alertIconText}>
                  {alert.type === 'due_soon' ? '⏰' : alert.type === 'overdue' ? '⚠️' : 'ℹ️'}
                </Text>
              </View>
              <View style={styles.alertDetails}>
                <Text style={styles.alertTitle}>{alert.message}</Text>
                <Text style={styles.alertDate}>{alert.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={[styles.button, styles.primaryButton]}>
            <Text style={styles.buttonText}>Make Payment</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>Download Statement</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeeBreakdownRow({
  label,
  amount,
  isBorder = true,
}: {
  label: string;
  amount: number;
  isBorder?: boolean;
}) {
  return (
    <View style={[styles.breakdownRow, !isBorder && styles.noBorder]}>
      <Text style={styles.breakdownLabel}>{label}</Text>
      <Text style={styles.breakdownAmount}>{formatCurrency(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: palette.muted,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: palette.muted,
  },
  feeCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  feeCard: {
    flex: 1,
    minWidth: 100,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border,
  },
  feeLabel: {
    fontSize: 12,
    color: palette.muted,
    marginBottom: 4,
    fontWeight: '600',
  },
  feeAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 2,
  },
  feeDetail: {
    fontSize: 11,
    color: palette.muted,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 12,
  },
  breakdownCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  breakdownLabel: {
    fontSize: 14,
    color: palette.text,
    fontWeight: '500',
  },
  breakdownAmount: {
    fontSize: 14,
    color: palette.text,
    fontWeight: '600',
  },
  planCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: palette.border,
  },
  planCardSelected: {
    borderColor: palette.primary,
    backgroundColor: '#f0f7ff',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  planName: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 2,
  },
  planFrequency: {
    fontSize: 12,
    color: palette.muted,
  },
  planBadge: {
    backgroundColor: palette.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  planBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  planAmount: {
    marginBottom: 8,
  },
  planAmountLabel: {
    fontSize: 11,
    color: palette.muted,
    marginBottom: 2,
  },
  planAmountValue: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.primary,
  },
  selectIndicator: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  selectIndicatorText: {
    fontSize: 12,
    color: palette.success,
    fontWeight: '600',
  },
  insightsCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  insightsText: {
    fontSize: 13,
    color: palette.text,
    lineHeight: 20,
  },
  methodCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodIconText: {
    fontSize: 20,
  },
  methodDetails: {
    flex: 1,
  },
  methodType: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.text,
    marginBottom: 2,
  },
  methodExpiry: {
    fontSize: 12,
    color: palette.muted,
  },
  alertCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: palette.border,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  alertIconText: {
    fontSize: 18,
  },
  alertDetails: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.text,
    marginBottom: 2,
  },
  alertDate: {
    fontSize: 12,
    color: palette.muted,
  },
  actionButtons: {
    gap: 10,
    marginTop: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: palette.primary,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: palette.border,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.primary,
  },
});
