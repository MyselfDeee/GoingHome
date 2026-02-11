import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, ScrollView, Platform, SafeAreaView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MENU_ITEMS = [
  { label: 'Parent Dashboard', route: '/parent-dashboard', icon: 'home-outline' },
  { label: 'Re-registration', route: '/re-registration', icon: 'document-text-outline' },
  { label: 'Fee Forecasting', route: '/fee-forecasting', icon: 'stats-chart-outline' },
  { label: 'AI Assistant', route: '/ai-assistant', icon: 'hardware-chip-outline' },
  { label: 'Request Statement', route: '/request-statement', icon: 'receipt-outline' },
  { label: 'Admissions', route: '/admissions', icon: 'school-outline' },
  { label: 'Announcements', route: '/announcements', icon: 'megaphone-outline', badge: 3 },
];

const palette = {
  background: '#fff',
  text: '#374151', // Gray-700
  textLight: '#6B7280', // Gray-500
  primary: '#6366f1', // Indigo-500
  primaryLight: '#eef2ff', // Indigo-50
  danger: '#ef4444',
  border: '#f3f4f6',
  overlay: 'rgba(31, 41, 55, 0.4)', // Darker overlay
};

export default function SideMenu({ isVisible, onClose, onLogout }: SideMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const slideAnim = useRef(new Animated.Value(-320)).current; 

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -320,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleNavigation = (route: string) => {
    onClose();
    // Small delay to allow closing animation to feel responsive
    setTimeout(() => {
        router.push(route as never);
    }, 50);
  };

  const isActive = (route: string) => {
      // Exact match for dashboard or prefix match for others
      if (route === '/parent-dashboard' && pathname === '/parent-dashboard') return true;
      return pathname.startsWith(route) && route !== '/';
  };

  if (!isVisible && slideAnim === new Animated.Value(-320)) return null;

  return (
    <>
      {isVisible && (
        <Pressable style={styles.overlay} onPress={onClose} />
      )}
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                {/* Header Top Row: Hamburger(Close) */}
                <View style={styles.topRow}>
                    <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={10}>
                        <Ionicons name="menu" size={24} color={palette.text} />
                    </Pressable>
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>MR</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Mikhenso Rikhotso</Text>
                        <Text style={styles.profileEmail}>mikhenso@email.com</Text>
                    </View>
                </View>

                {/* Manage Profile Button */}
                <Pressable 
                    style={({pressed}) => [styles.manageProfileBtn, pressed && styles.pressedBtn]}
                    onPress={() => handleNavigation('/profile')}
                >
                    <View style={styles.manageProfileContent}>
                         <Ionicons name="settings-outline" size={18} color={palette.text} />
                         <Text style={styles.manageProfileText}>Manage Profile</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={palette.text} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {MENU_ITEMS.map((item, index) => {
                    const active = isActive(item.route);
                    return (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.menuItem, 
                                active && styles.menuItemActive,
                                pressed && !active && styles.menuItemPressed
                            ]}
                            onPress={() => handleNavigation(item.route)}
                        >
                            <View style={styles.menuItemLeft}>
                                <Ionicons 
                                    name={item.icon as any} 
                                    size={22} 
                                    color={active ? palette.primary : palette.text} 
                                />
                                <Text style={[styles.menuItemText, active && styles.menuItemTextActive]}>
                                    {item.label}
                                </Text>
                            </View>
                            {/* @ts-ignore */}
                            {item.badge ? (
                                <View style={styles.badge}>
                                    {/* @ts-ignore */}
                                    <Text style={styles.badgeText}>{item.badge}</Text>
                                </View>
                            ) : null}
                        </Pressable>
                    );
                })}

                <View style={styles.divider} />

                <Pressable
                    style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                    onPress={() => {
                        onClose();
                        onLogout();
                    }}
                >
                    <View style={styles.menuItemLeft}>
                        <Ionicons name="log-out-outline" size={22} color={palette.danger} />
                        <Text style={[styles.menuItemText, { color: palette.danger }]}>Sign Out</Text>
                    </View>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, 
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: palette.overlay,
    zIndex: 999,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 300, 
    backgroundColor: palette.background,
    zIndex: 1000,
    borderTopRightRadius: 24, 
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 20,
    // overflow: 'hidden', // caused issues with shadows on iOS sometimes, but safe for rounded corners
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  topRow: {
    marginBottom: 20,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: palette.border,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#818cf8', 
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  avatarText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  profileInfo: {
      flex: 1,
  },
  profileName: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.text,
      marginBottom: 2,
  },
  profileEmail: {
      fontSize: 13,
      color: palette.textLight,
  },
  manageProfileBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f9fafb',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.border,
  },
  pressedBtn: {
      backgroundColor: '#f3f4f6',
  },
  manageProfileContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  manageProfileText: {
      fontSize: 14,
      fontWeight: '500', 
      color: palette.text,
  },
  scrollContent: {
      paddingVertical: 16,
      paddingHorizontal: 16,
  },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 4,
  },
  menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  menuItemActive: {
      backgroundColor: palette.primaryLight,
  },
  menuItemPressed: {
      backgroundColor: '#f9fafb',
  },
  menuItemText: {
      fontSize: 15,
      fontWeight: '500',
      color: palette.text,
  },
  menuItemTextActive: {
      color: palette.primary,
      fontWeight: '600',
  },
  badge: {
      backgroundColor: palette.primary,
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  badgeText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
  },
  divider: {
      height: 1,
      backgroundColor: palette.border,
      marginVertical: 12,
      marginHorizontal: 16,
  },
});
