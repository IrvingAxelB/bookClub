import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
require("firebase/firestore");

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

        this.auth = app.auth();
        this.db = app.database();
        this.fire = app.firestore();
    }

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // Auth API
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    usersCollection = uid => this.fire.collection("users").doc(uid);
    users = () => this.db.ref('users');
}

export default Firebase;
