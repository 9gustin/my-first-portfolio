function select(idRespuesta){
        let res = idRespuesta.split('-')[0];

        if(document.querySelector(`#btn-${res}`).innerHTML.trim() === 'enviar'){

        document.querySelector(`#${res}-1`).classList.remove('active');
        document.querySelector(`#${res}-2`).classList.remove('active');
        document.querySelector(`#${res}-3`).classList.remove('active');
    
        document.querySelector(`#${idRespuesta}`).classList.add('active');
        document.querySelector(`#${res}`).innerHTML = document.querySelector(`#${idRespuesta}`).innerHTML;
        
    }
}

function error(idRespuesta){
    if(document.querySelector(`#${idRespuesta}`).innerHTML.trim() !== ''
        && document.querySelector(`#btn-${idRespuesta}`).innerHTML.trim() === 'enviar'
    ){
        document.querySelector(`#btn-${idRespuesta}`).style.background = 'red';
        document.querySelector(`#btn-${idRespuesta}`).style.color = 'white';
        document.querySelector(`#btn-${idRespuesta}`).style.opacity = '.7';
        document.querySelector(`#btn-${idRespuesta}`).innerHTML = 'respuesta incorrecta';
        document.querySelector(`#opciones${idRespuesta.replace('res', '')}`).style.display = 'none';
        let nro = parseInt(idRespuesta.replace('res', ''));
        if(nro < 6){ document.querySelector(`#pregunta${ nro+ 1 }`).style.display = 'block'; } 
        else{F();}
    }
}

function F(){
    document.querySelector('#f').style.display = 'block';
    document.querySelector('#f').scrollIntoView();
}