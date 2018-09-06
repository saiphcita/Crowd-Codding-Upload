import firebase  from 'firebase/app';
import 'firebase/database';

var config = {}

if(localStorage.getItem("acualInterface") === "1"){
    config = {
        apiKey: "AIzaSyAYStRsZqUp9u5d6uJE2qXEa1A_0QsilWk",
        authDomain: "crowd-codding.firebaseapp.com",
        databaseURL: "https://crowd-codding.firebaseio.com",
        projectId: "crowd-codding",
        storageBucket: "crowd-codding.appspot.com",
        messagingSenderId: "852929625643"
    }
}else if(localStorage.getItem("acualInterface") === "2"){
    config = {
        apiKey: "AIzaSyAIlpA6hA6colHLJZRQhPhJPtsa2cxTNeo",
        authDomain: "crowd-coddingi2.firebaseapp.com",
        databaseURL: "https://crowd-coddingi2.firebaseio.com",
        projectId: "crowd-coddingi2",
        storageBucket: "crowd-coddingi2.appspot.com",
        messagingSenderId: "620217850449"
    }
}else if(localStorage.getItem("acualInterface") === "3"){
    config = {
        apiKey: "AIzaSyCBoAOj04MWr_0EKVvIdV3l7jSK1p_3buU",
        authDomain: "crowd-coddingi3.firebaseapp.com",
        databaseURL: "https://crowd-coddingi3.firebaseio.com",
        projectId: "crowd-coddingi3",
        storageBucket: "crowd-coddingi3.appspot.com",
        messagingSenderId: "83095745342"
    }
}else if(localStorage.getItem("acualInterface") === "4"){
    config = {
        apiKey: "AIzaSyA0ZFxg9hneDtjyXIM8tSE6K0ZrCk1Jhn0",
        authDomain: "crowd-coddingi4.firebaseapp.com",
        databaseURL: "https://crowd-coddingi4.firebaseio.com",
        projectId: "crowd-coddingi4",
        storageBucket: "crowd-coddingi4.appspot.com",
        messagingSenderId: "611683137044"
    }
}else{
    config = {
        apiKey: "AIzaSyCpjc8diXs4dR-4SIT8pPrBJJA6pYtp8lQ",
        authDomain: "crowd-codding-upload.firebaseapp.com",
        databaseURL: "https://crowd-codding-upload.firebaseio.com",
        projectId: "crowd-codding-upload",
        storageBucket: "crowd-codding-upload.appspot.com",
        messagingSenderId: "524418631335"
    }
}

const app = firebase.initializeApp(config);
const db = app.database()


//example user
var dbUser = db

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");

//report
var refReport = db.ref("Report");

export { refGeneralCategory, refGeneralPosts, refAllUsers, dbUser, refReport}