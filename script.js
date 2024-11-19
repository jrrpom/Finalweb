const usuario = JSON.parse(localStorage.getItem('usuario'));

if (usuario) {
    document.getElementById('bienvenida').textContent = '¡Bienvenido, ' + usuario.nombre + '!';
    document.getElementById('form-actividades').style.display = 'block';
    document.getElementById('bloqueo').style.display = 'none';  
} else {
    document.getElementById('bloqueo').style.display = 'block';
    document.getElementById('form-actividades').style.display = 'none';  
}

const tipoSelect = document.getElementById('tipo');
const detallesDiv = document.getElementById('detalles');

tipoSelect.addEventListener('change', actualizarFormulario);

function actualizarFormulario() {
    const tipo = tipoSelect.value;
    let html = '';
    if (tipo === 'ejercicio') {
        html = `
            <label for="duracion">Duración (minutos):</label>
            <input type="number" id="duracion" name="duracion" required>
        `;
    } else if (tipo === 'dieta') {
        html = `
            <label for="alimentos">Alimentos Consumidos:</label>
            <textarea id="alimentos" name="alimentos" required></textarea>
        `;
    } else if (tipo === 'sueño') {
        html = `
            <label for="horas">Horas de Sueño:</label>
            <input type="number" id="horas" name="horas" required>
        `;
    }

    detallesDiv.innerHTML = html;
}

actualizarFormulario();

document.getElementById('form-actividades').addEventListener('submit', function(event) {
    event.preventDefault();

    const tipo = tipoSelect.value;
    const detalle = detallesDiv.querySelector('input, textarea').value;

    if (!detalle) {
        alert('Por favor, completa los detalles de la actividad.');
        return;
    }

    let actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    actividades.push({ tipo, detalle });
    localStorage.setItem('actividades', JSON.stringify(actividades));

    cargarActividades();
});


function cargarActividades() {
    const actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; 

    actividades.forEach((actividad, index) => {
        const fila = document.createElement('tr');

        const columnaTipo = document.createElement('td');
        columnaTipo.textContent = actividad.tipo;

        const columnaDetalle = document.createElement('td');
        columnaDetalle.textContent = actividad.detalle;

        const columnaFecha = document.createElement('td');
        columnaFecha.textContent = new Date().toLocaleDateString(); 

        const columnaAccion = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = function() {
            eliminarActividad(index);
        };

        columnaAccion.appendChild(botonEliminar);

        fila.appendChild(columnaTipo);
        fila.appendChild(columnaDetalle);
        fila.appendChild(columnaFecha);
        fila.appendChild(columnaAccion);

        cuerpoTabla.appendChild(fila);
    });
}


function eliminarActividad(index) {
    let actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    actividades.splice(index, 1);
    localStorage.setItem('actividades', JSON.stringify(actividades));
    cargarActividades();  
}


document.addEventListener('DOMContentLoaded', cargarActividades);
