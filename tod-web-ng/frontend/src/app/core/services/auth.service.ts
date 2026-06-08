import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

import { firebaseConfig } from '../../firebase.config';

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  constructor(private router: Router) {
    onAuthStateChanged(firebaseAuth, user => this._user.set(user));
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
    this.router.navigate(['/dashboard']);
  }

  async logout(): Promise<void> {
    await signOut(firebaseAuth);
    this.router.navigate(['/login']);
  }

  async getIdToken(): Promise<string | null> {
    return this._user()?.getIdToken() ?? null;
  }

  isLoggedIn(): boolean {
    return this._user() !== null;
  }
}
