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

const rootRef = firebase.database().ref('issues/');

// Task 4 ------------------------------------------

rootRef.on("value",

  (snapshot) => {
    const listTableBody = document.getElementById("list-table-body");

    // clear all the table rows first
    listTableBody.textContent = "";

    snapshot.forEach((child) => {
      issue = child.val();
      //console.log(issue);
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + issue.severity + "</td><td>" + issue.description + "</td><td>" +

        "<select onchange='updateIssue(\"" + child.key + "\", this.value)'>" +
        "<option value='no'" + (issue.resolved=="no" ? " selected" : "") + ">no</option>" +
        "<option value='yes'" + (issue.resolved=="yes" ? " selected" : "") + ">yes</option>" +
      "</select>"

      + "</td>"+
      "<td><input type='button' class='btn btn-danger' value='X' onclick='deleteIssue(\"" + child.key + "\")'/></td>";

      listTableBody.append(row);
    });

  },

  (error) => {
    console.log("Error: " + error.code);
  }

);

// Task 5 ------------------------------------------

function addNewIssue() {
  const severity = document.getElementById("severity-dropdown").value;
  const description = document.getElementById("description-textfield").value;
  const resolved = document.getElementById("resolved-dropdown").value;

  if (description.length == 0) {
    alert("Description cannot be blank!");
    return;
  }

  // Add code to insert into firebase here
  rootRef.push ({
    description: description,
    resolved: resolved,
    severity: severity
  });

  document.getElementById("description-textfield").value="";
}

// Task 6 ------------------------------------------

function updateIssue(issueKey, newResolvedValue) {
  var recordRef = firebase.database().ref("issues/"+issueKey);

  recordRef.update ({
     "resolved": newResolvedValue
   });
 }

// Task 7 ------------------------------------------

function deleteIssue(issueKey) {
  if (confirm("Are you sure?")) {
    var recordRef = firebase.database().ref("issues/"+issueKey);

    recordRef.remove()
       .catch(function(error) {
         alert("Delete failed: " + error.message)
       });
  }
}

// Utility function to encode special HTML characters so that the
// web browser does not treat them as HTML tags
// but as literal characters

function encodeHtml(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/ /g, '&nbsp;');
  return str;
}
