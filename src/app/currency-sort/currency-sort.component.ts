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

  /**
   * Parse time string like "5:00 PM EST" or "11:30 AM EST" to 24-hour format number
   */
  parseTimeToNumber(timeStr: string): number {
    const timePart = timeStr.split(' ')[0]; // Get "5:00" or "11:30"
    const period = timeStr.includes('PM') ? 'PM' : 'AM';
    
    const [hourStr, minuteStr] = timePart.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    // Return as decimal number (e.g., 17.5 for 5:30 PM)
    return hour + (minute / 60);
  }

  sortCurrencies(order: 'asc' | 'desc'): void {
    this.currentSortOrder = order;
    this.sortedCurrencies = [...this.currencies].sort((a, b) => {
      const timeA = this.parseTimeToNumber(a.closingTime);
      const timeB = this.parseTimeToNumber(b.closingTime);
      
      if (order === 'asc') {
        return timeA - timeB;
      } else {
        return timeB - timeA;
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
