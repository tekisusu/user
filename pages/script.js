import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../environment/firebaseConfig.js";
import { deleteRow } from "../modules/tabla/deleteRow.js";
import { mostrarModal } from "../modules/mostrarModal.js";
// import { initializeSearch } from "../../modules/searchFunction.js";
import { initScrollButtons } from "../modules/scrollButtons.js";
import { updatePagination, currentPage, itemsPerPage } from "../modules/pagination.js";
import { changeEstadoSelectEvent, changeRoleSelectEvent } from "../modules/tabla/changeSelectEvent.js";
import { changeSemanaSelectEvent } from "../modules/tabla/changeSelectEvent/changeSemanaSelectEvent.js";
import { changeLunesSelectEvent } from "../modules/tabla/changeSelectEvent/change1_LunesSelectEvent.js";
import { changeMartesSelectEvent } from "../modules/tabla/changeSelectEvent/change2_MartesSelectEvent.js";
import { changeMiercolesSelectEvent } from "../modules/tabla/changeSelectEvent/change3_MiercolesSelectEvent.js";
import { changeJuevesSelectEvent } from "../modules/tabla/changeSelectEvent/change4_JuevesSelectEvent.js";
import { changeViernesSelectEvent } from "../modules/tabla/changeSelectEvent/change5_ViernesSelectEvent.js";
import { changeSabadoSelectEvent } from "../modules/tabla/changeSelectEvent/change6_SabadoSelectEvent.js";
import "../modules/downloadToExcel.js";
import "../auth/signup_Form.js";

// Constantes y variables de estado
const tabla = document.getElementById("libreria");
let totalPages;

// Función para mostrar los datos en la tabla
export function mostrarDatos() {
  onValue(ref(database, collection), (snapshot) => {
    tabla.innerHTML = ""; // Limpia la tabla

    const data = [];
    snapshot.forEach((childSnapshot) => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    data.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordena por nombre

    // Paginación
    totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    let filaNumero = startIndex + 1;

    // Mostrar datos de la página actual
    for (let i = startIndex; i < endIndex; i++) {
      const user = data[i];
      const row = `
        <tr>
          <td class="text-center">${filaNumero++}</td>
          <td class="text-center">${user.nombre}</td>
          <td class="text-center">${user.semana}</td>
          <td class="text-center">${user.lunes}</td>
          <td class="text-center">${user.martes}</td>
          <td class="text-center">${user.miercoles}</td>
          <td class="text-center">${user.jueves}</td>
          <td class="text-center">${user.viernes}</td>
          <td class="text-center">${user.sabado}</td>
          <td class="text-center">${user.estado}</td>
        </tr>
      `;
      tabla.innerHTML += row;
    }

    deleteRow(database, collection); // Añade event listeners para eliminación
    updatePagination(totalPages, mostrarDatos);
  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#showModalButton').addEventListener('click', mostrarModal);
  mostrarDatos();
  // initializeSearch(tabla);
  initScrollButtons(tabla);
  changeRoleSelectEvent(tabla, database, collection);
  changeEstadoSelectEvent(tabla, database, collection);
  changeSemanaSelectEvent(tabla, database, collection);
  changeLunesSelectEvent(tabla, database, collection);
  changeMartesSelectEvent(tabla, database, collection);
  changeMiercolesSelectEvent(tabla, database, collection);
  changeJuevesSelectEvent(tabla, database, collection);
  changeViernesSelectEvent(tabla, database, collection);
  changeSabadoSelectEvent(tabla, database, collection);
});

console.log(database);