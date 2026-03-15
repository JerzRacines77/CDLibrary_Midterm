import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/index.js';
import { formatCurrency } from '../utils/helpers.js';

export const StatsHeader = ({ totalIncome, totalBorrowedAllTime, activeBorrows, totalCDs }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.discDecor}><View style={styles.discDecorInner} /></View>
        <Text style={styles.appTitle}>CD LIBRARY</Text>
        <View style={styles.discDecor}><View style={styles.discDecorInner} /></View>
      </View>
      <Text style={styles.appSubtitle}>Borrow & Return Manager</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatCurrency(totalIncome)}</Text>
          <Text style={styles.statLabel}>Total Income</Text>
        </View>
        <View style={[styles.statCard, styles.statCardAccent]}>
          <Text style={[styles.statValue, styles.statValueAccent]}>{totalBorrowedAllTime}</Text>
          <Text style={styles.statLabel}>All-time Borrows</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeBorrows}</Text>
          <Text style={styles.statLabel}>Active Borrows</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalCDs}</Text>
          <Text style={styles.statLabel}>CD Titles</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.primary, paddingTop: 16, paddingBottom: 20, paddingHorizontal: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  discDecor: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
  discDecorInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary },
  appTitle: { fontSize: 26, fontWeight: '900', color: COLORS.text, letterSpacing: 6 },
  appSubtitle: { textAlign: 'center', fontSize: 11, color: COLORS.textMuted, letterSpacing: 2, marginBottom: 20, textTransform: 'uppercase' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: COLORS.cardBg, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statCardAccent: { borderColor: `${COLORS.gold}50`, backgroundColor: COLORS.surface },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 2 },
  statValueAccent: { color: COLORS.gold },
  statLabel: { fontSize: 10, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' },
});