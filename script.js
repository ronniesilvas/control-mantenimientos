// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = firebase.database();
const auth = firebase.auth();

const form = document.getElementById('maintenanceForm');
const filtroEquipo = document.getElementById('filtroEquipo');
const exportarBtn = document.getElementById('exportar');
const loginSection = document.getElementById('loginSection');
const appSection = document.getElementById('appSection');

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginSection.style.display = 'none';
      appSection.style.display = 'block';
      loadMaintenance();
    })
    .catch((error) => {
      document.getElementById('loginError').textContent = error.message;
    });
}

function logout() {
  auth.signOut().then(() => {
    loginSection.style.display = 'block';
    appSection.style.display = 'none';
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const fecha = document.getElementById('fecha').value;
  const equipo = document.getElementById('equipo').value;
  const mntto = document.getElementById('mntto').value;
  const detalle = document.getElementById('detalle').value;
  db.ref('mantenimientos').push({ fecha, equipo, mntto, detalle });
  form.reset();
});

function loadMaintenance(filtro = '') {
  db.ref('mantenimientos').on('value', (snapshot) => {
    const data = snapshot.val();
    const tbody = document.querySelector('#maintenanceTable tbody');
    tbody.innerHTML = '';
    for (let key in data) {
      const registro = data[key];
      if (!filtro || registro.equipo.toLowerCase().includes(filtro.toLowerCase())) {
        const row = `<tr>
          <td>${registro.fecha}</td>
          <td>${registro.equipo}</td>
          <td>${registro.mntto}</td>
          <td>${registro.detalle}</td>
        </tr>`;
        tbody.innerHTML += row;
      }
    }
  });
}

filtroEquipo.addEventListener('input', () => {
  loadMaintenance(filtroEquipo.value);
});

exportarBtn.addEventListener('click', () => {
  db.ref('mantenimientos').once('value').then((snapshot) => {
    const data = snapshot.val();
    let csv = 'Fecha,Equipo,MTTO,Detalle\n';
    for (let key in data) {
      const r = data[key];
      csv += `${r.fecha},${r.equipo},${r.mntto},${r.detalle}\n`;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'mantenimientos.csv');
    a.click();
  });
});

auth.onAuthStateChanged(user => {
  if (user) {
    loginSection.style.display = 'none';
    appSection.style.display = 'block';
    loadMaintenance();
  } else {
    loginSection.style.display = 'block';
    appSection.style.display = 'none';
  }
});
