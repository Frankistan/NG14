import { NgModule } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '@env/environment';

/*
https://codigofacilito.com/articulos/deploy-angular-firebase
https://www.positronx.io/deploy-angular-app-to-production-with-firebase-hosting/

*/

@NgModule({
    declarations: [],
    imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
    ]
})
export class CustomFirebaseModule { }
