import React from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';

// Modern Palette 2026 (Indigo/Slate)
const palette = {
  background: '#F9FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B', 
  textMuted: '#94A3B8',
  primary: '#6366F1',
  primaryLight: '#EEF2FF',
  primaryDark: '#4338CA',
  border: '#E2E8F0',
  success: '#10B981',
  warningBg: '#FFFBEB',
  warningBorder: '#FCD34D',
  warningText: '#B45309',
  shadow: '#0F172A',
};

export default function RequestStatement() {
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
                        <Ionicons name="document-text-outline" size={24} color={palette.primary} />
                    </View>
                    <Text style={styles.headerTitle}>Statements & Reports</Text>
                </View>
            </View>
            <View style={styles.headerDivider} />
            <Text style={styles.headerSubtitle}>Financial Records</Text>
            <Text style={styles.headerDescription}>
                Access and download your official account statements and payment history.
            </Text>
        </View>

        {/* Hero Action Card */}
        <View style={styles.mainCard}>
          <View style={styles.heroHeader}>
            <View style={styles.heroIconContainer}>
                <Ionicons name="cloud-download-outline" size={28} color={palette.primary} />
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.mainCardTitle}>Account Statement</Text>
                <Text style={styles.mainCardDescription}>
                    Generating a statement includes all transactions, payments, and outstanding balances to date.
                </Text>
            </View>
          </View>

          <View style={styles.mainCardDivider} />
          
          <Pressable style={({pressed}) => [styles.actionBtn, pressed && styles.actionBtnPressed]}>
            <Text style={styles.actionBtnText}>Generate Statement</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Options List */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitle}>Delivery Options</Text>
             <Ionicons name="options-outline" size={18} color={palette.textSecondary} />
          </View>
          
          <View style={styles.optionsList}>
             {/* PDF Option */}
             <Pressable style={({pressed}) => [styles.optionRow, pressed && styles.optionPressed]}>
                <View style={[styles.optionIconBox, { backgroundColor: '#F1F5F9' }]}>
                    <Ionicons name="document-outline" size={20} color={palette.text} />
                </View>
                <View style={styles.optionContent}>
                    <Text style={styles.optionName}>Download PDF</Text>
                    <Text style={styles.optionDesc}>Save directly to your device</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={palette.textMuted} />
             </Pressable>

             {/* Email Option */}
             <Pressable style={({pressed}) => [styles.optionRow, pressed && styles.optionPressed]}>
                <View style={[styles.optionIconBox, { backgroundColor: palette.primaryLight }]}>
                    <Ionicons name="mail-outline" size={20} color={palette.primary} />
                </View>
                <View style={styles.optionContent}>
                    <Text style={styles.optionName}>Email Statement</Text>
                    <Text style={styles.optionDesc}>Send to registered email address</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={palette.textMuted} />
             </Pressable>

             {/* SMS Option */}
             <Pressable style={({pressed}) => [styles.lastOptionRow, pressed && styles.optionPressed]}>
                <View style={[styles.optionIconBox, { backgroundColor: '#F0FDF4' }]}>
                    <Ionicons name="chatbubble-outline" size={20} color={palette.success} />
                </View>
                <View style={styles.optionContent}>
                    <Text style={styles.optionName}>SMS Summary</Text>
                    <Text style={styles.optionDesc}>Get a text with your balance</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={palette.textMuted} />
             </Pressable>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoCard}>
            <View style={styles.infoIconBox}>
                <Ionicons name="time-outline" size={20} color={palette.warningText} />
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.infoTitle}>Processing Time</Text>
                <Text style={styles.infoText}>
                    Statements are typically processed within 24 hours. You'll receive a notification once ready.
                </Text>
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
  
  // Header Card
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
  },
  headerDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginBottom: 16,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerDescription: {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 20,
  },

  // Main Card
  mainCard: {
    backgroundColor: palette.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: palette.border,
  },
  heroHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  heroIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: palette.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
  },
  mainCardDescription: {
    fontSize: 14,
    color: palette.textSecondary,
    lineHeight: 22,
  },
  mainCardDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginVertical: 20,
  },
  actionBtn: {
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
    elevation: 3,
  },
  actionBtnPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Options Section
  sectionCard: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    backgroundColor: '#F8FAFC',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  optionsList: {
    padding: 0,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: 16,
  },
  lastOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  optionPressed: {
    backgroundColor: '#F1F5F9',
  },
  optionIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionName: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.text,
  },
  optionDesc: {
    fontSize: 12,
    color: palette.textSecondary,
    marginTop: 2,
  },

  // Info Card
  infoCard: {
    backgroundColor: palette.warningBg,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: palette.warningBorder,
  },
  infoIconBox: {
    marginTop: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.warningText,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: palette.warningText,
    opacity: 0.9,
    lineHeight: 18,
  },
});
