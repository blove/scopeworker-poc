import { AgGridModule } from '@ag-grid-community/angular';
import { ColDef } from '@ag-grid-community/core';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [AgGridModule],
  template: `
    <div class="container">
      <ag-grid-angular
        [rowData]="rowData"
      ></ag-grid-angular>
    </div>
  `,
  styles: [
    `
      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
      }

      ag-grid-angular {
        flex: 1 auto;
      }
    `,
  ],
})
export class ContractComponent {
  colDef = [
    {
      field: 'name',
    },
  ] as ColDef[];

  rowData = [
    {
      name: '',
    },
  ];
}
