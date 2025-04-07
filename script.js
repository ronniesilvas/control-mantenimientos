const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
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
