import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BORROW_DURATION_DAYS, COLORS } from '../constants/index.js';
import { formatDate } from '../utils/helpers.js';

export const BorrowModal = ({ visible, cd, onConfirm, onCancel }: {
  visible: boolean;
  cd: any;
  onConfirm: (borrowerName: string, contact: string) => void;
  onCancel: () => void;
}) => {
  const [borrowerName, setBorrowerName] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const dueDate = new Date(Date.now() + BORROW_DURATION_DAYS * 24 * 60 * 60 * 1000);

  const handleConfirm = () => {
    if (!borrowerName.trim()) { setError('Borrower name is required.'); return; }
    setError('');
    onConfirm(borrowerName, contact);
    setBorrowerName(''); setContact('');
  };

  const handleCancel = () => {
    setBorrowerName(''); setContact(''); setError(''); onCancel();
  };

  if (!cd) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleCancel}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={[styles.discMini, { backgroundColor: cd.coverColor }]}>
              <View style={styles.discMiniCenter} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.modalTitle}>Borrow CD</Text>
              <Text style={styles.cdName} numberOfLines={1}>{cd.title}</Text>
              <Text style={styles.cdArtist}>{cd.artist}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Borrow Date</Text>
              <Text style={styles.infoValue}>{formatDate(new Date().toISOString())}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <Text style={[styles.infoValue, styles.infoValueAccent]}>{formatDate(dueDate.toISOString())}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{BORROW_DURATION_DAYS} days</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Penalty Rate</Text>
              <Text style={[styles.infoValue, { color: COLORS.accent }]}>₱5.00/day overdue</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Borrow Fee</Text>
              <Text style={[styles.infoValue, { color: COLORS.gold }]}>₱25.00 (pay upon borrowing)</Text>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.inputLabel}>Borrower Name *</Text>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="Enter full name"
              placeholderTextColor={COLORS.textMuted}
              value={borrowerName}
              onChangeText={text => { setBorrowerName(text); setError(''); }}
              autoCapitalize="words"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.inputLabel}>Contact (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number or email"
              placeholderTextColor={COLORS.textMuted}
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmBtnText}>CONFIRM BORROW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  container: { backgroundColor: COLORS.secondary, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  discMini: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  discMiniCenter: { width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(0,0,0,0.4)' },
  headerText: { flex: 1 },
  modalTitle: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  cdName: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  cdArtist: { fontSize: 13, color: COLORS.textMuted },
  infoBox: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginBottom: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  infoDivider: { height: 1, backgroundColor: COLORS.border },
  infoLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  infoValue: { fontSize: 12, color: COLORS.text, fontWeight: '700' },
  infoValueAccent: { color: COLORS.success },
  form: { marginBottom: 20 },
  inputLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8, marginTop: 8 },
  input: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, color: COLORS.text, fontSize: 14, borderWidth: 1, borderColor: COLORS.border },
  inputError: { borderColor: COLORS.accent },
  errorText: { color: COLORS.accent, fontSize: 11, marginTop: 4 },
  actions: { flexDirection: 'row', gap: 12 },
  cancelBtn: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  cancelBtnText: { color: COLORS.textMuted, fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  confirmBtn: { flex: 2, backgroundColor: COLORS.accent, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  confirmBtnText: { color: COLORS.text, fontSize: 12, fontWeight: '800', letterSpacing: 1 },
});