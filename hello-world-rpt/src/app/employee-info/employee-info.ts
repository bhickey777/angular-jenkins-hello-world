import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-info',
  imports: [],
  templateUrl: './employee-info.html',
  styleUrl: './employee-info.css'
})
export class EmployeeInfo {

  employee = {
    employeeId: 10245,
    name: 'Brian Hickey',
    role: 'Financial Advisor',
    department: 'Investment Services'
  };

}
