import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mytask';

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
