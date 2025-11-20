import { Injectable } from '@angular/core';
import { Currency, SelectedCurrency, SortOrder } from '../models/currency.model';
import { TimeUtilService } from '../../utils/time-util.service';
import { CURRENCIES, ASIAN_CURRENCY_CODES, DEFAULT_CURRENCY_COUNT, MIN_CURRENCY_COUNT, MAX_CURRENCY_COUNT } from '../constants/currency.constants';

/**
 * Service for managing currency selection and operations
 */
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  
  constructor(private timeUtil: TimeUtilService) {}

  /**
   * Get all available currencies
   */
  getAllCurrencies(): Currency[] {
    return [...CURRENCIES];
  }

  /**
   * Sort currencies by closing time
   * @param currencies - Array of currencies to sort
   * @param order - Sort order (asc or desc)
   * Secondary sort: If closing times are equal, sort by currency code alphabetically
   */
  sortByClosingTime(currencies: Currency[], order: SortOrder): Currency[] {
    return [...currencies].sort((a, b) => {
      const timeA = this.timeUtil.parseTimeToNumber(a.closingTime);
      const timeB = this.timeUtil.parseTimeToNumber(b.closingTime);
      
      // Primary sort: by closing time
      const timeDiff = order === 'asc' ? timeA - timeB : timeB - timeA;
      
      // Secondary sort: if closing times are equal, sort by currency code alphabetically
      if (timeDiff === 0) {
        return a.code.localeCompare(b.code);
      }
      
      return timeDiff;
    });
  }

  /**
   * Get Asian currencies from the available list
   */
  getAsianCurrencies(): Currency[] {
    return CURRENCIES.filter(currency => 
      ASIAN_CURRENCY_CODES.includes(currency.code)
    );
  }

  /**
   * Validate currency count within allowed range
   * @param count - Count to validate
   */
  validateCount(count: number): number {
    return Math.max(MIN_CURRENCY_COUNT, Math.min(MAX_CURRENCY_COUNT, count));
  }

  /**
   * Get default count for new currency selection
   */
  getDefaultCount(): number {
    return DEFAULT_CURRENCY_COUNT;
  }

  /**
   * Calculate total value for a selected currency
   * @param currency - Currency object
   * @param count - Quantity
   */
  calculateTotalValue(currency: Currency, count: number): number {
    return currency.rate * count;
  }

  /**
   * Calculate grand total from selected currencies
   * @param selections - Map of selected currencies
   */
  calculateGrandTotal(selections: Map<string, SelectedCurrency>): number {
    return Array.from(selections.values()).reduce(
      (sum, item) => sum + this.calculateTotalValue(item.currency, item.count),
      0
    );
  }

  /**
   * Calculate total item count from selected currencies
   * @param selections - Map of selected currencies
   */
  calculateTotalItems(selections: Map<string, SelectedCurrency>): number {
    return Array.from(selections.values()).reduce(
      (sum, item) => sum + item.count,
      0
    );
  }

  /**
   * Get minimum and maximum count limits
   */
  getCountLimits(): { min: number; max: number } {
    return {
      min: MIN_CURRENCY_COUNT,
      max: MAX_CURRENCY_COUNT
    };
  }
}
