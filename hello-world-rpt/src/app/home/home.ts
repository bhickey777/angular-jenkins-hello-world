import { Component } from "@angular/core";
import { CustomerLookup } from '../customer-lookup/customer-lookup';
import { ReportList } from '../report-list/report-list';
import { ReportViewer } from '../report-viewer/report-viewer';
import { EmployeeInfo } from '../employee-info/employee-info';

@Component({
  selector: "app-home",
  imports: [EmployeeInfo, CustomerLookup, ReportList, ReportViewer],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  employeeName = 'Brian Hickey';
  employeeId = '10245';
  employeeRole = 'Financial Advisor';

  selectedReport?: string;
  reportType?: string;

}
