// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCyf4ETU19_0WQtK5xP8A-HSKdF7Dv3Mrs",
    authDomain: "mississauga-dolphins-players.firebaseapp.com",
    databaseURL: "https://mississauga-dolphins-players.firebaseio.com",
    projectId: "mississauga-dolphins-players",
    storageBucket: "mississauga-dolphins-players.appspot.com",
    messagingSenderId: "513860704688"
  }
};
