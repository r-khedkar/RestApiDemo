import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

/**
 * Toast Notification Service for displaying user feedback messages
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  private nextId = 1;

  /**
   * Get observable of current toasts
   */
  getToasts(): Observable<Toast[]> {
    return this.toasts$.asObservable();
  }

  /**
   * Show a success toast
   */
  success(message: string, duration: number = 3000): void {
    this.addToast(message, 'success', duration);
  }

  /**
   * Show an error toast
   */
  error(message: string, duration: number = 5000): void {
    this.addToast(message, 'error', duration);
  }

  /**
   * Show a warning toast
   */
  warning(message: string, duration: number = 4000): void {
    this.addToast(message, 'warning', duration);
  }

  /**
   * Show an info toast
   */
  info(message: string, duration: number = 3000): void {
    this.addToast(message, 'info', duration);
  }

  /**
   * Add a toast to the queue
   */
  private addToast(message: string, type: Toast['type'], duration: number): void {
    const toast: Toast = {
      id: this.nextId++,
      message,
      type,
      duration
    };

    const currentToasts = this.toasts$.value;
    this.toasts$.next([...currentToasts, toast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => this.removeToast(toast.id), duration);
    }
  }

  /**
   * Remove a specific toast
   */
  removeToast(id: number): void {
    const currentToasts = this.toasts$.value;
    this.toasts$.next(currentToasts.filter(t => t.id !== id));
  }

  /**
   * Clear all toasts
   */
  clearAll(): void {
    this.toasts$.next([]);
  }
}
