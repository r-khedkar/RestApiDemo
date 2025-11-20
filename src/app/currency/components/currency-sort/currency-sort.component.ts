import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { Currency, SelectedCurrency, SortOrder } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-sort',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './currency-sort.component.html',
  styleUrls: ['./currency-sort.component.css']
})
export class CurrencySortComponent implements OnInit {
  sortedCurrencies: Currency[] = [];
  selectedCurrencies: Map<string, SelectedCurrency> = new Map();
  currentSortOrder: SortOrder = 'asc';
  currencyCount: number = 1;
  isSending: boolean = false;
  sendSuccess: boolean = false;
  sendError: string = '';
  showReviewModal: boolean = false;
  searchLetter: string = '';
  filteredCurrencies: Currency[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadAndSortCurrencies('asc');
  }

  /**
   * Load and sort currencies
   */
  private loadAndSortCurrencies(order: SortOrder): void {
    const currencies = this.currencyService.getAllCurrencies();
    this.sortedCurrencies = this.currencyService.sortByClosingTime(currencies, order);
    this.filteredCurrencies = [...this.sortedCurrencies];
  }

  /**
   * Filter currencies by starting letter
   * Filtered currencies maintain the time-based sort order,
   * with alphabetical sorting as secondary criteria for same closing times
   */
  filterByLetter(letter: string): void {
    this.searchLetter = letter.toUpperCase();
    if (!this.searchLetter) {
      this.filteredCurrencies = [...this.sortedCurrencies];
    } else {
      this.filteredCurrencies = this.sortedCurrencies.filter(
        currency => currency.code.startsWith(this.searchLetter) || 
                    currency.name.toUpperCase().startsWith(this.searchLetter)
      );
    }
  }

  /**
   * Clear letter filter
   */
  clearFilter(): void {
    this.searchLetter = '';
    this.filteredCurrencies = [...this.sortedCurrencies];
  }

  /**
   * Sort currencies by closing time
   */
  sortCurrencies(order: SortOrder): void {
    this.currentSortOrder = order;
    this.sortedCurrencies = this.currencyService.sortByClosingTime(
      this.sortedCurrencies,
      order
    );
    this.filteredCurrencies = [...this.sortedCurrencies];
    if (this.searchLetter) {
      this.filterByLetter(this.searchLetter);
    }
  }

  /**
   * Select default Asian currencies
   */
  selectDefaultAsianCurrencies(): void {
    const asianCurrencies = this.currencyService.getAsianCurrencies();
    
    asianCurrencies.forEach(currency => {
      if (!this.selectedCurrencies.has(currency.code)) {
        this.selectedCurrencies.set(currency.code, {
          currency: currency,
          count: this.currencyService.getDefaultCount()
        });
      }
    });
  }

  /**
   * Toggle currency selection
   */
  selectCurrency(currency: Currency): void {
    if (this.selectedCurrencies.has(currency.code)) {
      this.selectedCurrencies.delete(currency.code);
    } else {
      this.selectedCurrencies.set(currency.code, {
        currency: currency,
        count: this.currencyService.getDefaultCount()
      });
    }
  }

  /**
   * Check if currency is selected
   */
  isSelected(currency: Currency): boolean {
    return this.selectedCurrencies.has(currency.code);
  }

  /**
   * Get count for selected currency
   */
  getSelectedCount(currency: Currency): number {
    return this.selectedCurrencies.get(currency.code)?.count || this.currencyService.getDefaultCount();
  }

  /**
   * Update count for selected currency
   */
  updateSelectedCount(currency: Currency, value: number): void {
    const count = this.currencyService.validateCount(value);
    const selected = this.selectedCurrencies.get(currency.code);
    if (selected) {
      selected.count = count;
    }
  }

