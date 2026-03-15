import { PENALTY_PER_DAY } from '../constants/index.js';

export const calculatePenalty = (dueDate, returnDate) => {
  const due = new Date(dueDate);
  const checkDate = returnDate ? new Date(returnDate) : new Date();

  if (checkDate <= due) return 0;

  const diffMs = checkDate.getTime() - due.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return parseFloat((diffDays * PENALTY_PER_DAY).toFixed(2));
};

export const isOverdue = (dueDate, returnDate) => {
  const due = new Date(dueDate);
  const checkDate = returnDate ? new Date(returnDate) : new Date();
  return checkDate > due;
};

export const getDaysOverdue = (dueDate) => {
  const due = new Date(dueDate);
  const now = new Date();
  if (now <= due) return 0;
  const diffMs = now.getTime() - due.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export const getDaysUntilDue = (dueDate) => {
  const due = new Date(dueDate);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => `₱${amount.toFixed(2)}`;

export const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);