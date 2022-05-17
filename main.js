let botonInput = document.getElementById('botonBusqueda');

function emptyInput(valor) {
    if (valor.length == 0) {
        console.log('No ha ingresado nada')
    }
    if (valor.length > 3) {
        console.log(valor)
    }
};

function getValue() {
    let valorInput = document.getElementById('paisBusqueda').value;
    valorInput = valorInput.toLowerCase();
    try {
        let paisURL = `https://restcountries.com/v3.1/name/${valorInput}?fullText=true`
        fetch (paisURL)
            .then((response) => response.json())
            .then(data => {
                console.log(data[0])
                bandera.innerHTML = `<img src="${data[0].flags['svg']}" class="bandera">`
                console.log(data[0].name['common'])
                console.log(data[0].capital[0])
                console.log(data[0].population)
            });
    } catch (error) {
        console.log(error)
    }
    return valorInput
};

botonInput.addEventListener('click', () => {
    valor = getValue();
    emptyInput(valor);    
});
