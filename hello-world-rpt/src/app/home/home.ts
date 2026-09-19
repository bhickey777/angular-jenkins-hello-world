import { Component } from "@angular/core";
import { CustomerLookup } from '../customer-lookup/customer-lookup';
import { ReportList } from '../report-list/report-list';
@Component({
  selector: "app-home",
  imports: [CustomerLookup, ReportList],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {}
