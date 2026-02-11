import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  useWindowDimensions,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from '../../components/SideMenu';
import SuccessModal from '@/components/re-registration/SuccessModal';

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
  warningBg: '#FFFBEB',
  warningText: '#B45309',
  shadow: '#0F172A',
  inputBg: '#F8FAFC',
};

// Mock Students Data
const mockStudents = [
  {
    id: '1',
    initials: 'MR',
    firstName: 'Mikhenso',
    lastName: 'Rikhotso',
    currentGrade: '11',
    nextGrade: '12',
    studentId: '2020155260088',
  },
  {
    id: '2',
    initials: 'TR',
    firstName: 'Tlangelani',
    lastName: 'Rikhotso',
    currentGrade: '9',
    nextGrade: '10',
    studentId: '2022455210044',
  }
];

interface StudentFormProps {
    student: typeof mockStudents[0];
    isOpen: boolean;
    onToggle: () => void;
}

const StudentFormAccordion = ({ student, isOpen, onToggle }: StudentFormProps) => {
    // Form state would conceptually be managed here or lifted up. 
    // For UI demonstration, we render the layout static inputs.
    
    return (
        <View style={[styles.accordionCard, isOpen && styles.accordionCardOpen]}>
            <Pressable 
                style={[styles.accordionHeader, isOpen && styles.accordionHeaderOpen]} 
                onPress={onToggle}
            >
                <View style={styles.accordionHeaderLeft}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>{student.initials}</Text>
                    </View>
                    <View>
                        <Text style={styles.studentName}>{student.firstName} {student.lastName}</Text>
                        <Text style={styles.studentId}>ID: {student.studentId} • Grade {student.currentGrade} to {student.nextGrade}</Text>
                    </View>
                </View>
                <Ionicons 
                    name={isOpen ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={palette.textSecondary} 
                />
            </Pressable>

            {isOpen && (
                <View style={styles.accordionContent}>
                    {/* Section 1: Personal Details */}
                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                        
                        <View style={styles.inputRow}>
                             <View style={styles.inputGroup}>
                                <Text style={styles.label}>First Name</Text>
                                <TextInput 
                                    style={styles.input} 
                                    value={student.firstName} 
                                    editable={false} // Demo readonly
                                />
                             </View>
                             <View style={styles.inputGroup}>
                                <Text style={styles.label}>Last Name</Text>
                                <TextInput 
                                    style={styles.input} 
                                    value={student.lastName}
                                    editable={false} 
                                />
                             </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Student Email</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Enter student email"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Section 2: Contact Info */}
                    <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Emergency Contact</Text>
                        <View style={styles.inputRow}>
                             <View style={styles.inputGroup}>
                                <Text style={styles.label}>Contact Name</Text>
                                <TextInput style={styles.input} placeholder="Parent/Guardian Name" />
                             </View>
                             <View style={styles.inputGroup}>
                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput style={styles.input} placeholder="+27 ..." keyboardType="phone-pad" />
                             </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                     {/* Section 3: Address */}
                     <View style={styles.formSection}>
                        <Text style={styles.sectionTitle}>Physical Address</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Street Address</Text>
                            <TextInput style={styles.input} placeholder="123 Street Name" />
                        </View>
                        <View style={styles.inputRow}>
                             <View style={styles.inputGroup}>
                                <Text style={styles.label}>City</Text>
                                <TextInput style={styles.input} placeholder="City" />
                             </View>
                             <View style={styles.inputGroup}>
                                <Text style={styles.label}>Post Code</Text>
                                <TextInput style={styles.input} placeholder="0000" keyboardType="numeric" />
                             </View>
                        </View>
                    </View>
                    
                    <View style={styles.statusBadgeRow}>
                        <Ionicons name="checkmark-circle" size={16} color={palette.success} />
                        <Text style={styles.statusText}>All essential data provided</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

export default function Step2UpdateDetails() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Track which student accordion is open (default to first)
  const [openStudentId, setOpenStudentId] = useState<string | null>('1');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogout = () => {
    router.replace('/(tabs)' as never);
  };

  const handleContinue = () => {
    // Logic to validate
    setShowSuccessModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />
      
      {/* Top Nav */}
      <View style={styles.topNav}>
        <Pressable 
            style={({pressed}) => [styles.menuBtn, pressed && styles.pressedBtn]} 
            onPress={() => setMenuOpen(true)}
        >
          <Ionicons name="menu" size={24} color={palette.text} />
        </Pressable>
      </View>

      <SideMenu isVisible={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerIconBox}>
                    <Ionicons name="create-outline" size={24} color={palette.primary} />
                </View>
                <View>
                    <Text style={styles.headerTitle}>Update Details</Text>
                    <Text style={styles.headerSubtitle}>Verify student information</Text>
                </View>
            </View>

            {/* Info Banner */}
            <View style={styles.infoBanner}>
                <Ionicons name="information-circle" size={20} color={palette.primary} />
                <Text style={styles.infoText}>
                    Please review and update detailed information for each student below. Accurate data ensures smooth registration.
                </Text>
            </View>

            {/* Steps Indicator */}
             <View style={styles.stepsCard}>
                <Text style={styles.sectionHeaderTitle}>Registration Steps</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.stepsScrollContent}
                >
                    {/* Step 1 (Completed) */}
                    <View style={styles.stepItemCompleted}>
                        <Ionicons name="checkmark-circle" size={20} color={palette.success} />
                        <Text style={styles.stepTextCompleted}>Select Children</Text>
                    </View>
                    <View style={styles.stepDivider} />
                    {/* Step 2 (Active) */}
                    <View style={styles.stepItemActive}>
                        <View style={styles.stepCircleActive}>
                             <Text style={styles.stepNumberActive}>2</Text>
                        </View>
                        <Text style={styles.stepTextActive}>Update Details</Text>
                    </View>
                    <View style={styles.stepDivider} />
                    {/* Step 3 */}
                    <View style={styles.stepItemInactive}>
                        <Text style={styles.stepNumberInactive}>3</Text>
                        <Text style={styles.stepTextInactive}>Review & Submit</Text>
                    </View>
                </ScrollView>
            </View>

            {/* Student Dropdowns */}
            <Text style={styles.sectionLabel}>Students ({mockStudents.length})</Text>
            
            <View style={styles.accordionsContainer}>
                {mockStudents.map((student) => (
                    <StudentFormAccordion 
                        key={student.id}
                        student={student}
                        isOpen={openStudentId === student.id}
                        onToggle={() => setOpenStudentId(openStudentId === student.id ? null : student.id)}
                    />
                ))}
            </View>

            {/* Bank Details Section (Shared for all students) */}
            <View style={styles.stepsCard}>
                <View style={[styles.headerContainer, { marginBottom: 20, marginTop: 0 }]}>
                    <View style={[styles.headerIconBox, { backgroundColor: palette.primaryLight }]}>
                         <Ionicons name="card-outline" size={24} color={palette.primary} />
                    </View>
                    <View>
                        <Text style={[styles.headerTitle, { fontSize: 17 }]}>Bank Account Details</Text>
                        <Text style={styles.headerSubtitle}>For debit order instructions</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.inputRow}>
                            <View style={styles.inputGroup}>
                            <Text style={styles.label}>Bank Name</Text>
                            <TextInput style={styles.input} placeholder="e.g. FNB, Capitec" />
                            </View>
                            <View style={styles.inputGroup}>
                            <Text style={styles.label}>Account Type</Text>
                            <TextInput style={styles.input} placeholder="Savings/Current" />
                            </View>
                    </View>
                    <View style={styles.inputRow}>
                            <View style={styles.inputGroup}>
                            <Text style={styles.label}>Account Number</Text>
                            <TextInput style={styles.input} placeholder="Account Number" keyboardType="numeric" />
                            </View>
                            <View style={styles.inputGroup}>
                            <Text style={styles.label}>Branch Code</Text>
                            <TextInput style={styles.input} placeholder="Branch Code" keyboardType="numeric" />
                            </View>
                    </View>
                </View>
                
                <View style={[styles.statusBadgeRow, { marginTop: 4, backgroundColor: palette.primaryLight }]}>
                    <Ionicons name="lock-closed" size={14} color={palette.primary} />
                    <Text style={[styles.statusText, { color: palette.primary }]}>Details are securely encrypted</Text>
                </View>
            </View>

            {/* Footer Buttons */}
            <View style={styles.footerRow}>
                <Pressable 
                    style={({pressed}) => [styles.cancelBtn, pressed && styles.pressedBtn]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.cancelBtnText}>Back</Text>
                </Pressable>
                
                <Pressable
                    style={({pressed}) => [styles.continueBtn, pressed && styles.pressedBtn]}
                    onPress={handleContinue}
                >
                    <Text style={styles.continueBtnText}>Save & Continue →</Text>
                </Pressable>
            </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          visible={showSuccessModal}
          title="Student details updated"
          count={mockStudents.length}
          onContinue={() => {
              setShowSuccessModal(false);
              router.push('/re-registration/step4-financing' as never); 
          }}
        />
      )}

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
  pressedBtn: {
      opacity: 0.8,
  },
  scrollContent: {
      padding: 16,
      paddingBottom: 40,
  },

  // Header
  headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 8,
  },
  headerIconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
  },
  headerSubtitle: {
      fontSize: 14,
      color: palette.textSecondary,
  },

  // Info Banner
  infoBanner: {
      flexDirection: 'row',
      backgroundColor: '#EFF6FF', // Blue-50
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
      gap: 12,
      borderWidth: 1,
      borderColor: '#DBEAFE', // Blue-100
  },
  infoText: {
      flex: 1,
      fontSize: 13,
      color: '#3B82F6', // Blue-500
      lineHeight: 20,
  },

  // Steps
  stepsCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 32,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
  },
  sectionHeaderTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.textSecondary,
      marginBottom: 16,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
  },
  stepsScrollContent: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  stepItemCompleted: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      opacity: 0.6,
  },
  stepTextCompleted: {
      fontSize: 13,
      fontWeight: '600',
      color: palette.text,
      textDecorationLine: 'line-through',
  },
  stepItemActive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.primaryLight,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      gap: 8,
  },
  stepCircleActive: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: palette.primary,
      justifyContent: 'center',
      alignItems: 'center',
  },
  stepNumberActive: {
      color: '#fff',
      fontSize: 11,
      fontWeight: '700',
  },
  stepTextActive: {
      fontSize: 13,
      fontWeight: '600',
      color: palette.primary,
  },
  stepItemInactive: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      opacity: 0.5,
  },
  stepNumberInactive: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: palette.border,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 11,
      fontWeight: '600',
      color: palette.textSecondary,
      overflow: 'hidden',
  },
  stepTextInactive: {
      fontSize: 13,
      color: palette.textSecondary,
  },
  stepDivider: {
      height: 1,
      width: 24,
      backgroundColor: palette.border,
      marginHorizontal: 8,
  },

  // Accordions
  sectionLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.text,
      marginBottom: 12,
  },
  accordionsContainer: {
      gap: 16,
      marginBottom: 40,
  },
  accordionCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.border,
      overflow: 'hidden',
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
  },
  accordionCardOpen: {
      borderColor: palette.primary,
      shadowOpacity: 0.08,
      shadowRadius: 12,
  },
  accordionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
  },
  accordionHeaderOpen: {
      backgroundColor: '#F8FAFC',
      borderBottomWidth: 1,
      borderBottomColor: palette.border,
  },
  accordionHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  avatarCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E2E8F0',
      justifyContent: 'center',
      alignItems: 'center',
  },
  avatarText: {
      fontSize: 14,
      fontWeight: '700',
      color: palette.textSecondary,
  },
  studentName: {
      fontSize: 15,
      fontWeight: '700',
      color: palette.text,
  },
  studentId: {
      fontSize: 12,
      color: palette.textSecondary,
      marginTop: 2,
  },
  accordionContent: {
      padding: 20,
      backgroundColor: '#fff',
  },
  
  // Form Styles
  formSection: {
      marginBottom: 8,
  },
  sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.primary,
      marginBottom: 16,
  },
  inputRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
  },
  inputGroup: {
      flex: 1,
      marginBottom: 16,
  },
  label: {
      fontSize: 13,
      fontWeight: '500',
      color: palette.textSecondary,
      marginBottom: 6,
  },
  input: {
      height: 44,
      backgroundColor: palette.inputBg,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: palette.border,
      paddingHorizontal: 12,
      fontSize: 14,
      color: palette.text,
  },
  divider: {
      height: 1,
      backgroundColor: palette.border,
      marginVertical: 16,
  },
  statusBadgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      backgroundColor: '#F0FDF4', // Green-50
      padding: 10,
      borderRadius: 8,
      marginTop: 8,
  },
  statusText: {
      fontSize: 13,
      fontWeight: '600',
      color: palette.success,
  },

  // Footer
  footerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      marginTop: 20,
  },
  cancelBtn: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 26,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: '#fff',
  },
  cancelBtnText: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.textSecondary,
  },
  continueBtn: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 26,
      backgroundColor: palette.primary,
      alignItems: 'center',
      shadowColor: palette.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
  },
  continueBtnText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
  },
});