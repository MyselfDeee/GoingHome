import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, useWindowDimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import NoticesScreen from '../components/NoticesScreen';
import SideMenu from '../components/SideMenu';

const palette = {
  background: '#F0F2F5', // Slightly darker/blueish gray for contrast
  card: '#FFFFFF',
  text: '#1F2937', // Gray-800
  textSecondary: '#6B7280', // Gray-500
  primary: '#4F46E5', // Indigo-600
  success: '#10B981', // Emerald-500
  danger: '#EF4444', // Red-500
  warning: '#F97316', // Orange-500
  warningLight: '#FFEDD5', // Orange-100
  successLight: '#D1FAE5', // Emerald-100
  dangerLight: '#FEE2E2', // Red-100
  border: '#E5E7EB',
};

export default function ParentDashboard() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const parentName = "Mr. Rikhotso"; // Placeholder for dynamic data

  const handleLogout = () => {
    router.push('/(tabs)' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top Navigation Bar */}
      <View style={styles.topNavbar}>
        <View style={styles.navLeft}>
           <Pressable onPress={() => setMenuOpen(true)} style={styles.menuBtn}>
              <Ionicons name="menu" size={28} color={palette.text} />
           </Pressable>
           <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeLabel}>Welcome,</Text>
              <Text style={styles.welcomeName}>{parentName}</Text>
           </View>
        </View>
        <Pressable onPress={() => router.push('/profile' as never)}>
          <View style={styles.profileImageContainer}>
             <Text style={styles.profileInitials}>MR</Text>
          </View>
        </Pressable>
      </View>

      <SideMenu isVisible={menuOpen} onClose={() => setMenuOpen(false)} onLogout={handleLogout} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View style={styles.logoTitleContainer}>
              <View style={styles.logoIconContainer}>
                 <Ionicons name="home" size={20} color="#4F46E5" />
                 <View style={styles.logoBadge} />
              </View>
              <Text style={styles.headerTitle}>Parent Portal</Text>
            </View>
            <View style={styles.headerIcons}>
              <Pressable style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={24} color="#6B7280" />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <Ionicons name="settings-outline" size={24} color="#6B7280" />
              </Pressable>
            </View>
          </View>
          
          <View style={styles.headerSubtitleContainer}>
            <Text style={styles.headerSubtitle}>Financial Overview</Text>
            <Text style={styles.headerSubtitleLight}>& Payment Management</Text>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryCardsContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
               <Ionicons name="people" size={24} color="#6B7280" />
            </View>
            <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Total Learners</Text>
                <Text style={styles.summaryValue}>1</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="wallet" size={24} color="#3B82F6" />
            </View>
            <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Total Monthly Fees</Text>
                <Text style={styles.summaryValue}>R 2,700</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
             <View style={styles.summaryIconContainer}>
               <Ionicons name="alert-circle" size={24} color="#F97316" />
             </View>
            <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Outstanding Amount</Text>
                <View style={styles.outstandingBadge}>
                    <Text style={styles.outstandingValue}>R 2,700</Text>
                </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Learner Overview</Text>

        {/* Learner Card */}
        <View style={styles.learnerCard}>
           <View style={styles.learnerHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MR</Text>
              </View>
              <View style={styles.learnerInfo}>
                 <Text style={styles.learnerName}>Mikhenso Rikhotso</Text>
                 <Text style={styles.learnerDetails}>Grade 12 • ID: 2020155260088</Text>
                 
                 <View style={styles.statusRow}>
                   <View style={[styles.statusBadge, { backgroundColor: palette.success }]}>
                      <Ionicons name="checkmark-circle" size={12} color="white" />
                      <Text style={styles.statusTextWhite}>Facility Linked</Text>
                   </View>
                   <View style={[styles.statusBadge, { backgroundColor: palette.danger }]}>
                      <Ionicons name="alert-circle" size={12} color="white" />
                      <Text style={styles.statusTextWhite}>Overdue</Text>
                   </View>
                 </View>
              </View>
           </View>

           <View style={styles.divider} />

           <View style={styles.financialRows}>
              <View style={styles.financialRow}>
                 <Text style={styles.financialLabel}>Monthly Fee</Text>
                 <Text style={styles.financialValue}>R 2,700</Text>
              </View>
              <View style={styles.dividerLight} />
              <View style={styles.financialRow}>
                 <Text style={styles.financialLabel}>Paid</Text>
                 <Text style={[styles.financialValue, { color: palette.success }]}>R 0</Text>
              </View>
              <View style={styles.dividerLight} />
              <View style={styles.financialRow}>
                 <Text style={styles.financialLabel}>Outstanding</Text>
                 <Text style={[styles.financialValue, { color: palette.danger, fontWeight: '700' }]}>R 2,700</Text>
              </View>
              <View style={styles.dividerLight} />
              <View style={styles.financialRow}>
                 <Text style={styles.financialLabel}>Next Due Date</Text>
                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="calendar-outline" size={14} color={palette.textSecondary} style={{ marginRight: 6 }} />
                    <Text style={[styles.financialValueBold, { color: palette.text }]}>30/12/2025</Text>
                 </View>
              </View>
           </View>

           <View style={styles.actionRow}>
              <Pressable style={styles.viewDetailsBtn}>
                 <Text style={styles.viewDetailsText}>View Details</Text>
              </Pressable>
              <Pressable style={styles.externalLinkBtn}>
                 <Ionicons name="open-outline" size={20} color="#6B7280" />
              </Pressable>
           </View>
        </View>

        <Text style={styles.sectionTitle}>Fee Breakdown</Text>
        <Text style={styles.sectionSubtitle}>School Fees Structure</Text>

        {/* Fee Breakdown Card */}
        <View style={styles.breakdownCard}>
           <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Annual Fee</Text>
              <Text style={[styles.breakdownValue, { color: palette.primary, fontWeight: '800', fontSize: 16 }]}>R 32,400</Text>
           </View>
           <View style={styles.divider} />
           <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Term Fee</Text>
              <Text style={[styles.breakdownValue, { color: palette.text }]}>R 8,100</Text>
           </View>
           <View style={styles.divider} />
           <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Registration Fee</Text>
              <Text style={[styles.breakdownValue, { color: palette.textSecondary }]}>R 1,500</Text>
           </View>
           <View style={styles.divider} />
           <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Re-registration Fee</Text>
              <Text style={[styles.breakdownValue, { color: palette.textSecondary }]}>R 500</Text>
           </View>
           <View style={styles.divider} />
           <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Sport Fee</Text>
              <Text style={[styles.breakdownValue, { color: palette.textSecondary }]}>R 850</Text>
           </View>
        </View>

        {/* Notices Section (Removed) */}
        {/* <View style={styles.noticesContainer}>
            <NoticesScreen />
        </View> */}

        <View style={{ height: 40 }} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  // Top Navbar Styles
  topNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: palette.background,
    zIndex: 10,
  },
  navLeft: {
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
    color: palette.textSecondary,
    fontWeight: '500',
  },
  welcomeName: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  profileInitials: {
    color: palette.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  // Existing styles continue
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    backgroundColor: palette.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  logoBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#F59E0B',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  }, 
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  headerSubtitleContainer: {
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: palette.textSecondary,
    fontWeight: '500',
  },
  headerSubtitleLight: {
    fontSize: 16,
    color: palette.textSecondary,
    fontWeight: '400',
  },
  // Summary Cards
  summaryCardsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap', // Allow wrapping if needed on small screens
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryIconContainer: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  summaryTextContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  summaryLabel: {
    fontSize: 12,
    color: palette.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
  },
  outstandingBadge: {
    backgroundColor: palette.warning,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 2,
  },
  outstandingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  // Section Titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: palette.textSecondary,
    marginTop: -8,
    marginBottom: 12,
  },
  // Learner Card
  learnerCard: {
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  learnerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#78869b', // Slate-500 roughly
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  learnerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  learnerName: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  learnerDetails: {
    fontSize: 14,
    color: palette.textSecondary,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusTextWhite: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginVertical: 12,
  },
  dividerLight: {
    height: 1,
    backgroundColor: '#F3F4F6', // Very light gray
    marginVertical: 8,
  },
  financialRows: {
    marginBottom: 16,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  financialLabel: {
    fontSize: 14,
    color: palette.textSecondary,
  },
  financialValue: {
    fontSize: 14,
    color: palette.text,
    fontWeight: '500',
  },
  financialValueBold: {
    fontSize: 14,
    color: palette.text,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  viewDetailsBtn: {
    flex: 1,
    backgroundColor: palette.primary,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  externalLinkBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  // Fee Breakdown
  breakdownCard: {
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24, // Spacing before notices
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  breakdownLabel: {
    fontSize: 15,
    color: palette.textSecondary,
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.text,
  },
  noticesContainer: {
    marginTop: 0,
  }
});

