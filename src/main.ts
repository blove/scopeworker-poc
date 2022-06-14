import './polyfills';

import {
  ChangeDetectionStrategy,
  Component,
  importProvidersFrom,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then(({ HomeComponent }) => HomeComponent),
  },
  {
    path: 'contract',
    loadComponent: () =>
      import('./contract.component').then(
        ({ ContractComponent }) => ContractComponent
      ),
  },
  { path: '**', redirectTo: '' },
] as Routes;

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
  ],
  template: `
    <mat-toolbar class="toolbar">
      <button mat-icon-button aria-label="Toggle menu" (click)="toggleMatSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Angular v14 Playground</span>
    </mat-toolbar>
    <mat-sidenav-container class="container">
      <mat-sidenav [(opened)]="matSidenavOpened" fixedTopGap="64" fixedInViewport>
        <mat-nav-list>
          <a mat-list-item routerLink="/">Home</a>
          <a mat-list-item routerLink="/contract">Bulk Contract</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .toolbar {
        position: fixed;
        z-index: 2;
        display: flex;
      }

      .toolbar > button {
        color: #fff;
      }

      .toolbar > span {
        margin-left: 16px;
      }

      .container {
        flex: 1 auto;
      }

      .content {
        flex: 1 auto;
        display: flex;
        flex-direction: column;
        color: #000;
        background: #fff;
      }

      main {
        margin-top: 64px;
        flex: 1 auto;
      }
    `,
  ],
})
export class AppComponent {
  matSidenavOpened = false;
  name = 'Brian Love';

  toggleMatSidenav(): void {
    this.matSidenavOpened = !this.matSidenavOpened;
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
    ]),
  ],
})
  .then((ref) => {
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
  })
  .catch((err) => console.error(err));
