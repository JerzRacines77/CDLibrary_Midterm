export const BORROW_DURATION_DAYS = 0; // for testing
export const PENALTY_PER_DAY = 5; // PHP 5 per day overdue
export const BORROW_FEE = 25; // PHP 25 per borrow
export const STORAGE_KEY = 'cd_library_data';

export const COLORS = {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#e94560',
  accentLight: '#ff6b6b',
  gold: '#ffd700',
  goldLight: '#ffe566',
  surface: '#0f3460',
  surfaceLight: '#1a4a7a',
  text: '#ffffff',
  textMuted: '#a0aec0',
  textDark: '#1a1a2e',
  success: '#48bb78',
  warning: '#ed8936',
  danger: '#e94560',
  cardBg: '#16213e',
  border: '#2d3748',
  overdue: '#fc8181',
  safe: '#68d391',
};

export const CD_COLORS = [
  '#e94560', '#0f3460', '#533483', '#e8a838',
  '#1a936f', '#c62a47', '#3d5a80', '#7b2d8b',
  '#d4a017', '#2e7d32',
];

export const INITIAL_CDS = [
  { id: '1', title: 'Thriller', artist: 'Michael Jackson', totalCopies: 3, availableCopies: 3, genre: 'Pop', year: 1982, coverColor: '#e94560' },
  { id: '2', title: 'Back in Black', artist: 'AC/DC', totalCopies: 2, availableCopies: 2, genre: 'Rock', year: 1980, coverColor: '#1a1a2e' },
  { id: '3', title: 'The Dark Side of the Moon', artist: 'Pink Floyd', totalCopies: 2, availableCopies: 2, genre: 'Progressive Rock', year: 1973, coverColor: '#533483' },
  { id: '4', title: 'Hotel California', artist: 'Eagles', totalCopies: 3, availableCopies: 3, genre: 'Rock', year: 1976, coverColor: '#e8a838' },
  { id: '5', title: 'Rumours', artist: 'Fleetwood Mac', totalCopies: 2, availableCopies: 2, genre: 'Soft Rock', year: 1977, coverColor: '#1a936f' },
  { id: '6', title: 'Purple Rain', artist: 'Prince', totalCopies: 2, availableCopies: 2, genre: 'Funk/Pop', year: 1984, coverColor: '#7b2d8b' },
];