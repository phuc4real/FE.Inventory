import { formatDate, formatNumber } from '@angular/common';

export function DateGreaterThan(date1: Date, date2: Date): boolean {
  let intDate1 = Date.parse(date1.toString());
  let intDate2 = Date.parse(date2.toString());
  return intDate1 > intDate2;
}

export function FormatDate(date: Date): string {
  return formatDate(date, 'dd/MM/yyyy hh:mm', 'en-US');
}

export function FormatNumber(number: number): string {
  return formatNumber(number, 'en-US', '1.0-0');
}

export function StatusColor(status: string) {
  let bg = 'background-color: ';
  switch (status) {
    case 'Done':
      return bg + '#90EE90';
    case 'Processing':
      return bg + '#ADD8E6';
    case 'In Review':
      return bg + '#ADD8E6';
    case 'Pending':
      return bg + '#ADD8E6';
    case 'Cancel by User':
      return bg + '#ADD8E6';
    case 'Rejected by Admin':
      return bg + '#F08080';
    case 'Closed':
      return bg + '#F08080';
    default:
      return '';
  }
}
