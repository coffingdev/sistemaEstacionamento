document.getElementById('formulario').addEventListener('submit',cadastraVeiculo);

function cadastraVeiculo(e){
    let modeloCarro = document.getElementById('modeloCarro').value;
    let placaCarro = document.getElementById('placaCarro').value;
    let time = new Date();

    if(!modeloCarro && !placaCarro){
        alert("Por favor, preencha os campos em branco!");
        return false;
    }

    carro = {
        modelo: modeloCarro,
        placa: placaCarro,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }

    if(localStorage.getItem('patio') === null){
        let carros = [];
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
    }else{
        let carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
    }
    document.getElementById('formulario').reset();

    mostraPatio();

    e.preventDefault();
}

function apagarVeiculo(placa){
    let carros = JSON.parse(localStorage.getItem('patio'));

    for(let i = 0; i < carros.length; i ++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }

        localStorage.setItem('patio', JSON.stringify(carros));
    }

    mostraPatio();
}

function mostraPatio(){
    let carros = JSON.parse(localStorage.getItem('patio'));
    let carrosResultados = document.getElementById('resultados');

    carrosResultados.innerHTML = '';
    for (let i = 0; i < carros.length; i ++){
        let modelo = carros[i].modelo;
        let placa = carros[i].placa;
        let hora = carros[i].hora;
        let minutos = carros[i].minutos;

        carrosResultados.innerHTML += '<tr><td>' + modelo + '</td><td>' + placa + '</td><td>' + hora + ' : ' + minutos + '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\'' + placa + '\');">Excluir</button></td>' + '</tr>';
    }
}