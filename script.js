// Configuración de Firebase
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

document.getElementById('maintenanceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const equipo = document.getElementById('equipo').value;
    const mntto = document.getElementById('mntto').value;
    const detalle = document.getElementById('detalle').value;

    // Agregar a Firebase
    db.ref('mantenimientos').push({ fecha, equipo, mntto, detalle });
    document.getElementById('maintenanceForm').reset();
    loadMaintenance();
});

// Cargar mantenimientos
function loadMaintenance() {
    db.ref('mantenimientos').on('value', (snapshot) => {
        const data = snapshot.val();
        const tbody = document.querySelector('#maintenanceTable tbody');
        tbody.innerHTML = '';
        for (let key in data) {
            const row = `<tr>
                <td>${data[key].fecha}</td>
                <td>${data[key].equipo}</td>
                <td>${data[key].mntto}</td>
                <td>${data[key].detalle}</td>
            </tr>`;
            tbody.innerHTML += row;
        }
    });
}

loadMaintenance();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);