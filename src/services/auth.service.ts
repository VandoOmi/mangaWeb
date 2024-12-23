import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { collectionData, doc, Firestore, addDoc, collection, deleteDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, catchError, from, map, mapTo, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  userRoleCollection = collection(this.firestore, 'user-role');
  private  currentUser = new BehaviorSubject<User | null>(null);

  constructor() {}

  get currentUser$(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getUserRoles(): Observable<UserRoleInterface[]> {
    return collectionData(this.userRoleCollection, {
      idField: 'id'
    }) as Observable<UserRoleInterface[]>;
  }

  getUserRole(id: string) : Observable<UserRoleInterface> {
    const docRef = doc(this.firestore, 'user-role/'+ id);
    const promise = getDoc(docRef);

    return from(promise).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return {
            uid: docSnapshot.id,
            email: data?.['email'] ?? '',
            role: data?.['role'] ?? ''
          } as UserRoleInterface;
        } else {
          throw new Error('Document does not exist');
        }
      })
    );
  }

  getCurrentUserRole() : Observable<UserRoleInterface> {
    const docRef = doc(this.firestore, 'user-role/'+ this.firebaseAuth.currentUser?.uid);
    const promise = getDoc(docRef);

    return from(promise).pipe(
      map((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return {
            uid: docSnapshot.id,
            email: data?.['email'] ?? '',
            role: data?.['role'] ?? ''
          } as UserRoleInterface;
        } else {
          throw new Error('Document does not exist');
        }
      })
    );
  }

  addUserRole(email: string, role: string): Observable<string> {
    const userRoleToCreate = {email, role};
    const promise = addDoc(this.userRoleCollection,userRoleToCreate).then(
      Response => Response.id
    );

    return from(promise).pipe(
      catchError(error => {
        console.error('Error adding user role:', error);
        return throwError(() => new Error('Adding user role failed.'));
      })
    );;
  }

  removeUserRole(id: string) : Observable<void> {
    const docRef = doc(this.firestore, 'user-role/'+ id);
    const promise = deleteDoc(docRef);

    return from(promise);
  }

  updateUserRole(id: string, dataToUpdate: {
    text: string,
    isCompleted: boolean
  }) : Observable<void> {
    const docRef = doc(this.firestore, 'user-role/'+ id);
    const promise = setDoc(docRef,dataToUpdate);

    return from(promise);
  }

  registerUser(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(
      (response) => {
        this.addUserRole(response.user.email!, 'user');
        this.currentUser.next(response.user);
      }
    );

    return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(
      (response) => {
      this.currentUser.next(response.user);
      }
    );

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(
      this.firebaseAuth
    ).then(
      (user) => {
      this.currentUser.next(null);
      }
    )

    return from(promise)
  }
}


export interface UserInterface {
  uid: string,
  email: string,
  username: string
}

export interface UserRoleInterface {
  uid: string,
  email: string
  role: string
}
