import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/index.js';

const TabIcon = ({ focused, label, icon }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <Text style={styles.tabEmoji}>{icon}</Text>
    <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary, borderBottomWidth: 1, borderBottomColor: COLORS.border },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: '800', letterSpacing: 2, fontSize: 14 },
        tabBarStyle: { backgroundColor: COLORS.secondary, borderTopColor: COLORS.border, height: 65, paddingBottom: 8, paddingTop: 6 },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'CD LIBRARY', tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Library" icon="💿" /> }} />
      <Tabs.Screen name="history" options={{ title: 'HISTORY', tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="History" icon="📜" /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 4, borderRadius: 12 },
  tabIconFocused: { backgroundColor: `${COLORS.accent}20` },
  tabEmoji: { fontSize: 20, marginBottom: 2 },
  tabLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: '700', letterSpacing: 0.5 },
  tabLabelFocused: { color: COLORS.accent },
});