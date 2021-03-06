import { Injectable } from '@angular/core';
import {
    Auth,
    signOut,
    signInWithPopup,
    user,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    getAdditionalUserInfo,
    OAuthProvider,
    linkWithPopup,
    unlink,
    updateEmail,
    updatePassword,
    User,
    reauthenticateWithPopup,
    authState,
    onAuthStateChanged,
    updateCurrentUser,
    UserMetadata
} from '@angular/fire/auth';
import {
    collection,
    doc,
    docData,
    DocumentReference,
    CollectionReference,
    Firestore,
    onSnapshot,
    query,
    where,
    Unsubscribe,
    Query,
    DocumentData,
    collectionData,
    collectionChanges,
    docSnapshots,
    setDoc,
    updateDoc,
} from '@angular/fire/firestore';
import { IUser } from '@app/models/user';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

/*
https://dev.to/jdgamble555/angular-12-with-firebase-9-49a0
*/

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private auth: Auth,
        private afs: Firestore,
        private _ntf: NotificationService,
    ) { }

    async login(email: string, password: string): Promise<any> {

        try {
            await signInWithEmailAndPassword(this.auth, email, password);
            return true;
        } catch (error: any) {
            this.errorHandler(error.code);
            return false;
        }
    }

    async register(user: any): Promise<void> {

        let data: IUser = new IUser();

        try {
            const credential = await createUserWithEmailAndPassword(
                this.auth,
                user.email,
                <string>user.password
            );

            let fUser = credential.user;

            data = {
                ...data,
                uid: fUser.uid,
                displayName: user.displayName,
                email: user.email,
                lastLoginAt: fUser.metadata.lastSignInTime,
                createdAt: fUser.metadata.creationTime,
                photoURL: user.photoURL,
                providerId: fUser.providerData[0].providerId
            };

            this.saveUserinDB(data);

            await sendEmailVerification(credential.user);

        } catch (error: any) {
            this.errorHandler(error.code);
        }

    }

    async resetPassword(email: string): Promise<any> {

        // sends reset password email
        await sendPasswordResetEmail(this.auth, email);

    }

    async socialLogin(p: string): Promise<void> {

        const provider = new OAuthProvider(p);
        try {

            const credential = await signInWithPopup(this.auth, provider);
            const additionalInfo: any = getAdditionalUserInfo(credential);
            const fUser: User = credential.user;
            let data: IUser = new IUser();
            let changes: any;

            if (additionalInfo?.isNewUser) {

                data = {
                    ...data,
                    uid: fUser.uid,
                    displayName: <string>fUser.displayName,
                    email: <string>fUser.email,
                    lastLoginAt: fUser.metadata.lastSignInTime,
                    createdAt: fUser.metadata.creationTime,
                    photoURL: <string>fUser.photoURL,
                    providerId: <string>credential.providerId
                };

                this.saveUserinDB(data);

            } else {
                changes = {
                    // ...data,
                    photoURL: additionalInfo.profile.picture,
                    lastSignInTime: fUser.metadata.lastSignInTime,
                }

                let docRef = doc(this.afs, `users/${fUser.uid}`);
                await updateDoc(docRef, changes);

            }

        } catch (error: any) {
            this.errorHandler(error.code);
        }

    }

    async logout() {
        await signOut(this.auth);
    }

    private errorHandler(error: any) {
        console.log("error: ", error);
        this._ntf.open("toast.firebase." + error, "toast.close");
        return of(null);
    }

    get loggedInUser$(): Observable<any> {
        return user(this.auth).pipe(
            switchMap((user: User | null) => user ? docData(doc(this.afs, 'users', user.uid)) as Observable<User | null> : of(null)),
            (tap(user => console.log("Database user: ", user))),
            catchError(this.errorHandler)
        );
    }

    get user$(): Observable<User | null> {
        return user(this.auth).pipe(tap(user => console.log("firebase user: ", user)
        ));
    }

    get isAuthenticated$(): Observable<boolean> {
        return authState(this.auth).pipe(
            map((user: any) => {
                if (user && user != undefined) {
                    console.log("authenticated");
                    return true;

                } else {
                    console.log("NOT authenticated");
                    return false;
                }
            })
        );
    }

    private async saveUserinDB(data: any) {

        let docRef = doc(this.afs, `users/${data.uid}`) // create this document newDoc at this path
        await setDoc(docRef, data);
    }

    async bookmarks(bookmarks: Array<string>) {

        const ref = doc(this.afs, 'users', this.auth.currentUser.uid);

        try {
            await updateDoc(ref, { bookmarks });
        } catch (error) {
            this.errorHandler(error);
        }
    }

}
