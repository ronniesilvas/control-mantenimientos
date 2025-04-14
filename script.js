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

const db = firebase.database();
const auth = firebase.auth();

// Cargar equipos desde Firebase
function loadEquipos() {
  const equipoSelect = document.getElementById('equipo');
  db.ref('equipos').on('value', (snapshot) => {
    equipoSelect.innerHTML = ''; // Limpiar opciones previas
    snapshot.forEach((childSnapshot) => {
      const equipo = childSnapshot.val();
      const option = document.createElement('option');
      option.value = childSnapshot.key;  // El ID único del equipo
      option.textContent = equipo.nombre;
      equipoSelect.appendChild(option);
    });
  });
}

// Agregar equipo a Firebase
function addEquipo(nombre, tipo) {
  const equipoRef = db.ref('equipos').push();  // push() genera un ID único
  equipoRef.set({
    nombre: nombre,
    tipo: tipo
  });
}

// Agregar mantenimiento a Firebase
document.getElementById('maintenanceForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const fecha = document.getElementById('fecha').value;
  const equipoId = document.getElementById('equipo').value;
  const mntto = document.getElementById('mntto').value;
  const detalle = document.getElementById('detalle').value;

  // Guardar el mantenimiento en la base de datos
  const mantenimientoRef = db.ref('mantenimientos').push();
  mantenimientoRef.set({
    equipoId: equipoId,
    fecha: fecha,
    mntto: mntto,
    detalle: detalle
  });
});
