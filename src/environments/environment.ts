// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const firebaseConfig = {

//     projectId: "solutions-jacko",
//     appId: "1:84079018765:web:5c8949ffe3a243804d2644",
//     storageBucket: "solutions-jacko.appspot.com",
//     apiKey: "AIzaSyB3SIUSHcNegleULAEM3DTZ1-qX6Gdgtxk",
//     authDomain: "solutions-jacko.firebaseapp.com",
//     messagingSenderId: "84079018765"

// };

const firebaseConfig = {

  apiKey: "AIzaSyDO0YFGtduLJJmfZ-tUZEDA06w0DFG3l8U",

  authDomain: "cafe-bert.firebaseapp.com",

  projectId: "cafe-bert",

  storageBucket: "cafe-bert.firebasestorage.app",

  messagingSenderId: "683238188346",

  appId: "1:683238188346:web:cc47ae20d9d58a6117dc03",

  measurementId: "G-0YV4YB40E1"

};




export const environment = {
  production: false,
  firebase: firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
