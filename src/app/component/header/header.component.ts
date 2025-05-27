import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../service/auth.service';
import { User } from '../env.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,NgIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [provideIcons({ heroArrowRightOnRectangle })]
})
export class HeaderComponent {
  auth = inject(AuthService)
  http = inject(HttpClient)
  router = inject(Router)

  isLoginPage = false;

  ngOnInit(): void {
    this.http
      .get<User>(`${this.auth.baseUrl}/user/profile`)
      .subscribe({

        next: (response) => {
          this.auth.currentUser.set(response);
        },
        error: () => {
          this.auth.currentUser.set(null);
        },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.auth.currentUser.set(null);
    this.router.navigate(['/login']);
  }

}
