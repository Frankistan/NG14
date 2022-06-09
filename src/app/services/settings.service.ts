import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(
        private _db: Firestore,
    ) { }

    get form(): FormGroup {

        return new FormGroup({
            darkTheme: new FormControl(false),
            language: new FormControl('es-ES')
        });

    }

    async save(user: any) {

        let docRef = doc(this._db, `users/${user.uid}`);
        await updateDoc(docRef, user);

    }
}