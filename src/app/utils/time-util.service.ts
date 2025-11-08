import { Injectable } from '@angular/core';

/**
 * Utility service for time-related operations
 */
@Injectable({
  providedIn: 'root'
})
export class TimeUtilService {

  /**
   * Parse time string like "5:00 PM EST" or "11:30 AM EST" to 24-hour format number
   * @param timeStr - Time string in format "HH:MM AM/PM EST"
   * @returns Decimal number representing time in 24-hour format (e.g., 17.5 for 5:30 PM)
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

  /**
   * Format time number back to readable string
   * @param timeNumber - Decimal number representing time in 24-hour format
   * @returns Formatted time string
   */
  formatTimeNumber(timeNumber: number): string {
    const hour = Math.floor(timeNumber);
    const minute = Math.round((timeNumber - hour) * 60);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  }
}
