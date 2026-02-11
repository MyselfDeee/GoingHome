import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import SideMenu from '../../components/SideMenu'; // Handled by AppHeader
import AppHeader from '../../components/AppHeader';

// Updated palette to match reference image (soft blues, clean whites, subtle shadows)
const palette = {
  background: '#F9FAFC', // Very light cool gray
  card: '#FFFFFF',
  text: '#1E293B', // Slate-800
  textSecondary: '#64748B', // Slate-500
  textMuted: '#94A3B8', // Slate-400
  primary: '#6366F1', // Indigo-500
  primaryLight: '#EEF2FF', // Indigo-50
  border: '#E2E8F0', // Slate-200
  success: '#10B981', // Emerald-500
  warningBg: '#FFFBEB', // Amber-50
  warningText: '#B45309', // Amber-700
  shadow: '#0F172A',
};

// Mock data
const mockStudents = [
  {
    id: '1',
    initials: 'MR',
    name: 'Mikhenso Rikhotso',
    grade: 'Grade 11',
    studentId: '2020155260088',
    date: '03/12/2020',
  },
];

export default function Step1SelectChildren() {
  const router = useRouter();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  // const [menuOpen, setMenuOpen] = useState(false); // Handled by AppHeader

  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedStudents.length === 0) {
      // In a real app we might show a toast, simply return for now or alert
      return;
    }
    router.push('/re-registration/step2-update' as never);
  };

  // handleLogout handled by AppHeader

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />

      <AppHeader />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
            <View style={styles.headerIconBox}>
                <Ionicons name="school-outline" size={24} color={palette.primary} />
            </View>
            <View>
                <Text style={styles.headerTitle}>Student Re-Registration</Text>
                <Text style={styles.headerSubtitle}>2025 Academic Year</Text>
            </View>
        </View>

        {/* Important Notice Card */}
        <View style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
                <Ionicons name="calendar-outline" size={18} color={palette.primary} />
                <Text style={styles.noticeHeaderText}>Important</Text>
            </View>
            <View style={styles.noticeDivider} />
            <View style={styles.noticeContent}>
                <View style={styles.noticeIconBox}>
                    <Ionicons name="alert-circle" size={20} color={palette.warningText} />
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.noticeTitle}>Registration Deadline</Text>
                    <Text style={styles.noticeDesc}>March 31, 2025 – Ensure timely submission</Text>
                </View>
            </View>
        </View>

        {/* Progress Steps Card */}
        <View style={styles.stepsCard}>
            <Text style={styles.sectionHeaderTitle}>Registration Steps</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.stepsScrollContent}
            >
                {/* Step 1 (Active) */}
                <View style={styles.stepItemActive}>
                    <Ionicons name="checkbox" size={20} color={palette.primary} />
                    <Text style={styles.stepTextActive}>Select Children</Text>
                </View>
                {/* Divider */}
                <View style={styles.stepDivider} />
                {/* Step 2 */}
                <View style={styles.stepItemInactive}>
                    <Text style={styles.stepNumberInactive}>2</Text>
                    <Text style={styles.stepTextInactive}>Update Details</Text>
                </View>
                {/* Divider */}
                <View style={styles.stepDivider} />
                {/* Step 3 */}
                <View style={styles.stepItemInactive}>
                    <Text style={styles.stepNumberInactive}>3</Text>
                    <Text style={styles.stepTextInactive}>Review & Submit</Text>
                </View>
            </ScrollView>
            {/* Progress Bar Visual */}
            <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
            </View>
        </View>

        {/* Selection Section */}
        <View style={styles.selectionCard}>
            <View style={styles.selectionHeader}>
                <View style={styles.selectionIconRow}>
                    <Ionicons name="people" size={22} color={palette.primary} />
                    <Text style={styles.sectionHeaderTitle}>Select Children for Re-Registration</Text>
                </View>
                <Text style={styles.selectionDesc}>
                    Choose which children you'd like to re-register for the upcoming academic year. You can select multiple students at once.
                </Text>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.childrenListHeader}>
                <Text style={styles.childrenListTitle}>Your Children</Text>
                <Text style={styles.childrenListCount}>{mockStudents.length} student available for re-registration</Text>
            </View>

            {/* Student Cards */}
            {mockStudents.map((student) => {
                const isSelected = selectedStudents.includes(student.id);
                return (
                    <Pressable 
                        key={student.id} 
                        style={[styles.studentCard, isSelected && styles.studentCardSelected]}
                        onPress={() => toggleStudent(student.id)}
                    >
                        <View style={styles.checkboxContainer}>
                            <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
                            </View>
                        </View>
                        
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>{student.initials}</Text>
                        </View>

                        <View style={styles.studentInfo}>
                            <View style={styles.studentHeaderRow}>
                                <Text style={styles.studentName}>{student.name}</Text>
                                <Ionicons name="create-outline" size={18} color={palette.textMuted} />
                            </View>
                            <Text style={styles.studentGrade}>{student.grade}</Text>
                            
                            <View style={styles.studentMetaRow}>
                                <Text style={styles.metaText}>ID: {student.studentId}</Text>
                                <View style={styles.dateMeta}>
                                    <Ionicons name="calendar-outline" size={14} color={palette.textMuted} />
                                    <Text style={styles.metaText}>{student.date}</Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                );
            })}

            {/* Footer Buttons */}
            <View style={styles.footerRow}>
                <Pressable 
                    style={({pressed}) => [styles.cancelBtn, pressed && styles.pressedBtn]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>
                
                <Pressable
                    style={({pressed}) => [
                        styles.continueBtn, 
                        selectedStudents.length === 0 && styles.continueBtnDisabled,
                        pressed && styles.pressedBtn
                    ]}
                    onPress={handleContinue}
                    disabled={selectedStudents.length === 0}
                >
                    <Text style={styles.continueBtnText}>Continue →</Text>
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
      marginBottom: 24,
      marginTop: 8,
  },
  headerIconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.primaryLight, // Icon similar to reference
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

  // Notice Card
  noticeCard: {
      backgroundColor: '#FFFBEB', // Light yellow/cream bg
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#FEF3C7',
      padding: 16,
      marginBottom: 20,
  },
  noticeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
  },
  noticeHeaderText: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.text,
  },
  noticeDivider: {
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.05)',
      marginBottom: 12,
  },
  noticeContent: {
      flexDirection: 'row',
      gap: 12,
  },
  noticeIconBox: {
      width: 24,
      height: 24,
      backgroundColor: 'rgba(245, 158, 11, 0.2)', // Orangeish transparent
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
  },
  noticeTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: palette.text,
      marginBottom: 2,
  },
  noticeDesc: {
      fontSize: 13,
      color: palette.textSecondary,
  },

  // Steps Card
  stepsCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      // Soft shadow
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
  },
  stepsScrollContent: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      minWidth: '100%', 
  },
  stepItemActive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.primaryLight,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      gap: 6,
      flexShrink: 0,
  },
  stepTextActive: {
      fontSize: 13,
      fontWeight: '600',
      color: palette.text,
  },
  stepDivider: {
      height: 1,
      width: 16,
      backgroundColor: palette.border,
      marginHorizontal: 4,
  },
  stepItemInactive: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      opacity: 0.5,
      flexShrink: 0,
  },
  stepNumberInactive: {
      fontSize: 13,
      color: palette.textSecondary,
      fontWeight: '600',
      backgroundColor: palette.border,
      width: 20,
      height: 20,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 10,
      overflow: 'hidden',
  },
  stepTextInactive: {
      fontSize: 13,
      color: palette.textSecondary,
  },
  progressBarBg: {
      height: 6,
      backgroundColor: palette.primaryLight,
      borderRadius: 3,
      marginTop: 4,
      width: '100%',
      overflow: 'hidden',
  },
  progressBarFill: {
      width: '33%',
      height: '100%',
      backgroundColor: palette.primary,
      borderRadius: 3,
  },

  // Selection Card
  selectionCard: {
      backgroundColor: palette.card,
      borderRadius: 16,
      padding: 20,
      shadowColor: palette.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 3,
      marginBottom: 40,
  },
  selectionHeader: {
      marginBottom: 16,
  },
  selectionIconRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
  },
  sectionHeaderTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: palette.text,
  },
  selectionDesc: {
      fontSize: 14,
      color: palette.textSecondary,
      lineHeight: 20,
  },
  divider: {
      height: 1,
      backgroundColor: palette.border,
      marginVertical: 16,
  },
  childrenListHeader: {
      marginBottom: 12,
  },
  childrenListTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: palette.text,
      marginBottom: 4,
  },
  childrenListCount: {
      fontSize: 13,
      color: palette.textSecondary,
  },
  
  // Student Card
  studentCard: {
      flexDirection: 'row',
      backgroundColor: '#F8FAGF', // Fallback, styles below override
      borderWidth: 1,
      borderColor: palette.border,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#FAFAFA', // Default light background
  },
  studentCardSelected: {
      backgroundColor: '#F7F9FF', // Very light blue tint
      borderColor: palette.primary,
  },
  checkboxContainer: {
      marginRight: 16,
  },
  checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 1.5,
      borderColor: '#CBD5E1',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  checkboxSelected: {
      backgroundColor: palette.primary,
      borderColor: palette.primary,
  },
  avatarContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#818CF8', // Indigo-400
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
  },
  avatarText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
  },
  studentInfo: {
      flex: 1,
  },
  studentHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
  },
  studentName: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.text,
  },
  studentGrade: {
      fontSize: 14,
      color: palette.textSecondary,
      marginBottom: 8,
  },
  studentMetaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  metaText: {
      fontSize: 12,
      color: palette.textMuted,
  },
  dateMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },

  // Footer Buttons
  footerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 12,
      paddingTop: 8,
  },
  cancelBtn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
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
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 26,
      backgroundColor: palette.primary,
      shadowColor: palette.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
  },
  continueBtnDisabled: {
      opacity: 0.5,
      shadowOpacity: 0,
  },
  continueBtnText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
  },
});

