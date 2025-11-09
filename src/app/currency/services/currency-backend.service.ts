import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CurrencyItem {
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

export interface CurrencyRequest {
  currencies: CurrencyItem[];
  totalItems: number;
  grandTotal: number;
  timestamp: string;
}

export interface CurrencyResponse {
  success: boolean;
  message: string;
  transactionId: string;
  data: CurrencyRequest;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyBackendService {

  // Replace this with your actual backend URL
  private apiUrl = 'http://localhost:8080/api/currency';

  constructor() { }

  /**
   * Send currency data to backend
   * This is a mock implementation - replace with actual HTTP call
   */
  sendCurrencyData(data: CurrencyRequest): Observable<CurrencyResponse> {
    console.log('Sending to backend API:', this.apiUrl, data);

    // Mock response - replace with actual HTTP call:
    // return this.http.post<CurrencyResponse>(this.apiUrl, data);
    
    const mockResponse: CurrencyResponse = {
      success: true,
      message: 'Currency data received successfully',
      transactionId: 'TXN-' + Date.now(),
      data: data
    };

    // Simulate network delay
    return of(mockResponse).pipe(delay(1000));
  }

  /**
   * Example of how to use with Angular HttpClient:
   * 
   * import { HttpClient, HttpHeaders } from '@angular/common/http';
   * 
   * constructor(private http: HttpClient) { }
   * 
   * sendCurrencyData(data: CurrencyRequest): Observable<CurrencyResponse> {
   *   const headers = new HttpHeaders({
   *     'Content-Type': 'application/json',
   *     'Authorization': 'Bearer ' + this.getAuthToken()
   *   });
   * 
   *   return this.http.post<CurrencyResponse>(
   *     this.apiUrl + '/transactions',
   *     data,
   *     { headers }
   *   );
   * }
   * 
   * private getAuthToken(): string {
   *   return localStorage.getItem('authToken') || '';
   * }
   */
}
