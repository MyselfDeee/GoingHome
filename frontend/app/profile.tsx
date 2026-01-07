import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  Alert,
  useWindowDimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/utils/profileService';

const palette = {
  background: '#f3f4f6',
  card: '#ffffff',
  border: '#e5e7eb',
  primary: '#6366f1',
  success: '#1db954',
  danger: '#ef4444',
  muted: '#6b7280',
  text: '#1f2937',
  textLight: '#6b7280',
  badgeBlue: '#e5edff',
  badgeRed: '#ffecec',
};

export default function ProfileScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -300,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

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

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await logout();
          router.push('/(tabs)' as never);
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.hamburgerBtn} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </Pressable>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoLetter}>K</Text>
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
      {menuOpen && <Pressable style={styles.menuOverlay} onPress={() => setMenuOpen(false)} />}
      <Animated.View style={[styles.dropdownMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <Pressable onPress={() => setMenuOpen(false)}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>

        <View style={styles.menuDivider} />

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/parent-dashboard' as never);
          }}>
          <Text style={styles.dropdownIcon}>🏠</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Parent Dashboard</Text>
            <Text style={styles.dropdownSubtext}>Overview & payments</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/re-registration' as never);
          }}>
          <Text style={styles.dropdownIcon}>📝</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Re-registration</Text>
            <Text style={styles.dropdownSubtext}>Register learners</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/fee-forecasting' as never);
          }}>
          <Text style={styles.dropdownIcon}>📊</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Fee Forecasting</Text>
            <Text style={styles.dropdownSubtext}>Budget planning</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/ai-assistant' as never);
          }}>
          <Text style={styles.dropdownIcon}>🤖</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>AI Assistant</Text>
            <Text style={styles.dropdownSubtext}>Get smart help</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/request-statement' as never);
          }}>
          <Text style={styles.dropdownIcon}>📋</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Request Statement</Text>
            <Text style={styles.dropdownSubtext}>Download records</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/admissions' as never);
          }}>
          <Text style={styles.dropdownIcon}>🎓</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Admissions</Text>
            <Text style={styles.dropdownSubtext}>Track applications</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/announcements' as never);
          }}>
          <Text style={styles.dropdownIcon}>📢</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Announcements</Text>
            <Text style={styles.dropdownSubtext}>School news & updates</Text>
          </View>
        </Pressable>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Profile Settings</Text>
          <Text style={styles.pageSubtitle}>Manage your personal information and account preferences</Text>
        </View>

        {/* Cover Banner Section */}
        <View style={styles.coverSection}>
          <View style={styles.coverBanner} />
          <Pressable style={styles.changeCoverBtn}>
            <Ionicons name="image" size={16} color="#ffffff" />
            <Text style={styles.changeCoverText}>Change Cover</Text>
          </Pressable>

          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitial}>
                {formData.fullName.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <Pressable style={styles.changeProfilePicBtn}>
              <Ionicons name="camera" size={14} color={palette.primary} />
            </Pressable>
          </View>
          <Pressable>
            <Text style={styles.changeProfilePicText}>Change Profile Picture</Text>
          </Pressable>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* Personal Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FULL NAME</Text>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              placeholder="Enter your full name"
              placeholderTextColor={palette.muted}
            />
            <Text style={styles.helperText}>This name will be visible to teachers and administrators</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EMAIL ADDRESS</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor={palette.muted}
            />
            <Text style={styles.helperText}>Used for notifications and account recovery</Text>
          </View>

          <View style={styles.twoColumnSection}>
            <View style={[styles.section, styles.flex1]}>
              <Text style={styles.sectionTitle}>PHONE NUMBER</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Enter your phone"
                keyboardType="phone-pad"
                placeholderTextColor={palette.muted}
              />
              <Text style={styles.helperText}>For urgent notifications and verification</Text>
            </View>

            <View style={[styles.section, styles.flex1]}>
              <Text style={styles.sectionTitle}>LOCATION</Text>
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholder="Enter your location"
                placeholderTextColor={palette.muted}
              />
              <Text style={styles.helperText}>Optional: Your city and country</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Change Password Section */}
          <View>
            <View style={styles.passwordHeader}>
              <Ionicons name="lock-closed" size={18} color={palette.text} />
              <Text style={styles.passwordTitle}>Change Password</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CURRENT PASSWORD</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={passwordData.current}
                  onChangeText={(text) => setPasswordData({ ...passwordData, current: text })}
                  placeholder="Enter current password"
                  secureTextEntry={!showPasswords.current}
                  placeholderTextColor={palette.muted}
                />
                <Pressable
                  onPress={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  style={styles.eyeIcon}>
                  <Ionicons
                    name={showPasswords.current ? 'eye' : 'eye-off'}
                    size={20}
                    color={palette.muted}
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.twoColumnSection}>
              <View style={[styles.section, styles.flex1]}>
                <Text style={styles.sectionTitle}>NEW PASSWORD</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={passwordData.new}
                    onChangeText={(text) => setPasswordData({ ...passwordData, new: text })}
                    placeholder="Enter new password"
                    secureTextEntry={!showPasswords.new}
                    placeholderTextColor={palette.muted}
                  />
                  <Pressable
                    onPress={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    style={styles.eyeIcon}>
                    <Ionicons
                      name={showPasswords.new ? 'eye' : 'eye-off'}
                      size={20}
                      color={palette.muted}
                    />
                  </Pressable>
                </View>
              </View>

              <View style={[styles.section, styles.flex1]}>
                <Text style={styles.sectionTitle}>CONFIRM PASSWORD</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={passwordData.confirm}
                    onChangeText={(text) => setPasswordData({ ...passwordData, confirm: text })}
                    placeholder="Confirm new password"
                    secureTextEntry={!showPasswords.confirm}
                    placeholderTextColor={palette.muted}
                  />
                  <Pressable
                    onPress={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    style={styles.eyeIcon}>
                    <Ionicons
                      name={showPasswords.confirm ? 'eye' : 'eye-off'}
                      size={20}
                      color={palette.muted}
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <Text style={styles.passwordRequirement}>
              Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters
            </Text>

            {/* Change Password Button */}
            <Pressable 
              style={[styles.changePasswordBtn, saving && styles.saveBtnDisabled]} 
              onPress={handleChangePassword}
              disabled={saving}>
              {saving ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={18} color="#ffffff" />
                  <Text style={styles.saveBtnText}>Update Password</Text>
                </>
              )}
            </Pressable>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelBtn} onPress={() => loadProfileData()}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable 
              style={[styles.saveBtn, saving && styles.saveBtnDisabled]} 
              onPress={handleSaveChanges}
              disabled={saving}>
              {saving ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={18} color="#ffffff" />
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={24} color={palette.success} />
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Your data is secure</Text>
            <Text style={styles.securityDesc}>All your personal information is encrypted and stored securely. We never share your data with third parties without your consent.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Success Modal */}
      {saveSuccess && (
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={64} color="#22c55e" />
            </View>
            <Text style={styles.successTitle}>Changes Saved!</Text>
            <Text style={styles.successMessage}>Your profile has been updated successfully.</Text>
          </View>
        </View>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: palette.muted,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
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
  hamburgerIcon: {
    fontSize: 24,
    color: palette.text,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  brandTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: palette.muted,
    fontSize: 11,
  },
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
  logoutIcon: {
    fontSize: 18,
    color: '#dc2626',
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 12,
  },
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
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 3, height: 0 },
    paddingTop: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.text,
  },
  closeIcon: {
    fontSize: 24,
    color: palette.muted,
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 4,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    gap: 14,
  },
  dropdownIcon: {
    fontSize: 28,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
  },
  dropdownSubtext: {
    fontSize: 12,
    color: palette.muted,
    marginTop: 2,
  },
  headerSection: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 14,
    color: palette.textLight,
  },
  coverSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  coverBanner: {
    width: '100%',
    height: 120,
    backgroundColor: palette.primary,
    borderRadius: 12,
    marginBottom: 0,
  },
  changeCoverBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
  },
  changeCoverText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 12,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: 8,
  },
  profileInitial: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
  },
  changeProfilePicBtn: {
    position: 'absolute',
    bottom: 0,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.background,
  },
  changeProfilePicText: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.primary,
    marginTop: 8,
  },
  mainCard: {
    backgroundColor: palette.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  twoColumnSection: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  flex1: {
    flex: 1,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: palette.text,
    marginBottom: 6,
  },
  helperText: {
    fontSize: 12,
    color: palette.textLight,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginVertical: 20,
  },
  passwordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  passwordTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: palette.text,
  },
  eyeIcon: {
    padding: 8,
  },
  passwordRequirement: {
    fontSize: 12,
    color: palette.textLight,
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 3,
    borderLeftColor: palette.primary,
    paddingLeft: 10,
    paddingVertical: 8,
    marginTop: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.danger,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    backgroundColor: palette.card,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.text,
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnSuccess: {
    backgroundColor: '#22c55e',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  changePasswordBtn: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  securityNote: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.success,
    marginBottom: 4,
  },
  securityDesc: {
    fontSize: 12,
    color: palette.textLight,
    lineHeight: 18,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: palette.textLight,
    textAlign: 'center',
  },
});
