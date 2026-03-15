import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/index.js';
import { calculatePenalty, formatCurrency, formatDate, getDaysOverdue, isOverdue } from '../utils/helpers.js';

export const ReturnModal = ({ visible, record, onConfirm, onCancel }) => {
  if (!record) return null;

  const penalty = calculatePenalty(record.dueDate);
  const overdue = isOverdue(record.dueDate);
  const daysOverdue = getDaysOverdue(record.dueDate);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={[styles.iconWrap, overdue ? styles.iconWrapRed : styles.iconWrapGreen]}>
            <Text style={styles.iconText}>{overdue ? '⚠️' : '✓'}</Text>
          </View>
          <Text style={styles.title}>Return CD</Text>
          <Text style={styles.subtitle}>{record.cdTitle}</Text>
          <Text style={styles.borrower}>by {record.borrowerName}</Text>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Borrowed on</Text>
              <Text style={styles.detailValue}>{formatDate(record.borrowDate)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Due date</Text>
              <Text style={[styles.detailValue, overdue && styles.detailValueDanger]}>{formatDate(record.dueDate)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Return date</Text>
              <Text style={styles.detailValue}>{formatDate(new Date().toISOString())}</Text>
            </View>
          </View>

          {overdue ? (
            <View style={styles.penaltyBox}>
              <Text style={styles.penaltyTitle}>⚠ OVERDUE PENALTY</Text>
              <Text style={styles.penaltyDays}>{daysOverdue} days overdue</Text>
              <Text style={styles.penaltyCalc}>Accumulated penalty</Text>
              <Text style={styles.penaltyTotal}>{formatCurrency(penalty)}</Text>
            </View>
          ) : (
            <View style={styles.noPenaltyBox}>
              <Text style={styles.noPenaltyText}>✓ Returned on time — No penalty!</Text>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>{overdue ? 'CONFIRM & PAY' : 'CONFIRM RETURN'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  container: { backgroundColor: COLORS.secondary, borderRadius: 24, padding: 28, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  iconWrap: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  iconWrapRed: { backgroundColor: `${COLORS.accent}25`, borderWidth: 2, borderColor: COLORS.accent },
  iconWrapGreen: { backgroundColor: 'rgba(72,187,120,0.2)', borderWidth: 2, borderColor: COLORS.success },
  iconText: { fontSize: 28 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  subtitle: { fontSize: 15, fontWeight: '700', color: COLORS.textMuted, marginBottom: 2 },
  borrower: { fontSize: 12, color: COLORS.textMuted, marginBottom: 20 },
  details: { width: '100%', backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  detailLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  detailValue: { fontSize: 12, color: COLORS.text, fontWeight: '700' },
  detailValueDanger: { color: COLORS.accent },
  penaltyBox: { width: '100%', backgroundColor: `${COLORS.accent}20`, borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: `${COLORS.accent}50`, marginBottom: 20 },
  penaltyTitle: { fontSize: 11, fontWeight: '800', color: COLORS.accent, letterSpacing: 1, marginBottom: 6 },
  penaltyDays: { fontSize: 13, color: COLORS.textMuted, marginBottom: 4 },
  penaltyCalc: { fontSize: 12, color: COLORS.textMuted },
  penaltyTotal: { fontSize: 32, fontWeight: '900', color: COLORS.gold, marginTop: 6 },
  noPenaltyBox: { width: '100%', backgroundColor: 'rgba(72,187,120,0.15)', borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(72,187,120,0.4)', marginBottom: 20 },
  noPenaltyText: { fontSize: 13, fontWeight: '700', color: COLORS.success },
  actions: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelBtn: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  cancelText: { color: COLORS.textMuted, fontWeight: '800', fontSize: 11, letterSpacing: 1 },
  confirmBtn: { flex: 2, backgroundColor: COLORS.accent, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  confirmText: { color: COLORS.text, fontWeight: '800', fontSize: 11, letterSpacing: 0.5 },
});