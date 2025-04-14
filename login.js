// Inicializar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxSJ519rvPSpLjBI6xrvitAqjKe2MeP6E",
  authDomain: "control-de-mantenimientos.firebaseapp.com",
  databaseURL: "https://control-de-mantenimientos-default-rtdb.firebaseio.com",
  projectId: "control-de-mantenimientos",
  storageBucket: "control-de-mantenimientos.firebasestorage.app",
  messagingSenderId: "769592271383",
  appId: "1:769592271383:web:922cc59c6fe4466689f252",
  measurementId: "G-Q03BV9X9CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Autenticación
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('correo').value;
  const password = document.getElementById('contrasena').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirige a la página principal
      window.location.href = "index.html";
    })
    .catch((error) => {
      document.getElementById('mensajeError').textContent = "Error: " + error.message;
    });
});
