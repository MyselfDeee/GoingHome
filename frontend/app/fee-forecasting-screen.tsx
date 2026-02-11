import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';

// Consistent Modern Palette (2026 Design System)
const palette = {
  background: '#F9FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B', 
  textMuted: '#94A3B8',
  primary: '#6366F1',
  primaryLight: '#EEF2FF',
  primaryDark: '#4F46E5',
  border: '#E2E8F0',
  success: '#10B981',
  successBg: '#ECFDF5',
  warningBg: '#FFFBEB',
  warningText: '#B45309',
  shadow: '#0F172A',
  progressBarMetrics: '#E2E8F0',  
};

const FeeForecastingScreen = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />
      
      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Page Header */}
        <View style={styles.headerContainer}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={palette.textSecondary} />
          </Pressable>
          <View>
            <Text style={styles.pageTitle}>Fee Summary</Text>
            <Text style={styles.pageSubtitle}>2026 Academic Year</Text>
          </View>
        </View>

        {/* Student Info Card */}
        <View style={styles.studentCard}>
            <View style={styles.studentAvatar}>
                <Text style={styles.avatarText}>MR</Text>
            </View>
            <View style={styles.studentInfo}>
                <Text style={styles.studentName}>Mikhenso Rikhotso</Text>
                <View style={styles.studentDetailsRow}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Grade 12</Text>
                    </View>
                    <Text style={styles.studentId}>ID: 2020155260088</Text>
                </View>
            </View>
        </View>

        {/* Total Amount Hero Card */}
        <View style={styles.heroCard}>
            <View style={styles.heroContent}>
                <Text style={styles.heroLabel}>Total Annual Fees</Text>
                <Text style={styles.heroAmount}>R 32,400</Text>
                <View style={styles.heroBadge}>
                    <Ionicons name="shield-checkmark" size={14} color="#fff" />
                    <Text style={styles.heroBadgeText}>All Terms Combined</Text>
                </View>
            </View>
            <View style={styles.heroPattern} />
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: palette.primaryLight }]}>
                <Ionicons name="calendar-outline" size={20} color={palette.primary} />
            </View>
            <Text style={styles.statLabel}>Term Fee</Text>
            <Text style={styles.statValue}>R 8,100</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: palette.successBg }]}>
                <Ionicons name="football-outline" size={20} color={palette.success} />
            </View>
            <Text style={styles.statLabel}>Sport Fee</Text>
            <Text style={styles.statValue}>R 300</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: palette.warningBg }]}>
                <Ionicons name="document-text-outline" size={20} color={palette.warningText} />
            </View>
            <Text style={styles.statLabel}>Registration</Text>
            <Text style={styles.statValue}>R 800</Text>
          </View>
        </View>

        {/* Payment Status */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
             <Text style={styles.sectionTitle}>Payment Status</Text>
             <Ionicons name="pie-chart-outline" size={20} color={palette.textSecondary} />
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '50%' }]} />
            </View>
          </View>

          <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                  <Text style={styles.statusLabel}>Amount Paid</Text>
                  <Text style={[styles.statusValue, { color: palette.success }]}>R 16,200</Text>
                  <Text style={styles.statusSub}>50% Complete</Text>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.statusItem}>
                  <Text style={styles.statusLabel}>Outstanding</Text>
                  <Text style={[styles.statusValue, { color: palette.warningText }]}>R 16,200</Text>
                  <Text style={styles.statusSub}>50% Remaining</Text>
              </View>
          </View>
        </View>

        {/* Quarterly Breakdown */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Quarterly Breakdown</Text>
            <Ionicons name="list-outline" size={20} color={palette.textSecondary} />
          </View>
          
          <View style={styles.breakdownList}>
            {[
                { q: 'Q1', m: 'Jan - Mar', a: 'R 8,100' },
                { q: 'Q2', m: 'Apr - Jun', a: 'R 8,100' },
                { q: 'Q3', m: 'Jul - Sep', a: 'R 8,100' },
                { q: 'Q4', m: 'Oct - Dec', a: 'R 8,100' },
            ].map((item, index) => (
                <View key={index} style={[styles.breakdownRow, index === 3 && styles.breakdownRowLast]}>
                    <View style={styles.qBadge}>
                        <Text style={styles.qText}>{item.q}</Text>
                    </View>
                    <View style={styles.qContent}>
                        <Text style={styles.qAmount}>{item.a}</Text>
                        <Text style={styles.qMonths}>{item.m}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={palette.textMuted} />
                </View>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <Pressable style={styles.payBtn}>
            <Ionicons name="card-outline" size={20} color="#fff" />
            <Text style={styles.payBtnText}>Make Payment</Text>
          </Pressable>
          <Pressable style={styles.downloadBtn}>
            <Ionicons name="download-outline" size={20} color={palette.primary} />
            <Text style={styles.downloadBtnText}>Invoice</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
  },
  pageSubtitle: {
    fontSize: 14,
    color: palette.textSecondary,
  },
  
  // Student Card
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: palette.border,
  },
  studentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  studentDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: palette.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.primary,
  },
  studentId: {
    fontSize: 13,
    color: palette.textSecondary,
  },

  // Hero Card
  heroCard: {
    backgroundColor: palette.primary,
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: palette.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    alignItems: 'center',
  },
  heroLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  heroPattern: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: palette.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },

  // Section Cards
  sectionCard: {
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: palette.primaryLight,
    borderRadius: 6,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarBg: {
    flex: 1,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: palette.success,
    borderRadius: 6,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: palette.border,
  },
  statusLabel: {
    fontSize: 13,
    color: palette.textSecondary,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statusSub: {
    fontSize: 11,
    color: palette.textMuted,
  },

  // Breakdown List
  breakdownList: {
    gap: 0,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  breakdownRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  qBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: palette.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  qText: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.primary,
  },
  qContent: {
    flex: 1,
  },
  qAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.text,
  },
  qMonths: {
    fontSize: 13,
    color: palette.textSecondary,
  },

  // Buttons
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  payBtn: {
    flex: 1,
    backgroundColor: palette.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: palette.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  payBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  downloadBtn: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  downloadBtnText: {
    color: palette.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});


export default FeeForecastingScreen;

