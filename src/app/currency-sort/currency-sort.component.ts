import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
  closingTime: string;
  closingTimeSort: number;
  change: number;
  marketStatus: 'open' | 'closed';
}

@Component({
  selector: 'app-currency-sort',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './currency-sort.component.html',
  styleUrls: ['./currency-sort.component.css']
})
export class CurrencySortComponent implements OnInit {
  currencies: CurrencyData[] = [
    { 
      code: 'USD', 
      name: 'US Dollar', 
      symbol: '$', 
      rate: 1.00, 
      flag: '🇺🇸',
      closingTime: '5:00 PM EST',
      closingTimeSort: 17,
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
      closingTimeSort: 11.5,
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
      closingTimeSort: 12,
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
      closingTimeSort: 2,
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
      closingTimeSort: 6.5,
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
      closingTimeSort: 1,
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
      closingTimeSort: 17,
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
      closingTimeSort: 11,
      change: -0.12,
      marketStatus: 'closed'
    }
  ];

  sortedCurrencies: CurrencyData[] = [];
  selectedCurrencies: Map<string, { currency: CurrencyData, count: number }> = new Map();
  currentSortOrder: 'asc' | 'desc' = 'asc';
  currencyCount: number = 1;
  isSending: boolean = false;
  sendSuccess: boolean = false;
  sendError: string = '';

  constructor() { }

  ngOnInit(): void {
    this.sortCurrencies('asc');
  }

  sortCurrencies(order: 'asc' | 'desc'): void {
    this.currentSortOrder = order;
    this.sortedCurrencies = [...this.currencies].sort((a, b) => {
      if (order === 'asc') {
        return a.closingTimeSort - b.closingTimeSort;
      } else {
        return b.closingTimeSort - a.closingTimeSort;
      }
    });
  }

  selectCurrency(currency: CurrencyData): void {
    if (this.selectedCurrencies.has(currency.code)) {
      this.selectedCurrencies.delete(currency.code);
    } else {
      this.selectedCurrencies.set(currency.code, {
        currency: currency,
        count: 1
      });
    }
  }

  isSelected(currency: CurrencyData): boolean {
    return this.selectedCurrencies.has(currency.code);
  }

  getSelectedCount(currency: CurrencyData): number {
    return this.selectedCurrencies.get(currency.code)?.count || 1;
  }

  updateSelectedCount(currency: CurrencyData, value: number): void {
    const count = Math.max(1, Math.min(1000, value));
    const selected = this.selectedCurrencies.get(currency.code);
    if (selected) {
      selected.count = count;
    }
  }

  incrementSelectedCount(currency: CurrencyData): void {
    const selected = this.selectedCurrencies.get(currency.code);
    if (selected) {
      selected.count = Math.min(1000, selected.count + 1);
    }
  }

  decrementSelectedCount(currency: CurrencyData): void {
    const selected = this.selectedCurrencies.get(currency.code);
    if (selected) {
      selected.count = Math.max(1, selected.count - 1);
    }
  }

  getTotalItems(): number {
    return Array.from(this.selectedCurrencies.values()).reduce((sum, item) => sum + item.count, 0);
  }

  updateCount(value: number): void {
    this.currencyCount = Math.max(1, Math.min(1000, value));
  }

  incrementCount(): void {
    this.currencyCount = Math.min(1000, this.currencyCount + 1);
  }

  decrementCount(): void {
    this.currencyCount = Math.max(1, this.currencyCount - 1);
  }

  sendToBackend(): void {
    if (this.selectedCurrencies.size === 0) {
      this.sendError = 'Please select at least one currency!';
      setTimeout(() => this.sendError = '', 3000);
      return;
    }

    this.isSending = true;
    this.sendSuccess = false;
    this.sendError = '';

    // Prepare data to send - array of selected currencies with their counts
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
      totalValue: item.currency.rate * item.count
    }));

    const dataToSend = {
      currencies: currenciesList,
      totalItems: currenciesList.reduce((sum, item) => sum + item.count, 0),
      grandTotal: currenciesList.reduce((sum, item) => sum + item.totalValue, 0),
      timestamp: new Date().toISOString()
    };

    // Simulate API call (replace with actual HTTP request)
    console.log('Sending to backend:', dataToSend);
    
    // Simulate network delay
    setTimeout(() => {
      // Simulate successful response
      this.isSending = false;
      this.sendSuccess = true;
      
      // Log the sent data
      console.log('Successfully sent to backend:', dataToSend);
      
      // Show success message for 3 seconds
      setTimeout(() => {
        this.sendSuccess = false;
      }, 3000);
    }, 1000);
  }
}
