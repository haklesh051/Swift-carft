// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login / Signup logic
const loginBtn = document.getElementById("loginBtn");
const userDashboardBtn = document.getElementById("userDashboardBtn");
const adminDashboardBtn = document.getElementById("adminDashboardBtn");

loginBtn.addEventListener("click", () => {
  const email = prompt("Enter Email:");
  const password = prompt("Enter Password:");

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login Success!");
    })
    .catch((err) => {
      if(err.code === 'auth/user-not-found') {
        auth.createUserWithEmailAndPassword(email, password)
          .then(() => alert("Account Created! Logged in"))
      } else {
        alert(err.message);
      }
    });
});

// Check user role and show dashboard buttons
auth.onAuthStateChanged(user => {
  if(user){
    loginBtn.style.display = "none";
    userDashboardBtn.style.display = "inline-block";
    db.collection("users").doc(user.uid).get().then(doc => {
      if(doc.exists && doc.data().role === "admin"){
        adminDashboardBtn.style.display = "inline-block";
      }
    });
  } else {
    loginBtn.style.display = "inline-block";
    userDashboardBtn.style.display = "none";
    adminDashboardBtn.style.display = "none";
  }
});
