var intentos = 2;
const opcionCorrecta = 1;

cargarIntentos();

function cargarIntentos(){
    document.querySelector('#intentos').innerHTML = intentos;
}

function quitarIntento(){
    if(intentos > 0) { 
        intentos = intentos -1;
        cargarIntentos();
    }
}

function elegirOpcion(nroOpcion){
    if(intentos > 0){
        if(nroOpcion === opcionCorrecta){
            document.querySelector('#carta').style.display = 'block';
            document.querySelector('#carta-poker').style.display = 'none';
        }
        else{
            quitarIntento();
            document.querySelector('#carta').style.display = 'none';
            document.querySelector('#carta-poker').style.display = 'block';
        }
    }
    else{
        nointentos();
    }
}
function changeDisplayContent(){
    let content = document.querySelector('#content');
    if(content.classList.contains('mas')){
        content.style.display = 'block';
        content.classList.add('menos');
        content.classList.remove('mas');
    }
    else{
        content.style.display = 'none';
        content.classList.add('mas');
        content.classList.remove('menos');
    }
}

function nointentos(){
    document.querySelector('#nintentos').style.display = 'block';
    document.querySelector('#content').style.display = 'none';
    document.querySelector('#carta-poker').style.display = 'none';
}