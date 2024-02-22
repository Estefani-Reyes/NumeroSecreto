function guardarNombre() {
    let nombre = document.querySelector("#nombreJ").value;
    return nombre; // Retorna el valor de la variable 'nombre'
}

//Declaracion de variables
let arrYnumeroSortado = [];
let numeroMaximo = 10;
let numeroAleatorio = generarNumeroAleatorio()
let intentos = 0;
let perdiste = 0;
let intentosRondad = []
let adivinaste = false;
let nombreJugador = guardarNombre();

let botonGuardar = document.querySelector("#guardarNombre");
let inputNombre = document.querySelector("#nombreJ");

let informacion = {
   
    numeros2: arrYnumeroSortado,
    nombre: "" 
};

botonGuardar.addEventListener("click", function() {
  
    let nombre = inputNombre.value;
    linkpiarCampoUsuario2
 
    informacion.nombre = nombre;
    
    // Convertir el objeto a JSON
    let informacionJSON = JSON.stringify(informacion);
    
    // Almacenar en localStorage
    localStorage.setItem('informacion', informacionJSON);
});

//Funcion para cambiar los texto de la web
function ajusteElementoTexto(etiqueta, texto) {
    let elementoTexto = document.querySelector(etiqueta);
    elementoTexto.innerHTML = texto;
    return;

}

function verificarIntentos() {

    let capturarValorDeLinput = parseInt(document.querySelector('#valorDelInput').value);

    if (intentos == 5) {
        ajusteElementoTexto('p', `perdite, tienes  ${intentos} intentos`);
        document.querySelector('#valorDelInput').setAttribute('disabled', 'true');
        document.querySelector('#reiniciar').removeAttribute('disabled');

    } else {
        if (capturarValorDeLinput === numeroAleatorio) {

            ajusteElementoTexto('p', `acertaste en el ${intentos} ${intentos === 1 ? 'intento ¡Felicidades!' : 'Intentos ¡Felicidades!'}`);
            document.querySelector('#reiniciar').removeAttribute('disabled');

        } else {

            if (capturarValorDeLinput < numeroAleatorio) {

                ajusteElementoTexto('p', 'El numero secreto es mayor, sigue intentando');

            } else {

                ajusteElementoTexto('p', 'El numero secrto es menor, sigue intentando');
            }
            linkpiarCampoUsuario()
            intentos++;
        }
        console.log("El numero secreto es " + numeroAleatorio)
    }
    return capturarValorDeLinput;
}


function linkpiarCampoUsuario() {
    let linkpiarCampo = document.querySelector('#valorDelInput');
    linkpiarCampo.onclick = linkpiarCampo.value = "";
}

function linkpiarCampoUsuario2() {
    let linkpiarCamp2= document.querySelector("#nombreJ");

 linkpiarCamp2.onclick = linkpiarCamp2.value="";
}

function generarNumeroAleatorio() {
    let numeroGene = Math.floor(Math.random() * numeroMaximo) + 1;

    //si todos los numeros sorteados superan al numero maximo

    if (arrYnumeroSortado.length == numeroMaximo) {
        ajusteElementoTexto('p', `ya se sortearon todos los numeros posible`);
    }
    // si el numero generado esta incluido en la lista 
    if (arrYnumeroSortado.includes(numeroGene)) {
        return generarNumeroAleatorio()
    } else {
        arrYnumeroSortado.push(numeroGene)
        return numeroGene;
    }
}


function condicionesIniciales() {
    linkpiarCampoUsuario();
    numeroAleatorio = generarNumeroAleatorio()
    intentos = 1;
    ajusteElementoTexto('h1', '¡Juego del numero secreto!');
    ajusteElementoTexto('p', `Introduce un numero del 1 al ${numeroMaximo}`);


}



function reiniciarJuego() {
    if (numeroAleatorio === verificarIntentos() || intentos == 5) {
        document.querySelector('#valorDelInput').removeAttribute('disabled');
        document.querySelector('#puntuacion').removeAttribute('disabled');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
        condicionesIniciales()
    }

}

function mostrarObjetoJson() {
  
    let informacionJSON = localStorage.getItem('informacion');
    
   
    let informacion = JSON.parse(informacionJSON);

    let objetoJsonElement = document.getElementById('objetoJson');
    
   
    objetoJsonElement.textContent = JSON.stringify(informacion, null, 2);
}

function resultadoFinal() {

    mostrarObjetoJson();
   
}
document.getElementById('puntuacion').addEventListener('click', resultadoFinal);

condicionesIniciales()