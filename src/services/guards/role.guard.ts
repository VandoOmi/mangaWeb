import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const afAuth = inject(AngularFireAuth);
  const firestore = inject(AngularFirestore);
  const router = inject(Router);
  const requiredRole = route.data['role'];

  return afAuth.authState.pipe(
    switchMap((user) => {
      if (!user) {
        router.navigate(['']);
        return of(false);
      }
      return firestore.collection('users').doc(user.uid).valueChanges().pipe(
        map((userData: any) => {
          if (!userData || !userData.role || userData.role !== requiredRole) {
            router.navigate(['']);
            return false;
          }
          return true;
        })
      );
    })
  );
};
