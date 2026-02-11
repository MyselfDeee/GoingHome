import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import SideMenu from '../../components/SideMenu'; // Handled by AppHeader
import AppHeader from '../../components/AppHeader';

// Consistent Palette
const palette = {
  background: '#F9FAFC', 
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B', 
  textMuted: '#94A3B8',
  primary: '#6366F1',
  primaryLight: '#EEF2FF',
  border: '#E2E8F0',
  success: '#10B981',
  shadow: '#0F172A',
  inputBg: '#F8FAFC',
};

const declarationSections = [
    {
        title: "Code of Conduct Acknowledgement",
        text: "By submitting this application, I acknowledge that I have read, understood, and agree to abide by the school's Code of Conduct. I understand that any violation of these standards may result in disciplinary action, including suspension or expulsion."
    },
    {
        title: "Financial Responsibility Acceptance",
        text: "I acknowledge full responsibility for all school fees, charges, and associated costs as outlined in the fee agreement. I understand that failure to meet payment obligations may affect my child's continued enrollment at the institution."
    },
    {
        title: "Accuracy of Information Declaration",
        text: "I declare that all information provided in this application is true, complete, and accurate to the best of my knowledge. I understand that providing false or misleading information may result in the rejection of this application or termination of enrollment."
    },
    {
        title: "Consent to Verify Information",
        text: "I consent to the school verifying any information provided in this application through appropriate channels, including but not limited to previous schools, employers, and reference contacts."
    },
    {
        title: "Data Processing Consent (POPIA/GDPR Compliant)",
        text: "I consent to the collection, storage, processing, and use of my personal information and that of my child for the purposes of education administration, communication, and compliance with legal requirements. I understand my rights regarding data protection and privacy."
    },
    {
        title: "School Rules and Disciplinary Policy Agreement",
        text: "I agree to support and enforce the school's rules, policies, and disciplinary procedures. I understand that cooperation between home and school is essential for my child's success and the wellbeing of the school community."
    }
];

const confirmationItems = [
    "I consent to storing my information for the school audit processes",
    "I consent to the school processing my information for affordability check",
    "I confirm that all information provided in this application is true and correct.",
    "I agree to abide by the school's rules, policies, and code of conduct.",
    "I acknowledge responsibility for all school fees as per the agreement.",
    "I consent to the school verifying my information where required.",
    "I consent to the storage and processing of my personal information."
];

