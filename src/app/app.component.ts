import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) { }

  // Méthode de navigation
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Méthode pour vérifier si une route est active
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}