import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  public async register(email: string, password: string, role: string): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
      await this.firestore.collection('users').doc(user.uid).set({
        email,
        role,
      });
    }
  }

  public login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  public getCurrentUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      map(user => user ? { uid: user.uid, email: user.email } : null)
    );
  }

  public getUserRole(uid: string): Observable<string | null> {
    return this.firestore
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(map((data: any) => data?.role || null));
  }
}