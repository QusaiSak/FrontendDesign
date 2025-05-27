import { Injectable, signal } from '@angular/core';
import { User } from '../component/env.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | undefined | null>(undefined);
  baseUrl = 'http://localhost:5000';


  constructor() { }
}
