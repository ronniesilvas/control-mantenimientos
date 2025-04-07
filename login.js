// Inicializar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLGzaeqqam1MhdaNBa4jL8X3pFgAxq7BE",
  authDomain: "control-mantto.firebaseapp.com",
  databaseURL: "https://control-mantto-default-rtdb.firebaseio.com",
  projectId: "control-mantto",
  storageBucket: "control-mantto.firebasestorage.app",
  messagingSenderId: "634547171528",
  appId: "1:634547171528:web:8a20ee90fe01819178b5fd",
  measurementId: "G-ER6CBY2J3Y"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('correo').value;
  const password = document.getElementById('contrasena').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirigir a la página principal
      window.location.href = "index.html";
    })
    .catch((error) => {
      document.getElementById('mensajeError').textContent = "Error al iniciar sesión: " + error.message;
    });
});