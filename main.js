let botonInput = document.getElementById('botonBusqueda');

function validarInput() {
    let valorInput = document.getElementById('paisBusqueda').value;
    valorInput = valorInput.toLowerCase();
    console.log(valorInput.length)
    if (valorInput.length == 0) {
        console.log('No ha ingresado nada')
    }
    return valorInput
};

function imprimirDatos(dato) {
    bandera.innerHTML = `<img src="${dato[0]}" class="bandera">`
    datos.innerHTML += `<p>Nombre país: ${dato[1]} </p>`
    datos.innerHTML += `<p>Capital del país: ${dato[2]} </p>`
    datos.innerHTML += `<p>Continente país: ${dato[3]} </p>`
    datos.innerHTML += `<p>Número de población: ${dato[4]} </p>`
};

function conseguirValor(valor) {
    let datosPais = [];
    let paisURL = `https://restcountries.com/v3.1/name/${valor}?fullText=true`
    fetch (paisURL)
        .then((response) => response.json())
        .then(data => {
            console.log(data[0])
            // bandera.innerHTML = `<img src="${data[0].flags['svg']}" class="bandera">`

            let bandera = data[0].flags['svg'];
            let nombrePais = data[0].name['common'];
            let capital = data[0].capital[0];
            let region = data[0].region;
            let reputacion = data[0].population;

            datosPais.push(bandera, nombrePais, capital, region, reputacion)
            imprimirDatos(datosPais);
        });
};


botonInput.addEventListener('click', () => {
    let valorInput = validarInput();
    conseguirValor(valorInput);
});
