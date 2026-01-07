import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, SafeAreaView, useWindowDimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';

interface AdmissionApplication {
  id: string;
  childName: string;
  childAge: number;
  status: 'new' | 'review' | 'interview' | 'approved' | 'rejected';
  appliedDate: string;
  reviewDate?: string;
  interviewDate?: string;
  notes?: string;
  requirementsCompleted: number;
  totalRequirements: number;
}

const palette = {
  background: '#f5f7fb',
  card: '#ffffff',
  border: '#e5e7eb',
  primary: '#1f64f2',
  success: '#1db954',
  danger: '#f87171',
  warning: '#f59e0b',
  muted: '#6b7280',
  text: '#1f2937',
};

const statusColors = {
  new: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af', icon: '📋' },
  review: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', icon: '👀' },
  interview: { bg: '#dbeafe', border: '#0284c7', text: '#0c2340', icon: '🎤' },
  approved: { bg: '#dcfce7', border: '#16a34a', text: '#166534', icon: '✓' },
  rejected: { bg: '#fee2e2', border: '#ef4444', text: '#991b1b', icon: '✗' },
};

const sampleApplication: AdmissionApplication = {
  id: '1',
  childName: 'Mikhenso Rikhotso',
  childAge: 12,
  status: 'interview',
  appliedDate: '01/12/2025',
  reviewDate: '05/12/2025',
  interviewDate: '20/12/2025',
  notes: 'School impressed with academic performance. Interview scheduled for 20th December 2025 at 10:00 AM in the principal\'s office.',
  requirementsCompleted: 4,
  totalRequirements: 5,
};

