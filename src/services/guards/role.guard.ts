import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

export const roleGuard: CanActivateFn = (route) => {
  const authServ = inject(AuthService);
  const router = inject(Router);

  return authServ.currentUser$.pipe(
    switchMap((user) => {
      if (!user) {
        router.navigate(['/auth']);
        return of(false);
      }
      return authServ.getUserRole(user.uid).pipe(
        switchMap((userRole) => {
          if (userRole.role === 'admin') {
            return of(true);
          } else {
            console.log(userRole.role + 'ist nicht autorisiert')
            router.navigate(['/team']);
            return of(false);
          }
        })
      );
    })
  );
};
