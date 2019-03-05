import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyBS5fIes8CAerpqL3_7We2sui-aLRbLvx8",
    authDomain: "mtbookclub-1034f.firebaseapp.com",
    databaseURL: "https://mtbookclub-1034f.firebaseio.com",
    projectId: "mtbookclub-1034f",
    storageBucket: "mtbookclub-1034f.appspot.com",
    messagingSenderId: "982244614978"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}

export default Firebase;
