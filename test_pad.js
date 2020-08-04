// JavaScript file for the web page "World Peace Issue Tracker"
// Created by Harrison Kong
// Copyright (C) Coursera 2020

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB4wFn9mka-zfS0zTMtjR-XOFdKc89UJZo",
  authDomain: "coursera-gp-fefff.firebaseapp.com",
  databaseURL: "https://coursera-gp-fefff.firebaseio.com",
  projectId: "coursera-gp-fefff",
  storageBucket: "coursera-gp-fefff.appspot.com",
  messagingSenderId: "981092975365",
  appId: "1:981092975365:web:77484fe0d5882b2f022d6c",
  measurementId: "G-GJ8JFS0J0T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Paste the web app's configuration above this line
// Our code starts below
const rootRef=firebase.database().ref("issues/");
// GET A ROOT REFERENCE to issues HERE (type along)

// Task 3 ------------------------------------------

rootRef.push ({
  description: "Logo does not show up on screen 3",
  resolved: "yes",
  severity: "minor"
});

rootRef.push ({
  description: "Screen flashes on save",
  resolved: "no",
  severity: "moderate"
});

// Task 6 ------------------------------------------

var recordRef = firebase.database().ref("issues/change-me");

recordRef.update ({
   "resolved": "yes"
// });

// Task 7 ------------------------------------------

var recordRef = firebase.database().ref("issues/delete-me");

recordRef.remove()
   .catch(function(error) {
     alert("Delete failed: " + error.message)
   });
