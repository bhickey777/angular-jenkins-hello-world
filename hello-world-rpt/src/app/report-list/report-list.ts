import { Component } from '@angular/core';

interface Report {
  name: string;
  description: string;
}
@Component({
  selector: 'app-report-list',
  imports: [],
  templateUrl: './report-list.html',
  styleUrl: './report-list.css'
})
export class ReportList {

  reports: Report[] = [
    {
      name: 'Account Summary',
      description: 'Customer account summary'
    },
    {
      name: 'Holdings Report',
      description: 'Current customer holdings'
    },
    {
      name: 'Trade History',
      description: 'Customer trading activity'
    },
    {
      name: 'Transaction Report',
      description: 'Account transactions'
    },
    {
      name: 'Client Statement',
      description: 'Generate client statement'
    }
  ];

  runReport(report: Report): void {
    console.log('Running report:', report.name);
  }
}
