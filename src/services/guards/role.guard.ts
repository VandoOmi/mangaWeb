import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const afAuth = inject(AngularFireAuth);
  const firestore = inject(AngularFirestore);

  const requiredRole = route.data['role'];

  return afAuth.authState.pipe(
    switchMap((user) => {
      if (!user) {
        return of(false);
      }
      return firestore.collection('users').doc(user.uid).valueChanges().pipe(
        map((userData: any) => {
          if (!userData || !userData.role) {
            return false;
          }
          return userData.role === requiredRole;
        })
      );
    })
  );
};