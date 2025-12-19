import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';

const palette = {
  primary: '#1f64f2',
  success: '#10b981',
  text: '#1f2937',
  muted: '#6b7280',
};

interface SuccessModalProps {
  visible: boolean;
  title: string;
  count: number;
  onContinue: () => void;
}

export default function SuccessModal({ visible, title, count, onContinue }: SuccessModalProps) {
  const { width } = useWindowDimensions();
  const isSmall = width < 480;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onContinue}>
      <View style={styles.overlay}>
        <View style={[styles.modalContent, isSmall && styles.modalContentSmall]}>
          <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          
          <Text style={[styles.title, isSmall && styles.titleSmall]}>{title}</Text>
          
          <View style={styles.countBox}>
            <Text style={styles.countText}>✓ {count} student{count !== 1 ? 's' : ''} updated</Text>
          </View>
          
          <Pressable style={[styles.continueBtn, isSmall && styles.continueBtnSmall]} onPress={onContinue}>
            <Text style={styles.continueBtnText}>Continue →</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalContentSmall: {
    padding: 24,
    maxWidth: '90%',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 18,
    marginBottom: 16,
  },
  countBox: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 32,
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.success,
  },
  continueBtn: {
    backgroundColor: palette.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 160,
  },
  continueBtnSmall: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minWidth: 140,
  },
  continueBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