export default function Step5Declaration() {
  const router = useRouter();
  // const [menuOpen, setMenuOpen] = useState(false); // Handled by AppHeader
  
  // State for checkboxes
  const [checkedState, setCheckedState] = useState<boolean[]>(
      new Array(confirmationItems.length).fill(false)
  );

  // State for signature
  const [signatureName, setSignatureName] = useState('');
  const [city, setCity] = useState('');
  
  // handleLogout handled by AppHeader

  const toggleCheckbox = (index: number) => {
      const updated = [...checkedState];
      updated[index] = !updated[index];
      setCheckedState(updated);
  };

  const areAllChecked = checkedState.every(Boolean);
  const isFormValid = areAllChecked && signatureName.trim().length >= 3;

  const handleContinue = () => {
    if (!isFormValid) {
        Alert.alert("Incomplete", "Please complete all checkboxes and sign the declaration.");
        return;
    }
    // Proceed to Step 6 (Review/Success)
    router.push('/re-registration/step6-review' as never);
  };

  const handleSaveProgress = () => {
      Alert.alert("Progress Saved", "Your declaration drafts have been saved.");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />

      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.headerContainer}>
              <View style={styles.headerIconBox}>
                  <Ionicons name="document-text-outline" size={24} color={palette.primary} />
              </View>
              <View>
                  <Text style={styles.headerTitle}>Declaration</Text>
                  <Text style={styles.headerSubtitle}>Please read and confirm the declarations. Select payment options and sign digitally to proceed.</Text>
              </View>
          </View>

         {/* Steps Indicator */}
         <View style={styles.stepsCard}>
            <Text style={styles.sectionHeaderTitle}>Registration Steps</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.stepsScrollContent}
            >
                <View style={styles.stepItemCompleted}>
                    <Ionicons name="checkmark-circle" size={20} color={palette.success} />
                    <Text style={styles.stepTextCompleted}>Children</Text>
                </View>
                <View style={styles.stepDivider} />
                <View style={styles.stepItemCompleted}>
                    <Ionicons name="checkmark-circle" size={20} color={palette.success} />
                    <Text style={styles.stepTextCompleted}>Details</Text>
                </View>
                <View style={styles.stepDivider} />
                <View style={styles.stepItemCompleted}>
                    <Ionicons name="checkmark-circle" size={20} color={palette.success} />
                    <Text style={styles.stepTextCompleted}>Financing</Text>
                </View>
                <View style={styles.stepDivider} />
                <View style={styles.stepItemActive}>
                    <View style={styles.stepCircleActive}>
                            <Text style={styles.stepNumberActive}>4</Text>
                    </View>
                    <Text style={styles.stepTextActive}>Confirm</Text>
                </View>
            </ScrollView>
        </View>

        {/* 1. Declaration Content Frame */}
        <View style={styles.sectionContainer}>
            <View style={styles.cardHeader}>
                <Ionicons name="library-outline" size={20} color={palette.primary} />
                <Text style={styles.cardHeaderTitle}>Terms & Conditions</Text>
            </View>
            
            <View style={styles.cardBody}>
                <ScrollView 
                    style={styles.termsScroll}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                >
                    {declarationSections.map((section, index) => (
                        <View key={index} style={styles.textBlock}>
                            <Text style={styles.textBlockTitle}>{section.title}</Text>
                            <Text style={styles.textBlockBody}>{section.text}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.divider} />

                <Pressable style={({pressed}) => [styles.downloadBtn, pressed && styles.pressedBtn]}>
                    <Ionicons name="cloud-download-outline" size={18} color={palette.primary} />
                    <Text style={styles.downloadBtnText}>Download Full Policy (PDF)</Text>
                </Pressable>
            </View>
        </View>

        {/* 2. Required Confirmations Frame */}
        <View style={styles.sectionContainer}>
            <View style={styles.cardHeader}>
                <Ionicons name="checkbox-outline" size={20} color={palette.primary} />
                <View>
                    <Text style={styles.cardHeaderTitle}>Required Confirmations</Text>
                    <Text style={styles.cardHeaderSubtitle}>All confirmations below are required to proceed</Text>
                </View>
            </View>
            
            <View style={styles.cardBody}>
                {confirmationItems.map((item, index) => (
                    <Pressable 
                        key={index} 
                        style={styles.checkItemRow}
                        onPress={() => toggleCheckbox(index)}
                    >
                        <View style={[styles.checkbox, checkedState[index] && styles.checkboxActive]}>
                            {checkedState[index] && <Ionicons name="checkmark" size={14} color="#fff" />}
                        </View>
                        <Text style={styles.checkItemText}>{item}</Text>
                    </Pressable>
                ))}
            </View>
        </View>

        {/* 3. Digital Signature Frame */}
        <View style={styles.sectionContainer}>
            <View style={styles.cardHeader}>
                <Ionicons name="pencil-outline" size={20} color={palette.primary} />
                <View>
                    <Text style={styles.cardHeaderTitle}>Digital Signature</Text>
                    <Text style={styles.cardHeaderSubtitle}>Your digital signature is required to complete this declaration</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                {/* Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Full Name (as Digital Signature) *</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your full name"
                            placeholderTextColor={palette.textMuted}
                            value={signatureName}
                            onChangeText={setSignatureName}
                        />
                    </View>
                    <Text style={styles.helperText}>Minimum 3 characters required</Text>
                </View>

                {/* City Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Place / City</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter city (optional)"
                            placeholderTextColor={palette.textMuted}
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>
                </View>

                {/* Date Display (Read Only) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Date</Text>
                    <View style={[styles.inputWrapper, styles.readOnlyInput]}>
                        <Text style={styles.readOnlyText}>2026/02/10</Text>
                        <Ionicons name="calendar-outline" size={18} color={palette.textMuted} />
                    </View>
                </View>
            </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerRow}>
            <Pressable 
                style={({pressed}) => [styles.backBtn, pressed && styles.pressedBtn]}
                onPress={() => router.back()}
            >
                <Text style={styles.backBtnText}>Back</Text>
            </Pressable>
            
            <View style={styles.rightActions}>
                <Pressable 
                    style={({pressed}) => [styles.saveBtn, pressed && styles.pressedBtn]}
                    onPress={handleSaveProgress}
                >
                    <Text style={styles.saveBtnText}>Save Progress</Text>
                </Pressable>

                <Pressable
                    style={({pressed}) => [
                        styles.continueBtn, 
                        (!isFormValid) && styles.continueBtnDisabled,
                        pressed && styles.pressedBtn
                    ]}
                    onPress={handleContinue}
                    disabled={!isFormValid}
                >
                    <Text style={styles.continueBtnText}>Continue</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                </Pressable>
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
      paddingHorizontal: 16,
      paddingVertical: 10,
  },
  menuBtn: {
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 8,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: palette.border,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
  },
  pressedBtn: { opacity: 0.8 },
  scrollContent: { padding: 16, paddingBottom: 60 },

  // Header
  headerContainer: {
      flexDirection: 'row',
      marginBottom: 24,
      marginTop: 8,
  },
  headerIconBox: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: palette.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: palette.text, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: palette.textSecondary, lineHeight: 20, flex: 1 },

  // Steps
  stepsCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
  },
  sectionHeaderTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: palette.textMuted,
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: 1,
  },
  stepsScrollContent: { flexDirection: 'row', alignItems: 'center' },
  stepItemCompleted: { flexDirection: 'row', alignItems: 'center', gap: 6, opacity: 0.5 },
  stepTextCompleted: { fontSize: 13, fontWeight: '600', color: palette.text, textDecorationLine: 'line-through' },
  stepItemActive: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: palette.primaryLight,
      paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, gap: 8,
  },
  stepCircleActive: {
      width: 20, height: 20, borderRadius: 10, backgroundColor: palette.primary,
      justifyContent: 'center', alignItems: 'center',
  },
  stepNumberActive: { color: '#fff', fontSize: 11, fontWeight: '700' },
  stepTextActive: { fontSize: 13, fontWeight: '600', color: palette.primary },
  stepDivider: { height: 1, width: 24, backgroundColor: palette.border, marginHorizontal: 8 },

  // Unified Section Card Style
  sectionContainer: {
      backgroundColor: palette.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.border,
      marginBottom: 24,
      overflow: 'hidden',
  },
  cardHeader: {
      flexDirection: 'row', alignItems: 'center', gap: 10,
      paddingHorizontal: 20, paddingVertical: 16,
      backgroundColor: '#F8FAFC',
      borderBottomWidth: 1, borderBottomColor: palette.border,
  },
  cardHeaderTitle: { fontSize: 15, fontWeight: '700', color: palette.text },
  cardHeaderSubtitle: { fontSize: 12, color: palette.textMuted, marginTop: 2 },
  cardBody: { padding: 20 },
  
  termsScroll: { maxHeight: 240, marginBottom: 16 },

  // Declaration Specifics
  textBlock: { marginBottom: 20 },
  textBlockTitle: { fontSize: 14, fontWeight: '700', color: palette.text, marginBottom: 4 },
  textBlockBody: { fontSize: 13, color: palette.textSecondary, lineHeight: 20 },
  divider: { height: 1, backgroundColor: palette.border, marginBottom: 20 },
  downloadBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      paddingVertical: 12,
      borderWidth: 1, borderColor: palette.primary, borderRadius: 8, borderStyle: 'dashed',
      backgroundColor: palette.primaryLight,
  },
  downloadBtnText: { fontSize: 13, fontWeight: '600', color: palette.primary },

  // Checkbox Specifics
  checkItemRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16, gap: 12 },
  checkbox: {
      width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: palette.border,
      marginTop: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',
  },
  checkboxActive: { backgroundColor: palette.primary, borderColor: palette.primary },
  checkItemText: { flex: 1, fontSize: 14, color: palette.text, lineHeight: 20 },

  // Signature Specifics
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: palette.textSecondary, marginBottom: 6 },
  inputWrapper: {
      flexDirection: 'row', alignItems: 'center',
      borderWidth: 1, borderColor: palette.border, borderRadius: 10,
      backgroundColor: palette.inputBg, paddingHorizontal: 12,
      height: 44,
  },
  textInput: { flex: 1, fontSize: 14, color: palette.text },
  helperText: { fontSize: 11, color: palette.textMuted, marginTop: 4 },
  readOnlyInput: { backgroundColor: '#F1F5F9', justifyContent: 'space-between' },
  readOnlyText: { fontSize: 14, color: palette.textSecondary, fontWeight: '500' },

  // Footer
  footerRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10,
  },
  backBtn: {
      paddingVertical: 14, paddingHorizontal: 20,
  },
  backBtnText: { fontSize: 15, fontWeight: '600', color: palette.textSecondary },
  rightActions: { flexDirection: 'row', gap: 12 },
  saveBtn: {
      paddingVertical: 14, paddingHorizontal: 20, borderRadius: 26, borderWidth: 1, borderColor: palette.border, backgroundColor: '#fff',
  },
  saveBtnText: { fontSize: 14, fontWeight: '600', color: palette.textSecondary },
  continueBtn: {
      flexDirection: 'row', gap: 8, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 26, backgroundColor: palette.primary,
      alignItems: 'center', justifyContent: 'center',
  },
  continueBtnDisabled: { backgroundColor: palette.textMuted },
  continueBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },
});

