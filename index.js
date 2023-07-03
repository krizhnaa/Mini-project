const firebaseConfig = {
  apiKey: "AIzaSyBeY2P-0LgcGtOin9HhUmSphS9sr1hl3YQ",
  authDomain: "mini-project-42789.firebaseapp.com",
  databaseURL: "https://mini-project-42789-default-rtdb.firebaseio.com",
  projectId: "mini-project-42789",
  storageBucket: "mini-project-42789.appspot.com",
  messagingSenderId: "1068784374082",
  appId: "1:1068784374082:web:744db14d1976d4f2b6f8db",
  measurementId: "G-4Q7SVERST4"
};
// import { getDatabase, ref, set } from "firebase/database";
// const db = getDatabase();

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
var auth = firebase.auth()
var database = firebase.database()

// Set up our register function
function register() {
  // Get all our input fields
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var full_name = document.getElementById('full_name').value
  // favourite_song = document.getElementById('favourite_song').value
  // milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // DOne
      alert('User Created!!')
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // DOne
      alert('User Logged In!!')
      auth.signInWithEmailAndPassword(email, password)
        .then(function () {
          // Redirect to typing-test.html after successful login
          window.location.href = "menu.html";
        })
        .catch(function (error) {
          // Handle login error
          console.log(error);
        });

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}


