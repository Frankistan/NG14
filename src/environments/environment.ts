// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    uploadFolder: "uploads",
    defaultLanguage: "es-ES",
    supportedLanguages: ["en-US", "es-ES"],
    supportedLanguagesEquivalence: [
        { "en-US": "English" },
        { "es-ES": "Español" }
    ],
    firebase: {
        projectId: 'ng14fireblog',
        appId: '1:666659177961:web:e263d7441b9bffc9883778',
        storageBucket: 'ng14fireblog.appspot.com',
        locationId: 'europe-west',
        apiKey: 'AIzaSyC9P9HaXL13KEvjpObGD6hXMofhVi1wrQ4',
        authDomain: 'ng14fireblog.firebaseapp.com',
        messagingSenderId: '666659177961',
        measurementId: 'G-3K3SL7G8NL',
    },
    production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
