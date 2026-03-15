import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AddCDModal } from '../../components/AddCDModal';
import { BorrowCard } from '../../components/BorrowCard';
import { BorrowModal } from '../../components/BorrowModal';
import { CDCard } from '../../components/CDCard';
import { ReturnModal } from '../../components/ReturnModal';
import { StatsHeader } from '../../components/StatsHeader';
import { COLORS } from '../../constants/index.js';
import { useLibraryContext } from '../../context/LibraryContext';

type CD = {
  id: string;
  title: string;
  artist: string;
  totalCopies: number;
  availableCopies: number;
  genre?: string;
  year?: number;
  coverColor: string;
};

type BorrowRecord = {
  id: string;
  cdId: string;
  cdTitle: string;
  cdArtist: string;
  borrowerName: string;
  borrowerContact?: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  penaltyFee: number;
  isPaid: boolean;
  isReturned: boolean;
};

type Section = {
  title: string;
  data: CD[] | BorrowRecord[];
  type: string;
};

export default function HomeScreen() {
  const { data, loading, activeBorrows, borrowCD, returnCD, addCD, refreshPenalties, resetData } = useLibraryContext();

  const [borrowTarget, setBorrowTarget] = useState<CD | null>(null);
  const [returnTarget, setReturnTarget] = useState<BorrowRecord | null>(null);
  const [showAddCD, setShowAddCD] = useState<boolean>(false);
  const isResetting = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isResetting.current) {
        refreshPenalties();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [refreshPenalties]);

  const handleReset = async () => {
  isResetting.current = true;
  await resetData();
  isResetting.current = false;
  Alert.alert('Done!', 'Reset complete.');
};


  const handleBorrow = async (borrowerName: string, contact: string) => {
    if (!borrowTarget) return;
    const result = await borrowCD(borrowTarget, borrowerName, contact);
    setBorrowTarget(null);
    Alert.alert(result.success ? 'Success!' : 'Error', result.message);
  };

  const handleReturn = async () => {
    if (!returnTarget) return;
    const result = await returnCD(returnTarget);
    setReturnTarget(null);
    Alert.alert('CD Returned', result.message);
  };

  const handleAddCD = async (title: string, artist: string, copies: number, genre: string, year: number) => {
    await addCD({ title, artist, totalCopies: copies, genre, year });
    setShowAddCD(false);
    Alert.alert('Success!', `"${title}" has been added to the library.`);
  };

  const handleBorrowPress = (cd: CD) => {
    if (cd.availableCopies <= 0) {
      Alert.alert('Not Available', 'CD not available.');
      return;
    }
    setBorrowTarget(cd);
  };

  const sections: Section[] = [
    {
      title: `Available CDs (${data.cds.length})`,
      data: data.cds,
      type: 'cd',
    },
    {
      title: `Borrowed CDs (${activeBorrows.length})`,
      data: activeBorrows,
      type: 'borrow',
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loadingDisc}>
          <View style={styles.loadingDiscInner} />
        </View>
        <Text style={styles.loadingText}>Loading Library...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList<CD | BorrowRecord, Section>
        sections={sections}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <StatsHeader
            totalIncome={data.totalIncome}
            totalBorrowedAllTime={data.totalBorrowedAllTime}
            activeBorrows={activeBorrows.length}
            totalCDs={data.cds.length}
          />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.type === 'cd' && (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setShowAddCD(true)}
              >
                <Text style={styles.addBtnText}>+ ADD</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        renderItem={({ item, section }) => {
          if (section.type === 'cd') {
            return <CDCard cd={item as CD} onBorrow={handleBorrowPress} />;
          }
          return <BorrowCard record={item as BorrowRecord} onReturn={setReturnTarget} />;
        }}
        renderSectionFooter={({ section }) => {
          if (section.type === 'cd' && data.cds.length === 0) {
            return (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>💿</Text>
                <Text style={styles.emptyText}>No CDs in library</Text>
                <TouchableOpacity
                  style={styles.emptyAddBtn}
                  onPress={() => setShowAddCD(true)}
                >
                  <Text style={styles.emptyAddText}>Add your first CD</Text>
                </TouchableOpacity>
              </View>
            );
          }
          if (section.type === 'borrow' && activeBorrows.length === 0) {
            return (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>📋</Text>
                <Text style={styles.emptyText}>No active borrows</Text>
                <Text style={styles.emptySubText}>Tap on an available CD to borrow it</Text>
              </View>
            );
          }
          return null;
        }}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* RESET BUTTON */}
      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetBtnText}>🗑 RESET ALL DATA</Text>
      </TouchableOpacity>

      <BorrowModal
        visible={!!borrowTarget}
        cd={borrowTarget}
        onConfirm={handleBorrow}
        onCancel={() => setBorrowTarget(null)}
      />

      <ReturnModal
        visible={!!returnTarget}
        record={returnTarget}
        onConfirm={handleReturn}
        onCancel={() => setReturnTarget(null)}
      />

      <AddCDModal
        visible={showAddCD}
        onConfirm={handleAddCD}
        onCancel={() => setShowAddCD(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  loadingScreen: { flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  loadingDisc: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  loadingDiscInner: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.primary },
  loadingText: { color: COLORS.textMuted, fontSize: 14, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase' },
  listContent: { paddingBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 24, paddingBottom: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1.5, textTransform: 'uppercase' },
  addBtn: { backgroundColor: COLORS.accent, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  addBtnText: { color: COLORS.text, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  emptyState: { alignItems: 'center', padding: 32, marginHorizontal: 16, backgroundColor: COLORS.cardBg, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, borderStyle: 'dashed' },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyText: { color: COLORS.textMuted, fontSize: 14, fontWeight: '600', marginBottom: 6 },
  emptySubText: { color: COLORS.textMuted, fontSize: 12, opacity: 0.7 },
  emptyAddBtn: { marginTop: 12, backgroundColor: COLORS.accent, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  emptyAddText: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  resetBtn: { backgroundColor: '#c0392b', margin: 16, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  resetBtnText: { color: 'white', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },
});