  /**
   * Increment count for selected currency
   */
  incrementSelectedCount(currency: Currency): void {
    const selected = this.selectedCurrencies.get(currency.code);
    if (selected) {
      const limits = this.currencyService.getCountLimits();
      selected.count = Math.min(limits.max, selected.count + 1);
    }
  }

  /**
   * Decrement count for selected currency
   */
  decrementSelectedCount(currency: Currency): void {
    const selected = this.selectedCurrencies.get(currency.code);
    if (selected) {
      const limits = this.currencyService.getCountLimits();
      selected.count = Math.max(limits.min, selected.count - 1);
    }
  }

  /**
   * Get total items across all selected currencies
   */
  getTotalItems(): number {
    return this.currencyService.calculateTotalItems(this.selectedCurrencies);
  }

  /**
   * Update legacy currency count (kept for backward compatibility)
   */
  updateCount(value: number): void {
    this.currencyCount = this.currencyService.validateCount(value);
  }

  /**
   * Increment legacy currency count
   */
  incrementCount(): void {
    const limits = this.currencyService.getCountLimits();
    this.currencyCount = Math.min(limits.max, this.currencyCount + 1);
  }

  /**
   * Decrement legacy currency count
   */
  decrementCount(): void {
    const limits = this.currencyService.getCountLimits();
    this.currencyCount = Math.max(limits.min, this.currencyCount - 1);
  }

  /**
   * Open review modal before sending to backend
   */
  sendToBackend(): void {
    if (this.selectedCurrencies.size === 0) {
      this.sendError = 'Please select at least one currency!';
      setTimeout(() => this.sendError = '', 3000);
      return;
    }

    this.showReviewModal = true;
  }

  /**
   * Close review modal
   */
  closeModal(): void {
    this.showReviewModal = false;
  }

  /**
   * Confirm and submit data to backend
   */
  confirmSubmit(): void {
    const confirmed = this.showConfirmationDialog();
    
    if (!confirmed) {
      return;
    }

    this.showReviewModal = false;
    this.isSending = true;
    this.sendSuccess = false;
    this.sendError = '';

    const dataToSend = this.prepareSubmissionData();

    // Simulate API call (replace with actual HTTP request)
    console.log('Sending to backend:', dataToSend);
    
    this.simulateBackendCall(dataToSend);
  }

  /**
   * Show confirmation dialog
   */
  private showConfirmationDialog(): boolean {
    return confirm(
      `Are you sure you want to submit ${this.selectedCurrencies.size} ${this.selectedCurrencies.size === 1 ? 'currency' : 'currencies'} ` +
      `with a total of ${this.getTotalItems()} items to the backend?\n\n` +
      `This action cannot be undone.`
    );
  }

  /**
   * Prepare data for backend submission
   */
  private prepareSubmissionData() {
    const currenciesList = Array.from(this.selectedCurrencies.values()).map(item => ({
      currency: {
        code: item.currency.code,
        name: item.currency.name,
        symbol: item.currency.symbol,
        rate: item.currency.rate,
        closingTime: item.currency.closingTime,
        marketStatus: item.currency.marketStatus,
        change: item.currency.change
      },
      count: item.count,
      totalValue: this.currencyService.calculateTotalValue(item.currency, item.count)
    }));

    return {
      currencies: currenciesList,
      totalItems: this.currencyService.calculateTotalItems(this.selectedCurrencies),
      grandTotal: this.currencyService.calculateGrandTotal(this.selectedCurrencies),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Simulate backend API call
   */
  private simulateBackendCall(data: any): void {
    console.log('Sending to backend:', data);
    
    // Simulate network delay
    setTimeout(() => {
      this.isSending = false;
      this.sendSuccess = true;
      
      console.log('Successfully sent to backend:', data);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        this.sendSuccess = false;
      }, 3000);
    }, 1000);
  }

  /**
   * Get selected currencies as array (for template)
   */
  getSelectedCurrenciesArray(): SelectedCurrency[] {
    return Array.from(this.selectedCurrencies.values());
  }
}
