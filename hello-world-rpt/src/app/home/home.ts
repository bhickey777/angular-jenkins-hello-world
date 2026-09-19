import { Component } from "@angular/core";
import { CustomerLookup } from '../customer-lookup/customer-lookup';
import { ReportList } from '../report-list/report-list';
import { EmployeeInfo } from '../employee-info/employee-info';
@Component({
  selector: "app-home",
  imports: [EmployeeInfo, CustomerLookup, ReportList],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  employeeName = 'Brian Hickey';
  employeeId = '10245';
  employeeRole = 'Financial Advisor';
}
