import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

interface Notice {
  id: string;
  title: string;
  preview: string;
  date: string;
  isRead: boolean;
  fullMessage: string;
}

interface NoticesScreenProps {
  notices?: Notice[];
  onNoticeClick?: (notice: Notice) => void;
}

const palette = {
  background: '#f5f7fb',
  card: '#ffffff',
  border: '#e5e7eb',
  primary: '#1f64f2',
  success: '#1db954',
  danger: '#f87171',
  muted: '#6b7280',
  text: '#1f2937',
};

const sampleNotices: Notice[] = [
  {
    id: '1',
    title: 'School Holiday Announcement',
    preview: 'The school will be closed from 16-24 December for the holiday break.',
    date: '15/12/2025',
    isRead: true,
    fullMessage: 'Dear Parents and Guardians,\n\nWe are pleased to inform you that the school will be closed from 16th December 2025 to 24th December 2025 for the holiday break. Regular classes will resume on 5th January 2026.\n\nPlease ensure your child has completed all homework before the break.\n\nBest regards,\nSchool Management',
  },
  {
    id: '2',
    title: 'Fee Payment Reminder',
    preview: 'Please ensure all outstanding fees are paid by 30th December 2025.',
    date: '14/12/2025',
    isRead: false,
    fullMessage: 'Dear Parents and Guardians,\n\nThis is a friendly reminder to ensure that all outstanding school fees are settled by 30th December 2025.\n\nPayment methods:\n- Online Portal\n- Bank Transfer\n- Direct Deposit\n\nFor any queries, please contact the Finance Department.\n\nThank you,\nFinance Department',
  },
  {
    id: '3',
    title: 'Sports Day Results',
    preview: 'Congratulations to all participants in our annual sports day held on 14th December.',
    date: '14/12/2025',
    isRead: true,
    fullMessage: 'We are delighted to announce the results of our Annual Sports Day held on 14th December 2025. All participants showed excellent sportsmanship and dedication.\n\nTop performers have been awarded certificates and medals. Winners will be announced at the upcoming assembly.\n\nCongratulations to all!',
  },
  {
    id: '4',
    title: 'Parent-Teacher Conference',
    preview: 'Parent-Teacher Conference scheduled for 8th January 2026.',
    date: '10/12/2025',
    isRead: false,
    fullMessage: 'Dear Parents and Guardians,\n\nWe are pleased to invite you to our Parent-Teacher Conference on 8th January 2026 from 14:00 to 17:00.\n\nThis is an opportunity to discuss your child\'s academic progress and address any concerns.\n\nSlots are available for 15-minute meetings. Please register through the school portal.\n\nWe look forward to seeing you!',
  },
];

export default function NoticesScreen({ notices = sampleNotices, onNoticeClick }: NoticesScreenProps) {
  const router = useRouter();
  const [noticesList, setNoticesList] = React.useState<Notice[]>(notices);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Simulate fetching notices from API
    const fetchNotices = async () => {
      setLoading(true);
      try {
        // In production, replace this with actual API call
        // const response = await fetch('/parent/notices');
        // const data = await response.json();
        // setNoticesList(data);
        setNoticesList(notices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [notices]);

  const handleNoticeClick = (notice: Notice) => {
    if (onNoticeClick) {
      onNoticeClick(notice);
    } else {
      // Navigate to notice details
      router.push({
        pathname: '/notice-details',
        params: { noticeId: notice.id, notice: JSON.stringify(notice) },
      } as never);
    }

    // Mark as read
    setNoticesList(
      noticesList.map((n) => (n.id === notice.id ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = noticesList.filter((n) => !n.isRead).length;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <Text style={styles.sectionSubtitle}>Stay updated with school news</Text>
        </View>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {/* Notices List */}
      {noticesList.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📭</Text>
          <Text style={styles.emptyStateTitle}>No Announcements</Text>
          <Text style={styles.emptyStateSubtitle}>
            You're all caught up! No new announcements.
          </Text>
        </View>
      ) : (
        <View style={styles.noticesList}>
          {noticesList.map((notice) => (
            <Pressable
              key={notice.id}
              style={[
                styles.noticeCard,
                !notice.isRead && styles.noticeCardUnread,
              ]}
              onPress={() => handleNoticeClick(notice)}
            >
              <View style={styles.noticeHeader}>
                <View style={styles.noticeHeaderLeft}>
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                  {!notice.isRead && <View style={styles.unreadIndicator} />}
                </View>
                <Text style={styles.noticeDate}>{notice.date}</Text>
              </View>

              <Text style={styles.noticePreview} numberOfLines={2}>
                {notice.preview}
              </Text>

              <View style={styles.noticeFooter}>
                <Text style={styles.readMoreLink}>Read more →</Text>
                {!notice.isRead && (
                  <Text style={styles.newBadge}>New</Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: palette.muted,
    marginTop: 2,
  },
  unreadBadge: {
    backgroundColor: palette.danger,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  noticesList: {
    gap: 10,
  },
  noticeCard: {
    backgroundColor: palette.card,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 8,
  },
  noticeCardUnread: {
    borderColor: palette.primary,
    borderWidth: 1.5,
    backgroundColor: '#f0f6ff',
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  noticeHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.text,
    flex: 1,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.primary,
    flexShrink: 0,
  },
  noticeDate: {
    fontSize: 11,
    color: palette.muted,
  },
  noticePreview: {
    fontSize: 12,
    color: palette.muted,
    lineHeight: 18,
  },
  noticeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  readMoreLink: {
    fontSize: 11,
    color: palette.primary,
    fontWeight: '600',
  },
  newBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: palette.danger,
    backgroundColor: '#ffe5e5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  emptyStateSubtitle: {
    fontSize: 12,
    color: palette.muted,
  },
});
