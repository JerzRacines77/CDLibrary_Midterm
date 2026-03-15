/**
 * @typedef {Object} CD
 * @property {string} id
 * @property {string} title
 * @property {string} artist
 * @property {number} totalCopies
 * @property {number} availableCopies
 * @property {string} [genre]
 * @property {number} [year]
 * @property {string} coverColor
 */

/**
 * @typedef {Object} BorrowRecord
 * @property {string} id
 * @property {string} cdId
 * @property {string} cdTitle
 * @property {string} cdArtist
 * @property {string} borrowerName
 * @property {string} [borrowerContact]
 * @property {string} borrowDate
 * @property {string} dueDate
 * @property {string} [returnDate]
 * @property {number} penaltyFee
 * @property {boolean} isPaid
 * @property {boolean} isReturned
 */

/**
 * @typedef {Object} AppData
 * @property {CD[]} cds
 * @property {BorrowRecord[]} borrowRecords
 * @property {number} totalIncome
 * @property {number} totalBorrowedAllTime
 */