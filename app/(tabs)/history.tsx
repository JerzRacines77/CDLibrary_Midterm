import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLibraryContext } from '../../context/LibraryContext';
import { COLORS } from '../../constants/index.js';
import { formatDate, formatCurrency } from '../../utils/helpers.js';

const HistoryCard = ({ record }) => {
  const hadPenalty = record.penaltyFee > 0;

  return (
    <View style={styles.card}>
      <View style={[styles.strip, { backgroundColor: hadPenalty ? COLORS.gold : COLORS.success }]} />
      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <View style={styles.info}>
            <Text style={styles.cdTitle} numberOfLines={1}>{record.cdTitle}</Text>
            <Text style={styles.artist}>{record.cdArtist}</Text>
          </View>
          {hadPenalty ? (
            <View style={styles.penaltyBadge}>
              <Text style={styles.penaltyBadgeText}>{formatCurrency(record.penaltyFee)}</Text>
            </View>
          ) : (
            <View style={styles.noPenaltyBadge}>
              <Text style={styles.noPenaltyBadgeText}>On Time</Text>
            </View>
          )}
        </View>

        <View style={styles.borrowerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{record.borrowerName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.borrowerName}>{record.borrowerName}</Text>
        </View>

        <View style={styles.dateRow}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Borrowed</Text>
            <Text style={styles.dateValue}>{formatDate(record.borrowDate)}</Text>
          </View>
          <View style={styles.dateDivider} />
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Returned</Text>
            <Text style={styles.dateValue}>{record.returnDate ? formatDate(record.returnDate) : '-'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function HistoryScreen() {
  const { data, returnedRecords } = useLibraryContext();
  const overdueCount = returnedRecords.filter(r => r.penaltyFee > 0).length;
  const onTimeCount = returnedRecords.filter(r => r.penaltyFee === 0).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BORROW HISTORY</Text>
        <Text style={styles.headerSub}>All returned CDs</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{returnedRecords.length}</Text>
            <Text style={styles.summaryLabel}>Total Returned</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.gold }]}>
              {formatCurrency(data.totalIncome)}
            </Text>
            <Text style={styles.summaryLabel}>Total Penalties</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.success }]}>{onTimeCount}</Text>
            <Text style={styles.summaryLabel}>On Time</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.accent }]}>{overdueCount}</Text>
            <Text style={styles.summaryLabel}>Late Returns</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={returnedRecords.slice().reverse()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HistoryCard record={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📜</Text>
            <Text style={styles.emptyText}>No history yet</Text>
            <Text style={styles.emptySubText}>Returned CDs will appear here</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  header: { backgroundColor: COLORS.secondary, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 22, fontWeight: '900', color: COLORS.text, letterSpacing: 4 },
  headerSub: { fontSize: 11, color: COLORS.textMuted, letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' },
  summaryRow: { flexDirection: 'row', gap: 8 },
  summaryCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  summaryValue: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 2 },
  summaryLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: '600', textAlign: 'center' },
  listContent: { padding: 16, paddingBottom: 32 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 14, flexDirection: 'row', overflow: 'hidden', marginBottom: 10, borderWidth: 1, borderColor: COLORS.border },
  strip: { width: 5 },
  cardContent: { flex: 1, padding: 14 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  info: { flex: 1, marginRight: 10 },
  cdTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  artist: { fontSize: 12, color: COLORS.textMuted },
  penaltyBadge: { backgroundColor: `${COLORS.gold}25`, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: `${COLORS.gold}50` },
  penaltyBadgeText: { color: COLORS.gold, fontWeight: '800', fontSize: 12 },
  noPenaltyBadge: { backgroundColor: 'rgba(72,187,120,0.15)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: 'rgba(72,187,120,0.4)' },
  noPenaltyBadgeText: { color: COLORS.success, fontWeight: '800', fontSize: 12 },
  borrowerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  avatarText: { fontSize: 13, fontWeight: '800', color: COLORS.accent },
  borrowerName: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  dateRow: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 10, padding: 10 },
  dateItem: { flex: 1, alignItems: 'center' },
  dateDivider: { width: 1, backgroundColor: COLORS.border, marginHorizontal: 10 },
  dateLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  dateValue: { fontSize: 11, fontWeight: '700', color: COLORS.text },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 16, fontWeight: '700', color: COLORS.textMuted, marginBottom: 6 },
  emptySubText: { fontSize: 12, color: COLORS.textMuted, opacity: 0.6 },
});