import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'] // исправлено на styleUrls
})
export class AppComponent {
  title = 'air-quality';
}
