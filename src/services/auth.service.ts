import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, lastValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Registrierung für normale Benutzer
  async registerUser(email: string, password: string): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
      // Benutzerrolle als 'user' speichern
      await this.firestore.collection('users').doc(user.uid).set({
        email,
        role: 'user'
      });
    }
  }

  // Registrierung für Admins (nur für bestehende Admins erlaubt)
  async registerAdmin(email: string, password: string): Promise<void> {
    const currentUser = await this.afAuth.currentUser;

    if (!currentUser) {
      throw new Error('Nicht autorisiert');
    }

    // Überprüfen, ob der aktuelle Benutzer ein Admin ist
    const userDoc = await this.firestore.collection('users').doc(currentUser.uid).get().pipe(take(1)).toPromise();
    const userData: any = userDoc?.data();

    if (!userData || userData.role !== 'admin') {
      throw new Error('Nur Admins dürfen neue Admins registrieren');
    }

    // Admin-Benutzer erstellen
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
      // Benutzerrolle als 'admin' speichern
      await this.firestore.collection('users').doc(user.uid).set({
        email,
        role: 'admin'
      });
    }
  }

  // Benutzer anmelden
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Benutzer abmelden
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Aktuellen Benutzer abrufen
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      map(user => user ? { uid: user.uid, email: user.email } : null)
    );
  }

  async getCurrentUserRole(): Promise<string | null> {
    const currentUser = await this.afAuth.currentUser;
  
    if (!currentUser) {
      return null;
    }
  
    const userDoc$ = this.firestore.collection('users').doc(currentUser.uid).get();
    const userDoc = await lastValueFrom(userDoc$);
    const userData: any = userDoc?.data();
  
    return userData?.role || null;
  }


  // Benutzerrolle abrufen
  getUserRole(uid: string): Observable<string | null> {
    return this.firestore
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(map((data: any) => data?.role || null));
  }
}
