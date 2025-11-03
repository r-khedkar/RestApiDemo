import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
}

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.00, flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.50, flag: '🇯🇵' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.12, flag: '🇮🇳' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.53, flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.38, flag: '🇨🇦' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.88, flag: '🇨🇭' }
  ];

  amount: number = 100;
  selectedCurrency: string = 'USD';

  constructor() { }

  ngOnInit(): void { }

  convert(rate: number): number {
    return this.amount * rate;
  }
}
