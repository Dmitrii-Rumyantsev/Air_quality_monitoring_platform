import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Используйте CommonModule
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,        // Замените BrowserModule на CommonModule
    MatSidenavModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'air-quality';
}
