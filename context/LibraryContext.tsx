import React, { createContext, ReactNode, useContext } from 'react';
import { useLibrary } from '../hooks/useLibrary.js';

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

type AppData = {
  cds: CD[];
  borrowRecords: BorrowRecord[];
  totalIncome: number;
  totalBorrowedAllTime: number;
};

type LibraryContextType = {
  data: AppData;
  loading: boolean;
  activeBorrows: BorrowRecord[];
  returnedRecords: BorrowRecord[];
  borrowCD: (cd: CD, borrowerName: string, borrowerContact: string) => Promise<{ success: boolean; message: string }>;
  returnCD: (record: BorrowRecord) => Promise<{ success: boolean; message: string; penalty: number }>;
  addCD: (cd: Omit<CD, 'id' | 'availableCopies' | 'coverColor'>) => Promise<void>;
  removeCD: (cdId: string) => Promise<{ success: boolean; message: string }>;
  refreshPenalties: () => void;
  resetData: () => Promise<void>;
};

const LibraryContext = createContext<LibraryContextType | null>(null);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const library = useLibrary();
  return (
    <LibraryContext.Provider value={library}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibraryContext must be used within LibraryProvider');
  return context;
};