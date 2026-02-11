import { useRouter } from 'expo-router';
import SideMenu from '../components/SideMenu';
import React from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Design Palette
const palette = {
  background: '#F9FAFC', // Very light cool gray
  card: '#FFFFFF',
  text: '#1F2937', // Gray-800
  textSecondary: '#6B7280', // Gray-500
  textLight: '#9CA3AF',
  primary: '#6366F1', // Indigo-500
  primaryPress: '#4F46E5', // Indigo-600
  primaryLight: '#EEF2FF', // Indigo-50
  accentWarning: '#FBBF24', // Amber
  accentSuccess: '#10B981', // Emerald
  border: '#F3F4F6', // Gray-100
  shadow: '#000000',
};

export default function ReRegistration() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const buttonScaleAnim = React.useRef(new Animated.Value(1)).current;

  // Animation handlers
  const handleButtonPressIn = () => {
    Animated.spring(buttonScaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handleButtonPressOut = () => {
     Animated.spring(buttonScaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleLogout = () => {
    router.replace('/(tabs)' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />
      
      {/* 
        Global Top Navigation (kept consistent with dashboard logic, 
        but styled minimally to blend with the page) 
      */}
      <View style={styles.topNav}>
        <Pressable 
            style={({pressed}) => [styles.menuBtn, pressed && styles.menuBtnPressed]} 
            onPress={() => setMenuOpen(true)}
        >
          <Ionicons name="menu" size={24} color={palette.text} />
        </Pressable>
        {/* Placeholder for center title or logo if needed, otherwise empty for clean look */}
      </View>

      <SideMenu isVisible={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Section (Card-like appearance from image) */}
        <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
             <View style={styles.headerTitleRow}>
                <View style={styles.headerIconContainer}>
                    <Ionicons name="create-outline" size={24} color={palette.primary} />
                </View>
                <Text style={styles.headerTitle}>Re-registration</Text>
             </View>
             <View style={styles.headerActions}>
                <Pressable style={styles.iconBtn}>
                    <Ionicons name="notifications-outline" size={22} color={palette.textSecondary} />
                </Pressable>
                <Pressable style={styles.iconBtn}>
                    <Ionicons name="settings-outline" size={22} color={palette.textSecondary} />
                </Pressable>
             </View>
          </View>
          <View style={styles.headerDivider} />
          <View style={styles.headerBottomHelper}>
             <Text style={styles.headerSubtitle}>Re-registration</Text>
             <Text style={styles.headerDescription}>
                Register your learners for the new academic year
             </Text>
          </View>
        </View>

        {/* Main Action Card: Learner Registration */}
        <View style={styles.mainCard}>
            <View style={styles.mainCardHeader}>
                <View style={styles.folderIconContainer}>
                    <Ionicons name="folder-open-outline" size={28} color={palette.primary} />
                    <View style={styles.checkBadge}>
                        <Ionicons name="checkmark" size={10} color="#fff" />
                    </View>
                </View>
                <View style={styles.mainCardTitleBlock}>
                    <Text style={styles.mainCardTitle}>Learner Registration</Text>
                </View>
            </View>
            
            <Text style={styles.mainCardDescription}>
                Complete the re-registration process for your learners. Update personal information, contact details, and emergency contacts.
            </Text>

            <View style={styles.mainCardDivider} />

            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                <Pressable
                    style={({pressed}) => [styles.startBtn, pressed && styles.startBtnPressed]}
                    onPressIn={handleButtonPressIn}
                    onPressOut={handleButtonPressOut}
                    onPress={() => router.push('/re-registration/step1-select' as never)}
                >
                    <Text style={styles.startBtnText}>Start Re-registration</Text>
                </Pressable>
            </Animated.View>
        </View>

        {/* Info Card: Important Dates */}
        <View style={styles.datesCard}>
            <Text style={styles.datesTitle}>Important Dates</Text>
            
            <View style={styles.dateRow}>
                <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
                    <Ionicons name="calendar-outline" size={18} color="#0284C7" />
                </View>
                <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>Registration Opens:</Text>
                    <Text style={styles.dateValue}>January 2026</Text>
                </View>
            </View>
            
            <View style={styles.dateSeparator} />

            <View style={styles.dateRow}>
                 <View style={[styles.iconBox, { backgroundColor: '#F0F9FF' }]}>
                    <Ionicons name="calendar-number-outline" size={18} color="#0369A1" />
                </View>
                <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>Registration Closes:</Text>
                    <Text style={styles.dateValue}>February 2026</Text>
                </View>
            </View>

            <View style={styles.dateSeparator} />

            <View style={styles.dateRow}>
                <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                    <Ionicons name="alert-circle-outline" size={18} color="#D97706" />
                </View>
                <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>Late Registration:</Text>
                    <Text style={styles.dateValue}>Until March 2026</Text>
                </View>
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
  topNav: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
  },
  menuBtn: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#fff', // White distinct button
      borderWidth: 1,
      borderColor: palette.border,
      // subtle shadow
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
  },
  menuBtnPressed: {
      backgroundColor: palette.highlight,
  },
  scrollContainer: {
      padding: 16,
      paddingBottom: 40,
  },

  // CARD STYLES
  // Common Box Shadow
  cardBase: {
      backgroundColor: palette.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      // Soft shadow
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: 'rgba(243, 244, 246, 0.6)', 
  },

  // HEADER CARD
  headerCard: {
      backgroundColor: palette.card,
      borderRadius: 24,
      padding: 0, // Padding handled internally
      marginBottom: 20,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
  },
  headerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
  },
  headerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  headerIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
      letterSpacing: -0.5,
  },
  headerActions: {
      flexDirection: 'row',
      gap: 8,
  },
  iconBtn: {
      padding: 6,
  },
  headerDivider: {
      height: 1,
      backgroundColor: palette.border,
      width: '100%',
  },
  headerBottomHelper: {
      padding: 20,
      backgroundColor: '#FBFBFF', // Slightly tinted bottom half if desired, or white
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
  },
  headerSubtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: palette.text,
      marginBottom: 6,
  },
  headerDescription: {
      fontSize: 14,
      color: palette.textSecondary,
      lineHeight: 20,
  },

  // MAIN CARD
  mainCard: {
      backgroundColor: palette.card,
      borderRadius: 24,
      padding: 24,
      marginBottom: 24,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
  },
  mainCardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 16,
      marginBottom: 16,
  },
  folderIconContainer: {
      width: 56,
      height: 48,
      backgroundColor: '#EEF2FF', // Very light blue folder icon bg
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
  },
  checkBadge: {
      position: 'absolute',
      bottom: -4,
      right: -4,
      backgroundColor: palette.primary,
      width: 18,
      height: 18,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
  },
  mainCardTitleBlock: {
      flex: 1,
      justifyContent: 'center',
      height: 48, // Align with icon height
  },
  mainCardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
  },
  mainCardDescription: {
      fontSize: 14,
      color: palette.textSecondary,
      lineHeight: 22,
      marginBottom: 24,
  },
  mainCardDivider: {
      height: 1,
      backgroundColor: palette.border,
      marginBottom: 20,
  },
  startBtn: {
      backgroundColor: palette.primary,
      borderRadius: 30, // Full pill shape
      paddingVertical: 14,
      alignItems: 'center',
      shadowColor: palette.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
  },
  startBtnPressed: {
      backgroundColor: palette.primaryPress,
      transform: [{translateY: 1}],
  },
  startBtnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
  },

  // INFO CARD
  datesCard: {
      backgroundColor: palette.card,
      borderRadius: 24,
      padding: 24,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
  },
  datesTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.textSecondary,
      marginBottom: 20,
  },
  dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
  },
  iconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  dateInfo: {
      flex: 1,
  },
  dateLabel: {
      fontSize: 14,
      color: palette.textSecondary,
      marginBottom: 2,
  },
  dateValue: {
      fontSize: 15,
      color: palette.text,
      fontWeight: '600',
  },
  dateSeparator: {
      height: 1,
      backgroundColor: palette.border,
      marginLeft: 56, // Align with text start
      marginVertical: 14,
  },
});
