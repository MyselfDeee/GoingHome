import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SideMenu from './SideMenu';

// You might want to move palette to a shared theme file or props
const palette = {
  background: '#F0F2F5',
  card: '#FFFFFF',
  text: '#1F2937', 
  primary: '#4F46E5',
  border: '#E5E7EB',
};

interface AppHeaderProps {
  title?: string;
}

export default function AppHeader({ title }: AppHeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();
  
  const parentName = "Mr. Rikhotso"; 

  const handleLogout = () => {
    // Navigate to login/landing
    router.replace('/(tabs)' as never); 
  };

  const handleProfile = () => {
      router.push('/profile' as never);
  };

  return (
    <>
      <View style={[styles.topNavbar, { paddingTop: insets.top + 10 }]}>
        <View style={styles.navLeft}>
           <Pressable onPress={() => setMenuOpen(true)} style={styles.menuBtn}>
              <Ionicons name="menu" size={28} color={palette.text} />
           </Pressable>
           <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeLabel}>Welcome,</Text>
              <Text style={styles.welcomeName}>{parentName}</Text>
           </View>
        </View>
        <View style={styles.navRight}>
           <Pressable onPress={handleLogout} style={styles.iconBtn}>
              <Ionicons name="log-out-outline" size={24} color={palette.text} />
           </Pressable>
           <Pressable onPress={handleProfile}>
              <View style={styles.profileImageContainer}>
                 <Text style={styles.profileInitials}>MR</Text>
              </View>
           </Pressable>
        </View>
      </View>

      <SideMenu 
        isVisible={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onLogout={handleLogout} 
      />
    </>
  );
}

const styles = StyleSheet.create({
  topNavbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: palette.background,
    borderBottomWidth: 1,
    borderBottomColor: palette.border, // Optional, depending on design
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuBtn: {
    padding: 4,
  },
  welcomeContainer: {
    justifyContent: 'center',
  },
  welcomeLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  welcomeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  iconBtn: {
    padding: 4,
  },
  profileImageContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  profileInitials: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4F46E5',
  },
});
