import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Loading Service for centralized loading state management
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  private loadingCount = 0;

  /**
   * Get observable of loading state
   */
  isLoading$(): Observable<boolean> {
    return this.loadingSubject$.asObservable();
  }

  /**
   * Get current loading state
   */
  isLoading(): boolean {
    return this.loadingSubject$.value;
  }

  /**
   * Show loading indicator
   */
  show(): void {
    this.loadingCount++;
    if (this.loadingCount > 0) {
      this.loadingSubject$.next(true);
    }
  }

  /**
   * Hide loading indicator
   */
  hide(): void {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) {
      this.loadingSubject$.next(false);
    }
  }

  /**
   * Reset loading state (useful for error scenarios)
   */
  reset(): void {
    this.loadingCount = 0;
    this.loadingSubject$.next(false);
  }
}
