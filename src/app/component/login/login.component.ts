import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash, heroLockClosed } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../service/auth.service';
import { User } from '../env.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  viewProviders: [provideIcons({ heroLockClosed ,heroEyeSlash ,heroEye})]
})
export class LoginComponent {
  private http = inject(HttpClient)
  private authservice = inject(AuthService)
  private router = inject(Router)
  errorMessage: string = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit():void {
    this.http.post<{user : User}>(`${this.authservice.baseUrl}/user/login`,this.loginForm.getRawValue()).subscribe({
      next:(res:any)=>{
        localStorage.setItem('token', res.token);
        this.authservice.currentUser.set(res.user);
        this.router.navigateByUrl('');
      },
      error:(error)=>{
        this.errorMessage = error?.error?.message || 'Invalid email or password';
      }
    })
  }
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
