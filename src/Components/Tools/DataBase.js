import firebase  from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCpjc8diXs4dR-4SIT8pPrBJJA6pYtp8lQ",
    authDomain: "crowd-codding-upload.firebaseapp.com",
    databaseURL: "https://crowd-codding-upload.firebaseio.com",
    projectId: "crowd-codding-upload",
    storageBucket: "crowd-codding-upload.appspot.com",
    messagingSenderId: "524418631335"
};
const app = firebase.initializeApp(config);
const db = app.database()
//example user
var dbUser = db

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");


export { refGeneralCategory, refGeneralPosts, refAllUsers, dbUser}
