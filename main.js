let botonInput = document.getElementById('botonBusqueda');

function validarInput() {
    let valorInput = document.getElementById('paisBusqueda').value;
    valorInput = valorInput.toLowerCase();
    if (valorInput.length == 0) {
        console.log('No ha ingresado nada')
    }
    if (valorInput.length > 3) {
        console.log(valorInput)
    }
    return valorInput
};

function imprimirDatos(datos) {
    datos.forEach(element => {
        console.log(element);
    });
};

function conseguirValor(valor) {
    // let valorInput = document.getElementById('paisBusqueda').value;
    // valorInput = valorInput.toLowerCase();
    let datosPais = [];
    let paisURL = `https://restcountries.com/v3.1/name/${valor}?fullText=true`
    fetch (paisURL)
        .then((response) => response.json())
        .then(data => {
            console.log(data[0])
            // bandera.innerHTML = `<img src="${data[0].flags['svg']}" class="bandera">`
            let bandera = data[0].flags['svg'];
            // console.log(data[0].name['common'])
            let nombrePais = data[0].name['common'];
            // console.log(data[0].capital[0])
            let capital = data[0].capital[0];
            // console.log(data[0].region)
            let region = data[0].region;
            // console.log(data[0].population)
            let reputacion = data[0].population;
            const datosPais = [bandera, nombrePais, capital, region, reputacion]
        });
        
    return datosPais
};

botonInput.addEventListener('click', () => {
    let valorInput = validarInput();    
    let datos = conseguirValor(valorInput);
    imprimirDatos(datos);
});
