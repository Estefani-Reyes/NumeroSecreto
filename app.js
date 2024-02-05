
//Declaracion de variables
let arrYnumeroSortado = [];
let numeroMaximo = 10;
let numeroAleatorio = generarNumeroAleatorio()
let intentos = 0;


//Funcion para cambiar los texto de la web
function ajusteElementoTexto(etiqueta, texto) {
    let elementoTexto = document.querySelector(etiqueta);
    elementoTexto.innerHTML = texto;
    return;

}

function verificarIntentos() {

    let capturarValorDeLinput = parseInt(document.querySelector('#valorDelInput').value);



    if (intentos == 4) {
        ajusteElementoTexto('p', `Perdite, tienes  ${intentos} intentos`);
        document.querySelector('#valorDelInput').setAttribute('disabled', 'true');
        document.querySelector('#reiniciar').removeAttribute('disabled');

    } else {
        if (capturarValorDeLinput === numeroAleatorio) {

            ajusteElementoTexto('p', `Acertaste en el ${intentos} ${intentos === 1 ? 'intento ¡Felicidades!' : 'Intentos ¡Felicidades!'}`);
            document.querySelector('#reiniciar').removeAttribute('disabled');

        } else {

            if (capturarValorDeLinput < numeroAleatorio) {

                ajusteElementoTexto('p', 'El numero secreto es mayor, sigue intentando');

            } else {

                ajusteElementoTexto('p', 'El numero secreto es menor, sigue intentando');
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
    if (numeroAleatorio === verificarIntentos() || intentos == 4) {
        document.querySelector('#valorDelInput').removeAttribute('disabled');
        document.querySelector('#reiniciar').setAttribute('disabled', 'true');
        condicionesIniciales()
    }

}


condicionesIniciales()
