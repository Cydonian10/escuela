// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'escuela-angular-7ca00',
    appId: '1:663565390481:web:1dac9cc042ef487fc0a530',
    storageBucket: 'escuela-angular-7ca00.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCKX19GU0nj4XqC8hH2xiudtAktWbhjZEU',
    authDomain: 'escuela-angular-7ca00.firebaseapp.com',
    messagingSenderId: '663565390481',
  },

  production: false,
  apiUrl: "http://localhost:8000"
  //apiUrl: "https://escuela.herokuapp.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
