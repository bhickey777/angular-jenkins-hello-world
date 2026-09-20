import { Component, output } from '@angular/core';

interface Report {
  name: string;
  description: string;
  reportType: string;
}
@Component({
  selector: 'app-report-list',
  imports: [],
  templateUrl: './report-list.html',
  styleUrl: './report-list.css'
})
export class ReportList {

  reportSelected = output<string>();

  reports: Report[] = [
    {
      name: 'Asset Totals from Trading',
      description: 'Total trade value by asset class',
      reportType: 'assetClassTotals'
    },
    {
      name: 'Weekly Trends',
      description: 'Total trade value by week',
      reportType: 'weeklyTrends'
    },
    {
      name: 'Trade History',
      description: 'Customer trading activity',
      reportType: 'tradeHistory'
    },
    {
      name: 'Transaction Report',
      description: 'Account transactions',
      reportType: 'transactionReport'
    },
    {
      name: 'Client Statement',
      description: 'Generate client statement',
      reportType: 'clientStatement'
    }
  ];

  protected runReport(report: Report): void {
    console.log('Running report:', report.name);
    this.reportSelected.emit(report.reportType);
  }
}
