let botonInput = document.getElementById('botonBusqueda');

function correccionRegion(region) {
    if (region != "Americas") {
        return region
    }
    return region = "América"
};

function mostrarDatosPais(datoPais) {
    pais.innerHTML = `<img src="${datoPais[0]}" class="bandera">`
    pais.innerHTML += `<div class="alinear titulo"><h3>${datoPais[1]}</h3>`
    datos.innerHTML += `<div class="alinear"><h4>Capital: </h4><span>${datoPais[2]}</span></div>`
    datos.innerHTML += `<div class="alinear marginTop"><h4>Continente: </h4><span>${datoPais[3]} </span></div>`
    datos.innerHTML += `<div class="alinear poblacion"><h4>Población: </h4><span>${datoPais[4]} </span></div>`
};

function mostrarDatosClima(datoClima) {
    clima.innerHTML +=
        `
        <div id="temperatura" class="centrarBotones">
            <h4 id="cambioTemp" class="grados"></h4>
            <span id="cambioTempSpan"></span>

            <ul id="boton" class="botonCambio">
                <li class="icon unidad">
                <span id="palabraTemperatura" class="tooltip">Celcius</span>
                <span id="letraTemperatura">${datoClima[1]}°</span>
                </li>
            </ul>

        </div>
        <div class="alinear marginTop" style= "margin-top: 0px"><h4>Horario:</h4>
            <span>${datoClima[0].substring(11)}</span>
        </div>
        <div class="imagenClima">
            <h4>Clima:</h4>
            <span>
               ${datoClima[4]} <br>
            </span>
            <img src = "http:${datoClima[5]}">
        </div>
        `
    let boton = document.getElementById('boton');
    let parrafo = document.getElementById('cambioTemp');
    parrafo.textContent = `Temperatura: `
    let cambio = true
    if (boton) {
        boton.addEventListener('click', () => {
            cambio = !cambio;
            if (cambio) {
                letraTemperatura.innerHTML = `${datoClima[1]}°`
                palabraTemperatura.innerHTML = 'Celcius'
            } else {
                letraTemperatura.innerHTML = `${datoClima[2]}°`
                palabraTemperatura.innerHTML = 'Fahrenheit'
            }
        });
    }
};

function conseguirValor() {
    let valorInput = document.getElementById('paisBusqueda').value;
    valorInput = valorInput.toLowerCase();
    let datosPais = [];
    let climaPais = [];
    let paisURL = `https://restcountries.com/v3.1/name/${valorInput}?fullText=true`
    // let paisURL = `https://restcountries.com/v3.1/name/germany?fullText=true`
    fetch (paisURL)
        .then((response) => response.json())
        .then(data => {

            let bandera = data[0].flags['svg'];
            let nombrePais = data[0].name['common'];
            let capital = data[0].capital[0];
            let region = data[0].region;
            let reputacion = data[0].population;

            let climaURL = `https://api.weatherapi.com/v1/current.json?key=da6778deeada4cc8ab6172811221805&q=${capital}`;
            fetch(climaURL)
                .then(response => response.json())
                .then(data => {
                    let horario = data.location.localtime
                    let tempC = data.current.temp_c
                    let tempF = data.current.temp_f
                    let viento = data.current.wind_dir
                    let descClima = data.current.condition.text
                    let iconClima = data.current.condition.icon

                    climaPais.push(horario, tempC, tempF, viento, descClima, iconClima)
                    mostrarDatosClima(climaPais)
                })
                .catch((error) =>{
                    console.log(error)
                    pais.innerHTML = `<h4>Ha ocurrido un error. Vuelva a intentarlo.</h4>`
                    setTimeout(() => {pais.innerHTML = ``}, 1500);
                })
            region = correccionRegion(region)
            datosPais.push(bandera, nombrePais, capital, region, reputacion)
            mostrarDatosPais(datosPais);
        })
        .catch((error) => {
            console.log(error)
            if (valorInput.length == 0) {
                pais.innerHTML = `<h4>No ha ingresado nada</h4>`
                setTimeout(() => {pais.innerHTML = ``}, 1500);
                console.log('No ha ingresado nada.')
            } else {
                pais.innerHTML = `<h4>País no encontrado.</h4>`
                setTimeout(() => {pais.innerHTML = ``}, 1500);
            }
        })
};

// conseguirValor();

botonInput.addEventListener('click', () => {
    pais.innerHTML = ``
    datos.innerHTML = ``
    clima.innerHTML =``
    conseguirValor();
});

//FUNCIÓN PARA TRABAJAR CON LAS 2 APIS A LA VEZ
// function conseguirValor() {
//     let urls = [
//         `https://restcountries.com/v3.1/name/United Kingdom?fullText=true`,
//         `http://api.weatherapi.com/v1/current.json?key=da6778deeada4cc8ab6172811221805&q=London`
//       ]
//       let requests = urls.map(url => fetch(url));
//       Promise.all(requests)
//         // map array of responses into an array of response.json() to read their content
//         .then(responses => Promise.all(responses.map(r => r.json())))
//         // all JSON answers are parsed: "users" is the array of them
//         .then(datos => {
//             console.log(datos)
//         })
// };