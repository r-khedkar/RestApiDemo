import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { Currency } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';

/**
 * Currency converter component with exchange rate display
 */
@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies: Currency[] = [];
  amount: number = 100;
  selectedCurrency: string = 'USD';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencies = this.currencyService.getAllCurrencies();
  }

  /**
   * Convert amount to target currency
   */
  convert(rate: number): number {
    return this.amount * rate;
  }
}
