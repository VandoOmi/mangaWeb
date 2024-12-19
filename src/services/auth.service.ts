import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { collectionData, doc, Firestore, addDoc, collection, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore/lite';
import { Observable, from, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  userRoleCollection = collection(this.firestore, 'user-role');

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

  addUserRole(email: string, role: string): Observable<string> {
    const userRoleToCreate = {email, role};
    const promise = addDoc(this.userRoleCollection,userRoleToCreate).then(
      Response => Response.id
    );

    return from(promise);
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
    ).then(Response => updateProfile(Response.user, {displayName: username}));

    return from(promise);
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
