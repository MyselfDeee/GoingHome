import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  TextInput,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import ProgressTracker from '@/components/re-registration/ProgressTracker';
import StudentCard from '@/components/re-registration/StudentCard';
import SuccessModal from '@/components/re-registration/SuccessModal';

const palette = {
  background: '#f0f4f8',
  card: '#ffffff',
  cardLight: '#f8fafc',
  border: '#e2e8f0',
  primary: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1d4ed8',
  success: '#059669',
  danger: '#dc2626',
  muted: '#64748b',
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
};

const steps = [
  { number: 1, title: 'Select Children', subtitle: 'Choose students to re-register' },
  { number: 2, title: 'Update Details', subtitle: 'Review and update information' },
  { number: 3, title: 'Review & Submit', subtitle: 'Confirm and submit' },
];

export default function Step2UpdateDetails() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const isMedium = width < 768;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -300,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

  const handleLogout = () => {
    router.push('/(tabs)' as never);
  };

  const [formData, setFormData] = useState({
    firstName: 'Mikhenso',
    lastName: 'Rikhotso',
    currentGrade: 'Grade 11',
    nextGrade: '12',
    phone: '0647939043',
    email: 'mikhenso@gmail.com',
    street: 'Joni',
    city: 'Giyani',
    state: 'Free State',
    postcode: '2025',
    accountHolderName: 'Ronald Rikhotso',
    bankName: 'African Bank',
    accountType: 'Savings',
    accountNumber: '1668677022',
    branchCode: '302520',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = [
      'firstName',
      'lastName',
      'currentGrade',
      'nextGrade',
      'phone',
      'email',
      'street',
      'city',
      'state',
      'postcode',
      'accountHolderName',
      'bankName',
      'accountType',
      'accountNumber',
      'branchCode',
    ];
    return required.every((field) => formData[field as keyof typeof formData]?.trim() !== '');
  };

  const handleContinue = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }
    setShowSuccessModal(true);
  };

  const handleModalContinue = () => {
    setShowSuccessModal(false);
    router.push('/re-registration/step4-financing' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.hamburgerBtn} onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </Pressable>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoLetter}>P</Text>
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
      {menuOpen && (
        <Pressable style={styles.menuOverlay} onPress={() => setMenuOpen(false)} />
      )}
      <Animated.View style={[styles.dropdownMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <Pressable onPress={() => setMenuOpen(false)}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>
        
        <View style={styles.menuDivider} />
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/re-registration' as never);
        }}>
          <Text style={styles.dropdownIcon}>📝</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Re-registration</Text>
            <Text style={styles.dropdownSubtext}>Register learners</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/fee-forecasting' as never);
        }}>
          <Text style={styles.dropdownIcon}>📊</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Fee Forecasting</Text>
            <Text style={styles.dropdownSubtext}>Budget planning</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/ai-assistant' as never);
        }}>
          <Text style={styles.dropdownIcon}>🤖</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>AI Assistant</Text>
            <Text style={styles.dropdownSubtext}>Get smart help</Text>
          </View>
        </Pressable>
        
        <Pressable style={styles.dropdownItem} onPress={() => {
          setMenuOpen(false);
          router.push('/request-statement' as never);
        }}>
          <Text style={styles.dropdownIcon}>📋</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Request Statement</Text>
            <Text style={styles.dropdownSubtext}>Download records</Text>
          </View>
        </Pressable>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>✏️</Text>
          </View>
          <View>
            <Text style={styles.mainTitle}>Update Student Details</Text>
            <Text style={styles.yearText}>2025 Academic Year</Text>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Please review and update all student information. This data will be used for the
            re-registration process.
          </Text>
        </View>

        <View style={[styles.contentRow, isMedium && styles.contentColumn]}>
          {/* Sidebar */}
          {isMedium ? (
            <ProgressTracker steps={steps} currentStep={2} completion={50} compact={true} />
          ) : (
            <View style={styles.sidebar}>
              <ProgressTracker steps={steps} currentStep={2} completion={50} />
            </View>
          )}

          {/* Main Content */}
          <View style={[styles.mainContent, isMedium && styles.mainContentMobile]}>
            {/* Student Profile Card */}
            <View style={styles.studentProfileCard}>
              <View style={styles.studentProfileHeader}>
                <View style={styles.studentAvatar}>
                  <Text style={styles.studentAvatarText}>MR</Text>
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>Mikhenso Rikhotso</Text>
                  <Text style={styles.studentMeta}>Student ID: 2020155260088</Text>
                  <Text style={styles.studentMeta}>Current Grade: Grade 11</Text>
                </View>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Active Student</Text>
                </View>
              </View>
            </View>

            {/* Form Sections */}
            {/* 1. Personal Information */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                  <Text style={styles.sectionNumberText}>1</Text>
                </View>
                <Text style={styles.sectionTitle}>Personal Information</Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>First Name *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.firstName}
                    onChangeText={(v) => updateField('firstName', v)}
                    placeholder="Enter first name"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.label}>Last Name *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.lastName}
                    onChangeText={(v) => updateField('lastName', v)}
                    placeholder="Enter last name"
                  />
                </View>
              </View>
            </View>

            {/* 2. Academic Information */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                  <Text style={styles.sectionNumberText}>2</Text>
                </View>
                <Text style={styles.sectionTitle}>Academic Information</Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Current Grade *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.currentGrade}
                    onChangeText={(v) => updateField('currentGrade', v)}
                    placeholder="Enter current grade"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.label}>Next Grade *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nextGrade}
                    onChangeText={(v) => updateField('nextGrade', v)}
                    placeholder="Enter next grade"
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Phone Number *</Text>
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={styles.inputFlex}
                      value={formData.phone}
                      onChangeText={(v) => updateField('phone', v)}
                      placeholder="Enter phone number"
                      keyboardType="phone-pad"
                    />
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                </View>
                <View style={styles.formField}>
                  <Text style={styles.label}>Email *</Text>
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={styles.inputFlex}
                      value={formData.email}
                      onChangeText={(v) => updateField('email', v)}
                      placeholder="Enter email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 3. Address Information */}
            <View style={styles.formSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                  <Text style={styles.sectionIcon}>📍</Text>
                </View>
                <Text style={styles.sectionTitle}>Address Information</Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Street Address *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.street}
                    onChangeText={(v) => updateField('street', v)}
                    placeholder="Enter street address"
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>City *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.city}
                    onChangeText={(v) => updateField('city', v)}
                    placeholder="Enter city"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.label}>State *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.state}
                    onChangeText={(v) => updateField('state', v)}
                    placeholder="Enter state"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.label}>Postcode *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.postcode}
                    onChangeText={(v) => updateField('postcode', v)}
                    placeholder="Enter postcode"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* 4. Bank Account Details */}
            <View style={styles.bankSection}>
              <View style={styles.bankHeader}>
                <Text style={styles.bankIcon}>🏦</Text>
                <View style={styles.bankHeaderText}>
                  <Text style={styles.bankTitle}>Bank Account Details</Text>
                  <Text style={styles.bankSubtitle}>
                    Required for Netcash debit order mandate creation
                  </Text>
                </View>
              </View>
              <View style={styles.bankInfoBox}>
                <Text style={styles.bankInfoIcon}>ℹ️</Text>
                <Text style={styles.bankInfoText}>
                  Your bank account details will be securely stored and used only for creating a
                  debit order mandate for your school fees.
                </Text>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Account Holder Name *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.accountHolderName}
                    onChangeText={(v) => updateField('accountHolderName', v)}
                    placeholder="Enter account holder name"
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Bank Name *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.bankName}
                    onChangeText={(v) => updateField('bankName', v)}
                    placeholder="Select bank"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.label}>Account Type *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.accountType}
                    onChangeText={(v) => updateField('accountType', v)}
                    placeholder="Select account type"
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.label}>Account Number * (8-17 digits)</Text>
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={styles.inputFlex}
                      value={formData.accountNumber}
                      onChangeText={(v) => updateField('accountNumber', v)}
                      placeholder="Enter account number"
                      keyboardType="numeric"
                    />
                    <Text style={styles.checkIcon}>✓</Text>
                  </View>
                </View>
                <View style={styles.formField}>
                  <Text style={styles.label}>Branch Code * (6 digits)</Text>
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={styles.inputFlex}
                      value={formData.branchCode}
                      onChangeText={(v) => updateField('branchCode', v)}
                      placeholder="Enter branch code"
                      keyboardType="numeric"
                      maxLength={6}
                    />
                    <Text style={styles.branchCodeCount}>
                      {formData.branchCode.length}/6
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Navigation */}
            <View style={styles.navButtons}>
              <Pressable style={styles.backBtnNav} onPress={() => router.back()}>
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              <Pressable style={styles.continueBtn} onPress={handleContinue}>
                <Text style={styles.continueBtnText}>Continue →</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <SuccessModal
        visible={showSuccessModal}
        title="Student details updated successfully"
        count={1}
        onContinue={handleModalContinue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
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
  hamburgerIcon: { fontSize: 24, color: palette.text },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: { color: '#fff', fontWeight: '700', fontSize: 16 },
  brandTitle: { color: palette.text, fontSize: 15, fontWeight: '700' },
  brandSubtitle: { color: palette.muted, fontSize: 11 },
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
  logoutIcon: { fontSize: 18, color: '#dc2626' },
  logoutText: { color: '#dc2626', fontWeight: '600', fontSize: 12 },
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
    borderRightWidth: 1,
    borderRightColor: palette.border,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  menuTitle: { fontSize: 16, fontWeight: '700', color: palette.text },
  closeIcon: { fontSize: 20, color: palette.text },
  menuDivider: { height: 1, backgroundColor: palette.border },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    gap: 12,
  },
  dropdownIcon: { fontSize: 20 },
  itemContent: { flex: 1 },
  dropdownText: { fontSize: 14, fontWeight: '600', color: palette.text },
  dropdownSubtext: { fontSize: 12, color: palette.muted, marginTop: 2 },
  container: { padding: 16, paddingTop: 24, paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: { fontSize: 24 },
  mainTitle: { fontSize: 22, fontWeight: '800', color: palette.text },
  yearText: { fontSize: 13, color: palette.muted, marginTop: 2 },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#e0f2fe',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
  },
  infoIcon: { fontSize: 20 },
  infoText: { flex: 1, fontSize: 13, color: palette.text, lineHeight: 18 },
  contentRow: { flexDirection: 'row', gap: 16 },
  contentColumn: { flexDirection: 'column' },
  sidebar: { width: 200, flexShrink: 0 },
  mainContent: { flex: 1, minWidth: 0 },
  mainContentMobile: { width: '100%' },
  studentProfileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: palette.border,
  },
  studentProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  studentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentAvatarText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 18, fontWeight: '700', color: palette.text, marginBottom: 4 },
  studentMeta: { fontSize: 12, color: palette.muted, marginBottom: 2 },
  activeBadge: {
    backgroundColor: palette.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionNumberText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: palette.text },
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  formField: { flex: 1 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: palette.text,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputFlex: { flex: 1, paddingVertical: 10, fontSize: 14, color: palette.text },
  checkIcon: { color: palette.success, fontSize: 18, fontWeight: '700' },
  branchCodeCount: { color: palette.muted, fontSize: 12, marginLeft: 8 },
  bankSection: {
    backgroundColor: '#d1f0f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2596be',
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  bankIcon: { fontSize: 28 },
  bankHeaderText: { flex: 1 },
  bankTitle: { fontSize: 16, fontWeight: '700', color: '#000000', marginBottom: 2 },
  bankSubtitle: { fontSize: 12, color: '#000000', opacity: 0.85 },
  bankInfoBox: {
    flexDirection: 'row',
    backgroundColor: '#bfdbfe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 10,
  },
  bankInfoIcon: { fontSize: 20 },
  bankInfoText: { flex: 1, fontSize: 12, color: palette.text, lineHeight: 16 },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  backBtnNav: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: palette.border,
  },
  backBtnText: { color: palette.text, fontWeight: '600' },
  continueBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: palette.primary,
  },
  continueBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});

