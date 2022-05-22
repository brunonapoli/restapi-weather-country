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
    datos.innerHTML += `<p>Nombre país: ${datoPais[1]} </p>`
    datos.innerHTML += `<p>Capital del país: ${datoPais[2]} </p>`
    datos.innerHTML += `<p>Continente país: ${datoPais[3]} </p>`
    datos.innerHTML += `<p>Número de población: ${datoPais[4]} </p>`
};

function mostrarDatosClima(datoClima) {
    clima.innerHTML += `<p> Horario: ${datoClima[0].substring(11)} <br> </p>`
    clima.innerHTML += 
        `<p>
            Descripción clima: ${datoClima[4]} <br>
            <img src = "http:${datoClima[5]}">
        </p>`

    let boton = document.getElementById('boton');
    let parrafo = document.getElementById('cambioTemp');
    parrafo.textContent = `Temperatura en C: ${datoClima[1]}°`
    let cambio = true
    if (boton) {
        boton.addEventListener('click', () => {
            cambio = !cambio;
            if (cambio) {
                boton.innerHTML = 'C°'
                parrafo.textContent = `Temperatura en C: ${datoClima[1]}°`
            } else {
                boton.innerHTML = 'F°'
                parrafo.textContent = `Temperatura en F: ${datoClima[2]}°`
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
        });
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