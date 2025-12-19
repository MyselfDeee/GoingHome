import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  useResponsive,
  getResponsiveFontSize,
  getResponsiveButtonPadding,
  MIN_TOUCH_TARGET,
} from '@/utils/responsive';
import { useAuth } from '@/contexts/AuthContext';

const palette = {
  background: '#f5f7fb',
  card: '#f9fbff',
  primary: '#1f64f2',
  text: '#1a1f36',
  muted: '#6b7280',
  border: '#dce3f0',
  inputBg: '#eef2fb',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('TestPassword123!');
  const [remember, setRemember] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();
  const responsive = useResponsive();
  const { width } = useWindowDimensions();
  const isSmallPhone = width < 480;
  const isMediumPhone = width >= 480 && width < 768;
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoggingIn(true);
    try {
      await login(email, password);
      router.push('/parent-dashboard' as never);
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Invalid credentials');
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            isSmallPhone && styles.scrollContainerSmall,
            isMediumPhone && styles.scrollContainerMedium,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={[styles.hero, isSmallPhone && styles.heroSmall]}>
            <View style={[styles.logoCircle, { width: isSmallPhone ? 70 : 90, height: isSmallPhone ? 70 : 90 }]}>
              <Text style={[styles.logoText, { fontSize: getResponsiveFontSize(40, width) }]}>K</Text>
            </View>
            <Text style={[styles.title, { fontSize: getResponsiveFontSize(28, width) }]}>
              Sign in to Knit Edu
            </Text>
            <Text style={[styles.subtitle, { fontSize: getResponsiveFontSize(14, width) }]}>
              Parent Portal - Access student information and billing details
            </Text>
          </View>

          <View style={[styles.card, isSmallPhone && styles.cardSmall]}>
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { fontSize: getResponsiveFontSize(14, width) }]}>
                Email address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, { fontSize: getResponsiveFontSize(15, width), minHeight: MIN_TOUCH_TARGET }]}
                placeholderTextColor={palette.muted}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { fontSize: getResponsiveFontSize(14, width) }]}>
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                style={[styles.input, { fontSize: getResponsiveFontSize(15, width), minHeight: MIN_TOUCH_TARGET }]}
                placeholderTextColor={palette.muted}
              />
            </View>

            <View style={[styles.actionsRow, isSmallPhone && styles.actionsRowStack]}>
              <Pressable
                style={[styles.rememberRow, { minHeight: MIN_TOUCH_TARGET }]}
                onPress={() => setRemember((prev) => !prev)}>
                <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                  {remember && <View style={styles.checkboxDot} />}
                </View>
                <Text style={[styles.rememberText, { fontSize: getResponsiveFontSize(14, width) }]}>
                  Remember me
                </Text>
              </Pressable>

              <Pressable style={{ minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }}>
                <Text style={[styles.linkText, { fontSize: getResponsiveFontSize(14, width) }]}>
                  Forgot your password?
                </Text>
              </Pressable>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.primaryButton, { minHeight: MIN_TOUCH_TARGET }]}
              disabled={loggingIn}
              onPress={handleLogin}>
              {loggingIn ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={[styles.primaryButtonText, { fontSize: getResponsiveFontSize(16, width) }]}>
                  Sign in
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { fontSize: getResponsiveFontSize(12, width) }]}>
                © 2025 Knit. All rights reserved.
              </Text>
              <View style={styles.supportRow}>
                <Text style={[styles.footerText, { fontSize: getResponsiveFontSize(12, width) }]}>
                  Need help?{' '}
                </Text>
                <Pressable style={{ minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' }}>
                  <Text style={[styles.linkText, { fontSize: getResponsiveFontSize(12, width) }]}>
                    Contact support
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainerSmall: {
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
  scrollContainerMedium: {
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  heroSmall: {
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#1a3f8b',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  logoText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: palette.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    width: '100%',
    maxWidth: 540,
    backgroundColor: palette.card,
    padding: 22,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  cardSmall: {
    padding: 16,
    maxWidth: '100%',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: palette.text,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: palette.inputBg,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 15,
    color: palette.text,
    minHeight: MIN_TOUCH_TARGET,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    gap: 12,
  },
  actionsRowStack: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 14,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: palette.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: palette.primary,
    backgroundColor: '#e6efff',
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.primary,
  },
  rememberText: {
    fontSize: 14,
    color: palette.text,
  },
  linkText: {
    color: palette.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: palette.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    minHeight: MIN_TOUCH_TARGET,
    justifyContent: 'center',
    shadowColor: '#1a3f8b',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    color: palette.muted,
    textAlign: 'center',
  },
});
