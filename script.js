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

const form = document.getElementById('maintenanceForm');
const filtroEquipo = document.getElementById('filtroEquipo');
const exportarBtn = document.getElementById('exportar');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fecha = document.getElementById('fecha').value;
  const equipo = document.getElementById('equipo').value;
  const mntto = document.getElementById('mntto').value;
  const detalle = document.getElementById('detalle').value;

  if (!fecha || !equipo || !mntto || !detalle) return;

  try {
    await db.ref('mantenimientos').push({ fecha, equipo, mntto, detalle });
    form.reset();
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
  }
});

function loadMaintenance(filtro = '') {
  db.ref('mantenimientos').on('value', (snapshot) => {
    const data = snapshot.val();
    const tbody = document.querySelector('#maintenanceTable tbody');
    tbody.innerHTML = '';

    if (!data) return;

    Object.values(data).forEach((registro) => {
      if (!filtro || registro.equipo.toLowerCase().includes(filtro.toLowerCase())) {
        const row = `<tr>
          <td>${registro.fecha}</td>
          <td>${registro.equipo}</td>
          <td>${registro.mntto}</td>
          <td>${registro.detalle}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
      }
    });
  });
}

filtroEquipo.addEventListener('input', () => {
  loadMaintenance(filtroEquipo.value);
});

exportarBtn.addEventListener('click', async () => {
  try {
    const snapshot = await db.ref('mantenimientos').once('value');
    const data = snapshot.val();
    let csv = 'Fecha,Equipo,MTTO,Detalle\n';

    Object.values(data).forEach(r => {
      csv += `${r.fecha},${r.equipo},${r.mntto},${r.detalle}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mantenimientos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al exportar CSV:", error);
  }
});

loadMaintenance();