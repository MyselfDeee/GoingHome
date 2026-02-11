import React from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
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
  warningBg: '#FFFBEB',
  warningText: '#B45309',
  shadow: '#0F172A',
  inputBg: '#F8FAFC',
};

export default function FeeForecasting() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />
      
      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerCard}>
            <View style={styles.headerTopRow}>
                <View style={styles.headerTitleRow}>
                    <View style={styles.headerIconBox}>
                        <Ionicons name="pie-chart-outline" size={24} color={palette.primary} />
                    </View>
                    <Text style={styles.headerTitle}>Fee Forecasting</Text>
                </View>
                {/* Optional Top Actions */}
                <Pressable style={styles.iconBtn}>
                    <Ionicons name="ellipsis-horizontal" size={20} color={palette.textSecondary} />
                </Pressable>
            </View>
            <View style={styles.headerDivider} />
            <View style={styles.headerBottomHelper}>
                 <Text style={styles.headerSubtitle}>Financial Planning</Text>
                 <Text style={styles.headerDescription}>
                    Plan your budget and manage fee payments
                 </Text>
            </View>
        </View>

        {/* Budget Planning Tool - Hero Card */}
        <View style={styles.mainCard}>
            <View style={styles.mainCardHeader}>
                <View style={styles.folderIconContainer}>
                    <Text style={{fontSize: 24}}>📊</Text>
                    <View style={styles.checkBadge}>
                         <Ionicons name="star" size={10} color="#fff" />
                    </View>
                </View>
                <View style={styles.mainCardTitleBlock}>
                    <Text style={styles.mainCardTitle}>Budget Planning Tool</Text>
                </View>
            </View>
            
            <Text style={styles.mainCardDescription}>
                Project future fees and create a budget plan for your learners. Get insights into payment trends and manage cash flow effectively.
            </Text>

            <View style={styles.mainCardDivider} />

            <Pressable
                style={({pressed}) => [styles.startBtn, pressed && styles.startBtnPressed]}
                onPress={() => router.push('/fee-forecasting-screen' as never)}
            >
                <Text style={styles.startBtnText}>View Fee Forecast</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
            </Pressable>
        </View>

        {/* 2026 Forecast Table Card */}
        <View style={styles.forecastCard}>
            <View style={styles.cardHeaderRow}>
                 <Text style={styles.sectionHeaderTitle}>2026 Fee Forecast</Text>
                 <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>Active</Text>
                 </View>
            </View>

            <View style={styles.forecastList}>
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
                <View style={styles.forecastRowLast}>
                    <Text style={styles.forecastLabel}>Oct - Dec</Text>
                    <Text style={styles.forecastAmount}>R 8,100</Text>
                </View>
            </View>

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Annual Total</Text>
                <Text style={styles.totalAmount}>R 32,400</Text>
            </View>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  // Header Card Styles
  headerCard: {
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: palette.border,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: palette.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  headerDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginBottom: 16,
  },
  headerBottomHelper: {
    gap: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerDescription: {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 20,
  },

  // Main Action Card (Hero)
  mainCard: {
    backgroundColor: palette.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: palette.border,
  },
  mainCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  folderIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: palette.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: palette.success,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.card,
  },
  mainCardTitleBlock: {
    flex: 1,
  },
  mainCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 2,
  },
  mainCardDescription: {
    fontSize: 15,
    color: palette.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  mainCardDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginBottom: 20,
  },
  startBtn: {
    backgroundColor: palette.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: palette.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startBtnPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Forecast Card
  forecastCard: {
    backgroundColor: palette.card,
    borderRadius: 20,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  tagContainer: {
    backgroundColor: palette.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.primary,
  },
  forecastList: {
    paddingHorizontal: 20,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  forecastRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  forecastLabel: {
    fontSize: 15,
    color: palette.textSecondary,
    fontWeight: '500',
  },
  forecastAmount: {
    fontSize: 15,
    color: palette.text,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.primary,
  },
});
