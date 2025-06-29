import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';       
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';
  name = '';

  loginFailed = false;
  showRegistrationForm = false;  
  showRegisterButton = true;     

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    
    if (!this.username || !this.password) {
      this.loginFailed = true;
      this.showRegistrationForm = true;
      return;
    }

    
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/tasks']);
    } else {
      this.loginFailed = true;
      this.showRegistrationForm = true;
    }
  }

  register() {
    if (!this.name || !this.username || !this.password) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    this.authService.register(this.username, this.password, this.name);
    alert('Sikeres regisztráció! Most már bejelentkezhetsz.');
    this.showRegistrationForm = false;
    this.loginFailed = false;
  }

  openRegistration() {
    this.showRegistrationForm = true;
  }
}



