let botonInput = document.getElementById('botonBusqueda');

function validarInput() {
    let valorInput = document.getElementById('paisBusqueda').value;
    valorInput = valorInput.toLowerCase();
    if (valorInput.length == 0) {
        console.log('No ha ingresado nada')
    }
    return valorInput
};

function mostrarDatosPais(datoPais) {
    bandera.innerHTML = `<img src="${datoPais[0]}" class="bandera">`
    datos.innerHTML += `<div class="alinear"><h4>País: </h4><span>${datoPais[1]}</span></div>`
    datos.innerHTML += `<div class="alinear"><h4>Capital: </h4><span>${datoPais[2]}</span></div>`
    datos.innerHTML += `<div class="alinear"><h4>Continente: </h4><span>${datoPais[3]} </span></div>`
    datos.innerHTML += `<div class="alinear"><h4>Población: </h4><span>${datoPais[4]} </span></div>`
};

function mostrarDatosClima(datoClima) {
    clima.innerHTML += `<div class="alinear"><h4>Horario:</h4><span>${datoClima[0].substring(11)}</span></div>`
    clima.innerHTML +=
        `<div class="alinear"><h4>Descripción clima:</h4>
            <span>
               ${datoClima[4]} <br>
            </span>
        </div>  
            <span>
                <img src = "http:${datoClima[5]}">
            </span>
        `
    let boton = document.getElementById('boton');
    let parrafo = document.getElementById('cambioTemp');
    let spanDato = document.getElementById('cambioTempSpan');
    parrafo.textContent = `Temperatura en C: `
    spanDato.textContent = `${datoClima[1]}°`
    let cambio = true
    if (boton) {
        boton.addEventListener('click', () => {
            cambio = !cambio;
            if (cambio) {
                boton.innerHTML = 'C°'
                parrafo.textContent = `Temperatura en C:`
                spanDato.textContent =`${datoClima[1]}°`
            } else {
                boton.innerHTML = 'F°'
                parrafo.textContent = `Temperatura en F:`
                spanDato.textContent = `${datoClima[2]}°`
            }
        });
    }
};

function conseguirValor() {
    let datosPais = [];
    let climaPais = [];
    // let paisURL = `https://restcountries.com/v3.1/name/${valor}?fullText=true`
    let paisURL = `https://restcountries.com/v3.1/name/germany?fullText=true`
    fetch (paisURL)
        .then((response) => response.json())
        .then(data => {

            let bandera = data[0].flags['svg'];
            let nombrePais = data[0].name['common'];
            let capital = data[0].capital[0];
            let region = data[0].region;
            let reputacion = data[0].population;

            let climaURL = `http://api.weatherapi.com/v1/current.json?key=da6778deeada4cc8ab6172811221805&q=${capital}`;
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

            datosPais.push(bandera, nombrePais, capital, region, reputacion)
            mostrarDatosPais(datosPais);
        })
        .catch((error) => {
            console.log(error)
        })
};

conseguirValor();

// botonInput.addEventListener('click', () => {
//     bandera.innerHTML = ``
//     datos.innerHTML = ``
//     clima.innerHTML =``
//     let valorInput = validarInput();
//     conseguirValor(valorInput);
// });

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