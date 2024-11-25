import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSidenavModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  isPasswordVisible: boolean = false;
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient){}


  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleSubmit(): void {
    this.http.post('http://localhost:8080/login', { email: this.email, password: this.password }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      response => {
        console.log('Response:', response);
        // Handle success here
      },
      error => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }  
}
