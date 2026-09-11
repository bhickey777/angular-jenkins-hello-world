import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="card">
      <h1>Hello from Angular!</h1>
      <p id="status">Jenkins deployment test successful.</p>
      <p>This Angular application is running inside Docker.</p>
    </main>
  `
})
export class AppComponent {}
