import { formatDate, formatNumber } from '@angular/common';

export function IsDefaultDate(date: Date): boolean {
  return date.toString() == '0001-01-01T00:00:00';
}

export function DateGreaterThan(date1: Date, date2: Date): boolean {
  let intDate1 = Date.parse(date1.toString());
  let intDate2 = Date.parse(date2.toString());
  return intDate1 > intDate2;
}

export function FormatDate(date: Date): string {
  return formatDate(date, 'hh:mm:ss - dd/MM/yyyy', 'en-US');
}

export function FormatNumber(number: number): string {
  return formatNumber(number, 'en-US', '1.0-0');
}
