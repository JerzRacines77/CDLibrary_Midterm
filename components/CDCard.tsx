import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/index.js';

export const CDCard = ({ cd, onBorrow, onLongPress }: {
  cd: any;
  onBorrow: any;
  onLongPress?: any;
}) => {  const available = cd.availableCopies > 0;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => available && onBorrow(cd)}
        onLongPress={() => onLongPress?.(cd)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, !available && styles.cardUnavailable]}
      >
        <View style={[styles.disc, { backgroundColor: cd.coverColor }]}>
          <View style={styles.discInner}>
            <View style={styles.discCenter} />
          </View>
          <View style={styles.shine} />
        </View>

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{cd.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{cd.artist}</Text>
          {cd.genre ? (
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{cd.genre}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.availabilitySection}>
          <View style={[styles.availBadge, available ? styles.availBadgeGreen : styles.availBadgeRed]}>
            <Text style={styles.availCount}>{cd.availableCopies}</Text>
            <Text style={styles.availLabel}>/{cd.totalCopies}</Text>
          </View>
          <Text style={styles.availText}>copies</Text>
          {available ? (
            <View style={styles.borrowBtn}>
              <Text style={styles.borrowBtnText}>BORROW</Text>
            </View>
          ) : (
            <View style={styles.unavailBtn}>
              <Text style={styles.unavailBtnText}>NONE</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 16, marginVertical: 6 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 16, flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  cardUnavailable: { opacity: 0.6 },
  disc: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginRight: 14, overflow: 'hidden', elevation: 4 },
  discInner: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center' },
  discCenter: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.text, opacity: 0.9 },
  shine: { position: 'absolute', top: 4, left: 4, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)' },
  info: { flex: 1, marginRight: 10 },
  title: { fontSize: 15, fontWeight: '700', color: COLORS.text, letterSpacing: 0.3, marginBottom: 2 },
  artist: { fontSize: 12, color: COLORS.textMuted, marginBottom: 6 },
  genreBadge: { backgroundColor: COLORS.surface, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start' },
  genreText: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600' },
  availabilitySection: { alignItems: 'center', minWidth: 64 },
  availBadge: { flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginBottom: 4 },
  availBadgeGreen: { backgroundColor: 'rgba(72, 187, 120, 0.2)' },
  availBadgeRed: { backgroundColor: 'rgba(233, 69, 96, 0.2)' },
  availCount: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  availLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  availText: { fontSize: 10, color: COLORS.textMuted, marginBottom: 6 },
  borrowBtn: { backgroundColor: COLORS.accent, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  borrowBtnText: { color: COLORS.text, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  unavailBtn: { backgroundColor: COLORS.border, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  unavailBtnText: { color: COLORS.textMuted, fontSize: 10, fontWeight: '800' },
});