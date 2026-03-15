import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants/index.js';
import { formatDate, formatCurrency, isOverdue, getDaysOverdue, getDaysUntilDue } from '../utils/helpers.js';

export const BorrowCard = ({ record, onReturn }) => {
  const overdue = isOverdue(record.dueDate);
  const daysOverdue = getDaysOverdue(record.dueDate);
  const daysUntil = getDaysUntilDue(record.dueDate);
  const penalty = record.penaltyFee;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onReturn(record)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, overdue && styles.cardOverdue]}
      >
        <View style={[styles.strip, { backgroundColor: overdue ? COLORS.accent : COLORS.success }]} />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.titleSection}>
              <Text style={styles.cdTitle} numberOfLines={1}>{record.cdTitle}</Text>
              <Text style={styles.artist}>{record.cdArtist}</Text>
            </View>
            {overdue ? (
              <View style={styles.overdueChip}>
                <Text style={styles.overdueChipText}>OVERDUE</Text>
                <Text style={styles.daysText}>{daysOverdue}d</Text>
              </View>
            ) : (
              <View style={styles.safeChip}>
                <Text style={styles.safeChipText}>DUE IN</Text>
                <Text style={styles.daysSafeText}>{daysUntil}d</Text>
              </View>
            )}
          </View>

          <View style={styles.borrowerRow}>
            <View style={styles.borrowerIcon}>
              <Text style={styles.borrowerInitial}>{record.borrowerName.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.borrowerName}>{record.borrowerName}</Text>
              {record.borrowerContact ? <Text style={styles.contact}>{record.borrowerContact}</Text> : null}
            </View>
          </View>

          <View style={styles.dateRow}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Borrowed</Text>
              <Text style={styles.dateValue}>{formatDate(record.borrowDate)}</Text>
            </View>
            <View style={styles.dateDivider} />
            <View style={styles.dateItem}>
              <Text style={[styles.dateLabel, overdue && styles.dateLabelDanger]}>Due Date</Text>
              <Text style={[styles.dateValue, overdue && styles.dateValueDanger]}>{formatDate(record.dueDate)}</Text>
            </View>
            {penalty > 0 && (
              <>
                <View style={styles.dateDivider} />
                <View style={styles.dateItem}>
                  <Text style={[styles.dateLabel, styles.penaltyLabel]}>Penalty</Text>
                  <Text style={styles.penaltyValue}>{formatCurrency(penalty)}</Text>
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={[styles.returnBtn, overdue && styles.returnBtnOverdue]}
            onPress={() => onReturn(record)}
          >
            <Text style={styles.returnBtnText}>
              {overdue ? `RETURN (${formatCurrency(penalty)} penalty)` : 'MARK AS RETURNED'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 16, marginVertical: 6 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 16, flexDirection: 'row', overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, elevation: 6 },
  cardOverdue: { borderColor: `${COLORS.accent}60` },
  strip: { width: 5, minHeight: '100%' },
  content: { flex: 1, padding: 14 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  titleSection: { flex: 1, marginRight: 10 },
  cdTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  artist: { fontSize: 12, color: COLORS.textMuted },
  overdueChip: { backgroundColor: `${COLORS.accent}30`, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignItems: 'center', borderWidth: 1, borderColor: `${COLORS.accent}60` },
  overdueChipText: { fontSize: 8, fontWeight: '800', color: COLORS.accent, letterSpacing: 0.5 },
  daysText: { fontSize: 16, fontWeight: '800', color: COLORS.accent },
  safeChip: { backgroundColor: 'rgba(72,187,120,0.2)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(72,187,120,0.4)' },
  safeChipText: { fontSize: 8, fontWeight: '800', color: COLORS.success, letterSpacing: 0.5 },
  daysSafeText: { fontSize: 16, fontWeight: '800', color: COLORS.success },
  borrowerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  borrowerIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  borrowerInitial: { fontSize: 14, fontWeight: '800', color: COLORS.accent },
  borrowerName: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  contact: { fontSize: 11, color: COLORS.textMuted },
  dateRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 10, padding: 10, marginBottom: 12 },
  dateItem: { flex: 1, alignItems: 'center' },
  dateDivider: { width: 1, height: 30, backgroundColor: COLORS.border, marginHorizontal: 8 },
  dateLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: '600', letterSpacing: 0.5, marginBottom: 2, textTransform: 'uppercase' },
  dateLabelDanger: { color: COLORS.accent },
  dateValue: { fontSize: 11, fontWeight: '700', color: COLORS.text },
  dateValueDanger: { color: COLORS.accent },
  penaltyLabel: { color: COLORS.gold },
  penaltyValue: { fontSize: 13, fontWeight: '800', color: COLORS.gold },
  returnBtn: { backgroundColor: COLORS.surfaceLight, borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.success },
  returnBtnOverdue: { borderColor: COLORS.accent, backgroundColor: `${COLORS.accent}20` },
  returnBtnText: { color: COLORS.text, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
});