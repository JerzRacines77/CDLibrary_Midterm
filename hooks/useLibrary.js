import { useCallback, useEffect, useRef, useState } from 'react';
import { BORROW_FEE, CD_COLORS } from '../constants/index.js';
import { calculatePenalty, generateId } from '../utils/helpers.js';
import { loadData, saveData } from '../utils/storage.js';

export const useLibrary = () => {
  const [data, setData] = useState({
    cds: [],
    borrowRecords: [],
    totalIncome: 0,
    totalBorrowedAllTime: 0,
  });
  const [loading, setLoading] = useState(true);
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const init = async () => {
      try {
        const stored = await loadData();
        const updated = {
          ...stored,
          borrowRecords: stored.borrowRecords.map((r) =>
            !r.isReturned
              ? { ...r, penaltyFee: calculatePenalty(r.dueDate) }
              : r
          ),
        };
        setData(updated);
        dataRef.current = updated;
      } catch (e) {
        console.error('Failed to initialize library', e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const persist = useCallback(async (newData) => {
    setData(newData);
    dataRef.current = newData;
    await saveData(newData);
  }, []);

  const borrowCD = useCallback(async (cd, borrowerName, borrowerContact) => {
    const current = dataRef.current;
    if (cd.availableCopies <= 0) return { success: false, message: 'CD not available.' };
    if (!borrowerName.trim()) return { success: false, message: 'Borrower name is required.' };

    const borrowDate = new Date().toISOString();
    const dueDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

    const newRecord = {
      id: generateId(),
      cdId: cd.id,
      cdTitle: cd.title,
      cdArtist: cd.artist,
      borrowerName: borrowerName.trim(),
      borrowerContact: borrowerContact.trim(),
      borrowDate,
      dueDate,
      penaltyFee: 0,
      isPaid: false,
      isReturned: false,
    };

    const newData = {
      ...current,
      cds: current.cds.map((c) =>
        c.id === cd.id ? { ...c, availableCopies: c.availableCopies - 1 } : c
      ),
      borrowRecords: [...current.borrowRecords, newRecord],
      totalBorrowedAllTime: current.totalBorrowedAllTime + 1,
      totalIncome: current.totalIncome + BORROW_FEE,
    };

    await persist(newData);
    return { success: true, message: `CD borrowed! Borrow fee: ₱${BORROW_FEE}.00` };
  }, [persist]);

  const returnCD = useCallback(async (record) => {
    const current = dataRef.current;
    const returnDate = new Date().toISOString();
    const penalty = calculatePenalty(record.dueDate, returnDate);

    const newData = {
      ...current,
      cds: current.cds.map((c) =>
        c.id === record.cdId ? { ...c, availableCopies: c.availableCopies + 1 } : c
      ),
      borrowRecords: current.borrowRecords.map((r) =>
        r.id === record.id
          ? { ...r, isReturned: true, returnDate, penaltyFee: penalty, isPaid: penalty === 0 }
          : r
      ),
      totalIncome: current.totalIncome + penalty,
    };

    await persist(newData);
    return {
      success: true,
      message: penalty > 0
        ? `Returned with penalty of ₱${penalty.toFixed(2)}`
        : 'Returned on time. No penalty!',
      penalty,
    };
  }, [persist]);

  const addCD = useCallback(async (cd) => {
    const current = dataRef.current;
    const newCD = {
      ...cd,
      id: generateId(),
      availableCopies: cd.totalCopies,
      coverColor: CD_COLORS[Math.floor(Math.random() * CD_COLORS.length)],
    };
    const newData = { ...current, cds: [...current.cds, newCD] };
    await persist(newData);
  }, [persist]);

  const removeCD = useCallback(async (cdId) => {
    const current = dataRef.current;
    if (current.borrowRecords.some((r) => r.cdId === cdId && !r.isReturned))
      return { success: false, message: 'Cannot remove CD with active borrows.' };
    const newData = { ...current, cds: current.cds.filter((c) => c.id !== cdId) };
    await persist(newData);
    return { success: true, message: 'CD removed.' };
  }, [persist]);

  const refreshPenalties = useCallback(() => {
    const current = dataRef.current;
    const updated = {
      ...current,
      borrowRecords: current.borrowRecords.map((r) =>
        !r.isReturned ? { ...r, penaltyFee: calculatePenalty(r.dueDate) } : r
      ),
    };
    setData(updated);
    dataRef.current = updated;
  }, []);

  const resetData = useCallback(async () => {
    const current = dataRef.current;
    const newData = {
      cds: current.cds,
      borrowRecords: [],
      totalIncome: 0,
      totalBorrowedAllTime: 0,
    };
    setData(newData);
    dataRef.current = newData;
    await saveData(newData);
  }, []);

  const activeBorrows = data.borrowRecords.filter((r) => !r.isReturned);
  const returnedRecords = data.borrowRecords.filter((r) => r.isReturned);

  return {
    data,
    loading,
    activeBorrows,
    returnedRecords,
    borrowCD,
    returnCD,
    addCD,
    removeCD,
    refreshPenalties,
    resetData,
  };
};