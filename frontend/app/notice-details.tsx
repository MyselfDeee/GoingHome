import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, SafeAreaView, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Notice {
  id: string;
  title: string;
  preview: string;
  date: string;
  isRead: boolean;
  fullMessage: string;
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

export default function NoticeDetails() {
  const router = useRouter();
  const { notice: noticeString } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const [notice, setNotice] = React.useState<Notice | null>(null);

  React.useEffect(() => {
    if (noticeString && typeof noticeString === 'string') {
      try {
        const parsedNotice = JSON.parse(noticeString);
        setNotice(parsedNotice);
      } catch (error) {
        console.error('Error parsing notice:', error);
      }
    }
  }, [noticeString]);

  if (!notice) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Notice not found</Text>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>← Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isSmall = width < 480;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with back button */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.container, isSmall && styles.containerSmall]}
        showsVerticalScrollIndicator={false}
      >
        {/* Card with notice details */}
        <View style={styles.card}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{notice.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.date}>📅 {notice.date}</Text>
              {!notice.isRead && (
                <View style={styles.newIndicator}>
                  <Text style={styles.newText}>New</Text>
                </View>
              )}
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Message Content */}
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>{notice.fullMessage}</Text>
          </View>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <Pressable
              style={styles.actionBtn}
              onPress={() => {
                // Archive notice logic
                console.log('Archived:', notice.id);
              }}
            >
              <Text style={styles.actionIcon}>📌</Text>
              <Text style={styles.actionText}>Archive</Text>
            </Pressable>

            <Pressable
              style={styles.actionBtn}
              onPress={() => {
                // Share notice logic
                console.log('Shared:', notice.id);
              }}
            >
              <Text style={styles.actionIcon}>🔗</Text>
              <Text style={styles.actionText}>Share</Text>
            </Pressable>

            <Pressable
              style={[styles.actionBtn, styles.printBtn]}
              onPress={() => {
                // Print notice logic
                console.log('Printed:', notice.id);
              }}
            >
              <Text style={styles.actionIcon}>🖨️</Text>
              <Text style={[styles.actionText, styles.printText]}>Print</Text>
            </Pressable>
          </View>
        </View>

        {/* Related Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>ℹ️ Need Help?</Text>
          <Text style={styles.infoBoxText}>
            If you have questions about this announcement, please contact the school office or visit the parent portal.
          </Text>
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
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
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
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: palette.text,
    fontWeight: '600',
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  titleSection: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: palette.text,
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: palette.muted,
    fontWeight: '500',
  },
  newIndicator: {
    backgroundColor: palette.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
  },
  contentSection: {
    padding: 16,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.text,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: '#f9fafb',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f0f1f3',
    gap: 6,
  },
  printBtn: {
    backgroundColor: '#fff3cd',
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
    color: palette.text,
  },
  printText: {
    color: '#856404',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: palette.primary,
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  infoBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.primary,
  },
  infoBoxText: {
    fontSize: 12,
    color: '#1565c0',
    lineHeight: 18,
  },
});
