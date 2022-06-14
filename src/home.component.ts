import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="container">
      <h1>Scopeworker POCs</h1>
      <p>This Angular v14 project serves as a place for Scopeworker's proof of concepts.</p>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 16px;
      }
    `,
  ],
})
export class HomeComponent {}
