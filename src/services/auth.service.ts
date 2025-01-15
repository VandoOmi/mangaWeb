import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { collectionData, doc, Firestore, addDoc, collection, deleteDoc, setDoc, getDoc, getDocs } from '@angular/fire/firestore';
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
    return from(getDocs(this.userRoleCollection)).pipe(
      map((querySnapshot) => {
        const users: UserRoleInterface[] = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data() as UserRoleInterface);
        });
        return users;
      })
    );
  }


  getUserRole(uid: string) : Observable<UserRoleInterface> {
    const docRef = doc(this.firestore, 'user-role/'+ uid);
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

  addUserRole(uid: string, role: string): Observable<void> {
    const userRoleToCreate = {uid,role};
    const docRef = doc(this.firestore, 'user-role', uid);
    const promise = setDoc(docRef, userRoleToCreate);

    return from(promise).pipe(
      catchError(error => {
        console.error('Error adding user role:', error);
        return throwError(() => new Error('Adding user role failed.'));
      })
    );;
  }

  removeRole(uid: string) : Observable<void> {
    const docRef = doc(this.firestore, 'user-role/'+ uid);
    const promise = deleteDoc(docRef);

    return from(promise);
  }

  removeAdminRole(user: UserRoleInterface): Observable<void> {7
    user.role = 'user';
    return this.updateUserRole(user);
  }

  updateUserRole(user: UserRoleInterface) : Observable<void> {
    const data = {email: (user.email),role: (user.role)};
    const docRef = doc(this.firestore, 'user-role/'+ user.uid);
    const promise = setDoc(docRef,data);

    return from(promise);
  }

  registerUser(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(
      (response) => {
        this.addUserRole(response.user.uid!, 'user');
        this.currentUser.next(response.user);
      }
    );

    return from(promise)
  }

  registerAdmin(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(
      (response) => {
        this.addUserRole(response.user.uid!, 'admin');
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
  email: string,
  role: string
}
