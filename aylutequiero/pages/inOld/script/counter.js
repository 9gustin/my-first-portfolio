const fechaFin = '2019-09-07';
counter();

function counter(){
    let actualDate = parseInt(new Date().getDate());
    let diff = (actualDate<8) ? 7 - actualDate : 31 - actualDate + 7; 
    
    document.querySelector('#count-dias').innerHTML = diff;
}