export default function AdmissionsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 480;
  const [application, setApplication] = React.useState<AdmissionApplication | null>(sampleApplication);
  const [loading, setLoading] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : -300,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [menuOpen, slideAnim]);

  React.useEffect(() => {
    // Simulate fetching admissions data
    const fetchAdmissions = async () => {
      setLoading(true);
      try {
        // In production, replace with actual API call
        // const response = await fetch('/parent/admissions');
        // const data = await response.json();
        // setApplication(data);
        setApplication(sampleApplication);
      } catch (error) {
        console.error('Error fetching admissions:', error);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      new: 'New Application',
      review: 'Under Review',
      interview: 'Interview Scheduled',
      approved: 'Approved',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  };

  const statusSteps = ['new', 'review', 'interview', 'approved'];

  if (!application) {
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
          <Pressable
            style={styles.logoutBtn}
            onPress={() => {
              router.push('/(tabs)' as never);
            }}>
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
              router.push('/announcements' as never);
            }}>
            <Text style={styles.dropdownIcon}>📢</Text>
            <View style={styles.itemContent}>
              <Text style={styles.dropdownText}>Announcements</Text>
              <Text style={styles.dropdownSubtext}>School news & updates</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.dropdownItem}
            onPress={() => {
              setMenuOpen(false);
              router.push('/profile' as never);
            }}>
            <Text style={styles.dropdownIcon}>👤</Text>
            <View style={styles.itemContent}>
              <Text style={styles.dropdownText}>Profile</Text>
              <Text style={styles.dropdownSubtext}>Manage your information</Text>
            </View>
          </Pressable>
        </Animated.View>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateIcon}>📭</Text>
          <Text style={styles.emptyStateTitle}>No Active Applications</Text>
          <Text style={styles.emptyStateSubtitle}>
            You don't have any admissions applications at this time.
          </Text>
          <Pressable
            style={styles.newAppBtn}
            onPress={() => {
              console.log('Start new application');
            }}
          >
            <Text style={styles.newAppBtnText}>+ Start Application</Text>
          </Pressable>
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
        <Pressable
          style={styles.logoutBtn}
          onPress={() => {
            router.push('/(tabs)' as never);
          }}>
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
            router.push('/announcements' as never);
          }}>
          <Text style={styles.dropdownIcon}>📢</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Announcements</Text>
            <Text style={styles.dropdownSubtext}>School news & updates</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.dropdownItem}
          onPress={() => {
            setMenuOpen(false);
            router.push('/profile' as never);
          }}>
          <Text style={styles.dropdownIcon}>👤</Text>
          <View style={styles.itemContent}>
            <Text style={styles.dropdownText}>Profile</Text>
            <Text style={styles.dropdownSubtext}>Manage your information</Text>
          </View>
        </Pressable>
      </Animated.View>

      <ScrollView
        contentContainerStyle={[styles.container, isSmall && styles.containerSmall]}
        showsVerticalScrollIndicator={false}
      >
        {/* Application Header */}
        <View style={styles.headerCard}>
          <View>
            <Text style={styles.childName}>{application.childName}</Text>
            <Text style={styles.childInfo}>Age {application.childAge} • Applied {application.appliedDate}</Text>
          </View>
        </View>

        {/* Status Pipeline */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Application Status</Text>
          <Text style={styles.sectionSubtitle}>Track your application progress</Text>

          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: statusColor.bg, borderColor: statusColor.border }]}>
            <Text style={styles.statusIcon}>{statusColor.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.statusLabel, { color: statusColor.text }]}>
                {getStatusLabel(application.status)}
              </Text>
            </View>
          </View>

          {/* Timeline Steps */}
          <View style={styles.timeline}>
            {statusSteps.map((step, index) => {
              const isActive = index <= currentStatusIndex;
              const stepColor = statusColors[step as keyof typeof statusColors];
              return (
                <View key={step} style={styles.timelineItem}>
                  <View
                    style={[
                      styles.timelineStep,
                      {
                        backgroundColor: isActive ? stepColor.border : palette.border,
                        borderColor: isActive ? stepColor.border : palette.border,
                      },
                    ]}
                  >
                    <Text style={styles.timelineStepText}>{index + 1}</Text>
                  </View>
                  <Text
                    style={[
                      styles.timelineLabel,
                      { color: isActive ? palette.text : palette.muted },
                      { fontWeight: isActive ? '600' : '400' },
                    ]}
                  >
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </Text>
                  {index < statusSteps.length - 1 && (
                    <View
                      style={[
                        styles.timelineConnector,
                        { backgroundColor: index < currentStatusIndex ? statusColors[step as keyof typeof statusColors].border : palette.border },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Requirements Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.sectionSubtitle}>Upload supporting documents</Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(application.requirementsCompleted / application.totalRequirements) * 100}%`,
                  backgroundColor: application.requirementsCompleted === application.totalRequirements ? palette.success : palette.primary,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {application.requirementsCompleted} of {application.totalRequirements} documents uploaded
          </Text>

          <View style={styles.requirementsList}>
            {Array.from({ length: application.totalRequirements }).map((_, i) => (
              <View key={i} style={styles.requirementItem}>
                <Text style={styles.requirementIcon}>
                  {i < application.requirementsCompleted ? '✓' : '○'}
                </Text>
                <Text style={styles.requirementLabel}>
                  {['Birth Certificate', 'Academic Records', 'Medical Report', 'Character Reference', 'Passport Copy'][i]}
                </Text>
                <Text style={styles.requirementStatus}>
                  {i < application.requirementsCompleted ? 'Uploaded' : 'Pending'}
                </Text>
              </View>
            ))}
          </View>

          {application.requirementsCompleted < application.totalRequirements && (
            <Pressable style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>📁 Upload Documents</Text>
            </Pressable>
          )}
        </View>

        {/* Notes from School */}
        {application.notes && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📝 Notes from School</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{application.notes}</Text>
            </View>
          </View>
        )}

        {/* Timeline Dates */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Key Dates</Text>
          <View style={styles.datesList}>
            <View style={styles.dateItem}>
              <Text style={styles.dateIcon}>📅</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.dateLabel}>Application Submitted</Text>
                <Text style={styles.dateValue}>{application.appliedDate}</Text>
              </View>
            </View>

            {application.reviewDate && (
              <View style={styles.dateItem}>
                <Text style={styles.dateIcon}>👀</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateLabel}>Review Completed</Text>
                  <Text style={styles.dateValue}>{application.reviewDate}</Text>
                </View>
              </View>
            )}

            {application.interviewDate && (
              <View style={styles.dateItem}>
                <Text style={styles.dateIcon}>🎤</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateLabel}>Interview Scheduled</Text>
                  <Text style={styles.dateValue}>{application.interviewDate}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>📧 Contact School</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.secondaryBtn]}>
            <Text style={styles.secondaryBtnText}>📥 Download Application</Text>
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
  pageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.primary,
  },
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 24,
  },
  containerSmall: {
    padding: 12,
    gap: 12,
  },
  headerCard: {
    backgroundColor: palette.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  childName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  childInfo: {
    fontSize: 12,
    color: '#e0e7ff',
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: palette.muted,
    marginTop: -8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    gap: 10,
    marginVertical: 8,
  },
  statusIcon: {
    fontSize: 24,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  timelineItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  timelineStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  timelineStepText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  timelineLabel: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  timelineConnector: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    zIndex: -1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.border,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: palette.muted,
    marginBottom: 12,
  },
  requirementsList: {
    gap: 10,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    gap: 10,
  },
  requirementIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.success,
    width: 20,
  },
  requirementLabel: {
    flex: 1,
    fontSize: 12,
    color: palette.text,
    fontWeight: '500',
  },
  requirementStatus: {
    fontSize: 10,
    color: palette.muted,
    fontWeight: '600',
  },
  uploadBtn: {
    backgroundColor: palette.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  notesBox: {
    backgroundColor: '#f0f6ff',
    borderLeftWidth: 4,
    borderLeftColor: palette.primary,
    padding: 12,
    borderRadius: 8,
  },
  notesText: {
    fontSize: 12,
    color: palette.text,
    lineHeight: 18,
  },
  datesList: {
    gap: 12,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    gap: 12,
  },
  dateIcon: {
    fontSize: 18,
  },
  dateLabel: {
    fontSize: 11,
    color: palette.muted,
  },
  dateValue: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.text,
    marginTop: 2,
  },
  actionsContainer: {
    gap: 10,
  },
  actionBtn: {
    backgroundColor: palette.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: palette.primary,
  },
  secondaryBtnText: {
    color: palette.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: palette.muted,
    textAlign: 'center',
  },
  newAppBtn: {
    backgroundColor: palette.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  newAppBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
