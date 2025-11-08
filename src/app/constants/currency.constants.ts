import { Currency } from '../models/currency.model';

/**
 * Default currency data
 * In a real application, this would be fetched from an API
 */
export const CURRENCIES: Currency[] = [
  { 
    code: 'USD', 
    name: 'US Dollar', 
    symbol: '$', 
    rate: 1.00, 
    flag: '🇺🇸',
    closingTime: '5:00 PM EST',
    change: 0.00,
    marketStatus: 'open'
  },
  { 
    code: 'EUR', 
    name: 'Euro', 
    symbol: '€', 
    rate: 0.92, 
    flag: '🇪🇺',
    closingTime: '11:30 AM EST',
    change: -0.23,
    marketStatus: 'closed'
  },
  { 
    code: 'GBP', 
    name: 'British Pound', 
    symbol: '£', 
    rate: 0.79, 
    flag: '🇬🇧',
    closingTime: '12:00 PM EST',
    change: 0.45,
    marketStatus: 'closed'
  },
  { 
    code: 'JPY', 
    name: 'Japanese Yen', 
    symbol: '¥', 
    rate: 149.50, 
    flag: '🇯🇵',
    closingTime: '2:00 AM EST',
    change: 1.20,
    marketStatus: 'closed'
  },
  { 
    code: 'INR', 
    name: 'Indian Rupee', 
    symbol: '₹', 
    rate: 83.12, 
    flag: '🇮🇳',
    closingTime: '6:30 AM EST',
    change: 0.15,
    marketStatus: 'closed'
  },
  { 
    code: 'AUD', 
    name: 'Australian Dollar', 
    symbol: 'A$', 
    rate: 1.53, 
    flag: '🇦🇺',
    closingTime: '1:00 AM EST',
    change: -0.08,
    marketStatus: 'closed'
  },
  { 
    code: 'CAD', 
    name: 'Canadian Dollar', 
    symbol: 'C$', 
    rate: 1.38, 
    flag: '🇨🇦',
    closingTime: '5:00 PM EST',
    change: 0.32,
    marketStatus: 'open'
  },
  { 
    code: 'CHF', 
    name: 'Swiss Franc', 
    symbol: 'CHF', 
    rate: 0.88, 
    flag: '🇨🇭',
    closingTime: '11:00 AM EST',
    change: -0.12,
    marketStatus: 'closed'
  }
];

/**
 * Asian currency codes for default selection
 */
export const ASIAN_CURRENCY_CODES: string[] = [
  'JPY', // Japanese Yen
  'INR', // Indian Rupee
  'CNY', // Chinese Yuan
  'KRW', // South Korean Won
  'SGD', // Singapore Dollar
  'HKD', // Hong Kong Dollar
  'THB', // Thai Baht
  'MYR'  // Malaysian Ringgit
];

/**
 * Default count for newly selected currencies
 */
export const DEFAULT_CURRENCY_COUNT = 1;

/**
 * Min and max count limits for currency selection
 */
export const MIN_CURRENCY_COUNT = 1;
export const MAX_CURRENCY_COUNT = 1000;
