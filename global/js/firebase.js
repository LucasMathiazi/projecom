const firebaseConfig = {
  apiKey: "AIzaSyDBaUB222gAJ_c9HTdH3ZLhYABAuztw0lo",
  authDomain: "list-3ccb7.firebaseapp.com",
  projectId: "list-3ccb7",
  storageBucket: "list-3ccb7.appspot.com",
  messagingSenderId: "121452433684",
  appId: "1:121452433684:web:cb73a71cc5f0ca13743201"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var auth = firebase.auth();

var LOJA, PRODUTO;