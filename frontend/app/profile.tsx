import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/utils/profileService';
import AppHeader from '../components/AppHeader';

// Modern 2026 Palette (Indigo/Slate)
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
  danger: '#EF4444',
  warningBg: '#FFFBEB',
  warningText: '#B45309',
  shadow: '#0F172A',
  inputBg: '#F8FAFC',
};

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Auto-hide success message after 2 seconds
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => setSaveSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Load profile data on mount
  useEffect(() => {
    loadProfileData();
  }, [token]);

  const loadProfileData = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const profile = await profileService.getProfile(token);
      
      setFormData({
        fullName: profile.fullName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: '',
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!formData.fullName || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!token) {
      Alert.alert('Error', 'You must be logged in to save changes');
      return;
    }

    try {
      setSaving(true);
      await profileService.updateProfile(token, formData);
      setSaveSuccess(true);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Failed to save profile:', error);
      Alert.alert('Error', 'Failed to save profile changes');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (!token) {
      Alert.alert('Error', 'You must be logged in to change password');
      return;
    }

    try {
      setSaving(true);
      await profileService.changePassword(token, {
        currentPassword: passwordData.current,
        newPassword: passwordData.new,
      });
      Alert.alert('Success', 'Password changed successfully');
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error('Failed to change password:', error);
      Alert.alert('Error', 'Failed to change password. Please check your current password.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <AppHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />
      
      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Title Section */}
        <View style={styles.headerTitleContainer}>
            <Text style={styles.pageTitle}>Profile Settings</Text>
            <Text style={styles.pageSubtitle}>Manage your personal information</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
            <View style={styles.coverBanner} />
            
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {formData.fullName.charAt(0).toUpperCase() || 'U'}
                    </Text>
                </View>
                <Pressable style={styles.editAvatarBtn}>
                    <Ionicons name="camera-outline" size={16} color="#fff" />
                </Pressable>
            </View>

            <View style={styles.profileInfoValues}>
                <Text style={styles.profileNameDisplay}>{formData.fullName || 'User Name'}</Text>
                <Text style={styles.profileRoleDisplay}>Guardian / Parent</Text>
            </View>
        </View>

        {/* Personal Details Form */}
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <Ionicons name="person-outline" size={20} color={palette.primary} />
                <Text style={styles.sectionTitle}>Personal Details</Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={formData.fullName}
                    onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                    placeholder="Enter full name"
                    placeholderTextColor={palette.textMuted}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    placeholderTextColor={palette.textMuted}
                />
            </View>

            <View style={styles.rowInputs}>
                <View style={[styles.formGroup, {flex: 1}]}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.phone}
                        onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        placeholder="Enter phone"
                        keyboardType="phone-pad"
                        placeholderTextColor={palette.textMuted}
                    />
                </View>
                <View style={[styles.formGroup, {flex: 1}]}>
                    <Text style={styles.inputLabel}>Location</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                        placeholder="City, Country"
                        placeholderTextColor={palette.textMuted}
                    />
                </View>
            </View>

            <Pressable 
                style={({pressed}) => [styles.saveBtn, pressed && styles.btnPressed]}
                onPress={handleSaveChanges}
                disabled={saving}
            >
                {saving ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <>
                        <Ionicons name="save-outline" size={18} color="#fff" />
                        <Text style={styles.saveBtnText}>Save Changes</Text>
                    </>
                )}
            </Pressable>
        </View>

        {/* Security Section */}
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <Ionicons name="shield-checkmark-outline" size={20} color={palette.primary} />
                <Text style={styles.sectionTitle}>Security</Text>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Current Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={passwordData.current}
                        onChangeText={(text) => setPasswordData({ ...passwordData, current: text })}
                        placeholder="Current password"
                        secureTextEntry={!showPasswords.current}
                        placeholderTextColor={palette.textMuted}
                    />
                    <Pressable onPress={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}>
                        <Ionicons name={showPasswords.current ? "eye-off-outline" : "eye-outline"} size={20} color={palette.textSecondary} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>New Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={passwordData.new}
                        onChangeText={(text) => setPasswordData({ ...passwordData, new: text })}
                        placeholder="New password"
                        secureTextEntry={!showPasswords.new}
                        placeholderTextColor={palette.textMuted}
                    />
                    <Pressable onPress={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}>
                        <Ionicons name={showPasswords.new ? "eye-off-outline" : "eye-outline"} size={20} color={palette.textSecondary} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Confirm New Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        value={passwordData.confirm}
                        onChangeText={(text) => setPasswordData({ ...passwordData, confirm: text })}
                        placeholder="Confirm new password"
                        secureTextEntry={!showPasswords.confirm}
                        placeholderTextColor={palette.textMuted}
                    />
                    <Pressable onPress={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}>
                        <Ionicons name={showPasswords.confirm ? "eye-off-outline" : "eye-outline"} size={20} color={palette.textSecondary} />
                    </Pressable>
                </View>
            </View>

            <Pressable 
                style={({pressed}) => [styles.passwordBtn, pressed && styles.btnPressed]}
                onPress={handleChangePassword}
                disabled={saving}
            >
                 <Text style={styles.passwordBtnText}>Update Password</Text>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: palette.textSecondary,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  headerTitleContainer: {
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
  },
  pageSubtitle: {
    fontSize: 14,
    color: palette.textSecondary,
    marginTop: 4,
  },
  
  // Profile Card
  profileCard: {
    backgroundColor: palette.card,
    borderRadius: 24,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 24,
  },
  coverBanner: {
    height: 100,
    width: '100%',
    backgroundColor: palette.primaryLight,
  },
  avatarContainer: {
    marginTop: -50,
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: palette.card,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: palette.text,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: palette.card,
  },
  profileInfoValues: {
    alignItems: 'center',
    gap: 4,
  },
  profileNameDisplay: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
  },
  profileRoleDisplay: {
    fontSize: 14,
    fontWeight: '500',
    color: palette.textSecondary,
  },

  // Section Cards
  sectionCard: {
    backgroundColor: palette.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: palette.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.text,
  },
  input: {
    backgroundColor: palette.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: palette.text,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 16,
  },
  saveBtn: {
    backgroundColor: palette.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
    shadowColor: palette.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: palette.text,
  },
  passwordBtn: {
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  passwordBtnText: {
    color: palette.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});

