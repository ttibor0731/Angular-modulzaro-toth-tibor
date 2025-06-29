import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly LOGGED_IN_KEY = 'loggedInUser';

  public loggedInUser: { username: string; name: string } | null = null;

  constructor() {
    const storedUser = localStorage.getItem(this.LOGGED_IN_KEY);
    this.loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      this.loggedInUser = { username: user.username, name: user.name };
      localStorage.setItem(this.LOGGED_IN_KEY, JSON.stringify(this.loggedInUser));
      return true;
    }

    return false;
  }

  register(username: string, password: string, name: string): void {
    const users = this.getUsers();
    users.push({ username, password, name });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  isLoggedIn(): boolean {
    return this.getLoggedInUser() !== null;
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem(this.LOGGED_IN_KEY);
  }

  getLoggedInUser(): { username: string; name: string } | null {
    const user = localStorage.getItem(this.LOGGED_IN_KEY);
    return user ? JSON.parse(user) : null;
  }

  private getUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }
}
