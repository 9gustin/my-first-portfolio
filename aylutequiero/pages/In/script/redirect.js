document.querySelector('#section-cartas').addEventListener('click', gotoCartas);
document.querySelector('#section-galeria').addEventListener('click', gotoGaleria);

function gotoCartas(){
    window.location = '../cartas';
}
function gotoGaleria(){
    window.location = '../galeria';
}
