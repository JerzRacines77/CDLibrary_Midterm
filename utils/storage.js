import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_CDS, STORAGE_KEY } from '../constants/index.js';

export const loadData = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);  // ← returns YOUR saved data
    }
    // Only uses INITIAL_CDS the very first time app is ever opened
    const initial = {
      cds: INITIAL_CDS,
      borrowRecords: [],
      totalIncome: 0,
      totalBorrowedAllTime: 0,
    };
    await saveData(initial);
    return initial;
  } catch (e) {
    console.error('Failed to load data', e);
    return {
      cds: INITIAL_CDS,
      borrowRecords: [],
      totalIncome: 0,
      totalBorrowedAllTime: 0,
    };
  }
};

export const saveData = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data', e);
  }
};