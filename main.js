let botonInput = document.getElementById('botonBusqueda');

// API KEY for the weather PI = da6778deeada4cc8ab6172811221805

function validarInput() {
    let valorInput = document.getElementById('paisBusqueda').value;
    valorInput = valorInput.toLowerCase();
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
    let climaPais = [];
    let paisURL = `https://restcountries.com/v3.1/name/${valor}?fullText=true`
    fetch (paisURL)
        .then((response) => response.json())
        .then(data => {
            console.log(data[0])

            let bandera = data[0].flags['svg'];
            let nombrePais = data[0].name['common'];
            let capital = data[0].capital[0];
            let region = data[0].region;
            let reputacion = data[0].population;

            let climaURL = `http://api.weatherapi.com/v1/current.json?key=da6778deeada4cc8ab6172811221805&q=${capital}`;
            fetch(climaURL)
                .then(response => response.json())
                .then(data => {
                    let tempC = data.current.temp_c
                    let tempF = data.current.temp_f
                    let iconClima = data.current.condition.icon
                    let descClima = data.current.condition.text

                    climaPais.push(tempC, tempF, iconClima, descClima)
                })

            datosPais.push(bandera, nombrePais, capital, region, reputacion)
            imprimirDatos(datosPais);
        });
};


botonInput.addEventListener('click', () => {
    bandera.innerHTML = ``
    datos.innerHTML = ``
    let valorInput = validarInput();
    conseguirValor(valorInput);
});
