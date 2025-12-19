import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const palette = {
  primary: '#0ea5e9',
  primaryLight: '#cffafe',
  primaryDark: '#0369a1',
  success: '#10b981',
  successLight: '#d1fae5',
  muted: '#64748b',
  text: '#0f172a',
  textSecondary: '#475569',
  border: '#e2e8f0',
  cardLight: '#f1f5f9',
};

interface StudentCardProps {
  initials: string;
  name: string;
  grade: string;
  studentId: string;
  date?: string;
  selected?: boolean;
  onSelect?: () => void;
  showSelect?: boolean;
}

export default function StudentCard({
  initials,
  name,
  grade,
  studentId,
  date,
  selected = false,
  onSelect,
  showSelect = true,
}: StudentCardProps) {
  return (
    <Pressable
      style={[styles.card, selected && styles.cardSelected]}
      onPress={showSelect ? onSelect : undefined}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.grade}>{grade}</Text>
          <Text style={styles.id}>ID: {studentId}</Text>
          {date && (
            <View style={styles.dateRow}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          )}
        </View>
        {showSelect && (
          <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
            {selected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.cardLight,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: palette.border,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardSelected: {
    borderColor: palette.primary,
    backgroundColor: palette.primaryLight,
    borderWidth: 2.5,
    shadowColor: palette.primary,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: palette.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: palette.text,
    marginBottom: 6,
  },
  grade: {
    fontSize: 14,
    color: palette.textSecondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  id: {
    fontSize: 12,
    color: palette.muted,
    marginBottom: 6,
    fontWeight: '500',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  dateIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  date: {
    fontSize: 12,
    color: palette.textSecondary,
    fontWeight: '500',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: palette.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    flexShrink: 0,
  },
  checkboxSelected: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
    shadowColor: palette.primary,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});

