/**
 * Currency data model representing a single currency with market information
 */
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
  closingTime: string;
  change: number;
  marketStatus: 'open' | 'closed';
}

/**
 * Selected currency with quantity information
 */
export interface SelectedCurrency {
  currency: Currency;
  count: number;
}

/**
 * Currency request payload for backend submission
 */
export interface CurrencySubmissionRequest {
  currencies: CurrencySubmissionItem[];
  totalItems: number;
  grandTotal: number;
  timestamp: string;
}

/**
 * Individual currency item in submission request
 */
export interface CurrencySubmissionItem {
  currency: {
    code: string;
    name: string;
    symbol: string;
    rate: number;
    closingTime: string;
    marketStatus: string;
    change: number;
  };
  count: number;
  totalValue: number;
}

/**
 * Sort order type for currency list
 */
export type SortOrder = 'asc' | 'desc';
