
var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database") 

var firebaseConfig = {
  apiKey: "AIzaSyCAk4XMaKb6nbO0WJE1Amb9HwHp3PbC2zU",
  authDomain: "tasks-todo-68699.firebaseapp.com",
  databaseURL: "https://tasks-todo-68699.firebaseio.com",
  projectId: "tasks-todo-68699",
  storageBucket: "tasks-todo-68699.appspot.com",
  messagingSenderId: "746410198104",
  appId: "1:746410198104:web:749c368a3a07a4f4be762d",
  measurementId: "G-4CPMJ5531M"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseDb = firebaseApp.database();
// let firebasbeAnalytics = firebase.analytics();

let firebaseAuth = firebaseApp.auth();

export { firebaseAuth, firebaseDb }