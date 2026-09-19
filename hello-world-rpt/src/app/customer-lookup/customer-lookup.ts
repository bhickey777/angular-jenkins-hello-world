import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-lookup',
  imports: [FormsModule],
  templateUrl: './customer-lookup.html',
  styleUrl: './customer-lookup.css'
})
export class CustomerLookup {

  name = '';
  accountNumber = '';
  email = '';

  search(): void {
    console.log('Searching for:', {
      name: this.name,
      accountNumber: this.accountNumber,
      email: this.email
    });
  }
}
