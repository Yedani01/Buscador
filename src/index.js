import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SweetAlert2 from 'sweetalert2';
import '../dist/public/css/main.css';


const bloqueTexto = document.getElementById('bloque-texto');
const inputPalabra = document.getElementById('in_palabra');
const botonBuscar = document.getElementById('btn_buscar');
const resultado = document.getElementById('resultado');
const botonLimpiar = document.getElementById('btn_limpiar');
const contadorCoincidencias = document.getElementById('contador-coincidencias'); // <-- NUEVO


botonBuscar.addEventListener('click', () => {
    const frase = bloqueTexto.value;
    const palabra = inputPalabra.value;

    if (frase === '' || palabra === '') {
        SweetAlert2.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa una frase y una palabra para buscar.',
        });
        return;
    }

    const regex = new RegExp(`(${palabra})`, 'gi');
    
    
    const matches = frase.match(new RegExp(palabra, 'gi'));
    const numeroCoincidencias = matches ? matches.length : 0;

    contadorCoincidencias.textContent = numeroCoincidencias;
   

  
    const fraseRemarcada = frase.replace(regex, '<mark>$1</mark>');
    resultado.innerHTML = fraseRemarcada;
});

const limpiarResultado = () => {
    resultado.innerHTML = '<p class="text-muted">Aquí aparecerá el texto con la palabra resaltada.</p>';
    contadorCoincidencias.textContent = '0'; 
};

inputPalabra.addEventListener('input', limpiarResultado);
bloqueTexto.addEventListener('input', limpiarResultado);


botonLimpiar.addEventListener('click', () => {
    bloqueTexto.value = '';
    inputPalabra.value = '';
    limpiarResultado(); 
});


inputPalabra.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        botonBuscar.click();
    }
});


bloqueTexto.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        botonBuscar.click();
    }
});