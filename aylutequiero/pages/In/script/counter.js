const fechaFin = '2019-09-07';
counter();

function counter(){
    let user = sessionStorage.getItem('userAA');
    let diff;
    if(user === 'vagus'){
        diff = 0;
    }
    else{
        let actualDate = parseInt(new Date().getDate());
        diff = (actualDate<8) ? 7 - actualDate : 31 - actualDate + 7; 
    }

//    if(diff === 0){
        document.querySelector('#loadingpage').style.display = 'none';
        document.querySelector('#initpage').style.display = 'block';
    // }
    // else{
    //     document.querySelector('#loadingpage').style.display = 'block';
    //     document.querySelector('#initpage').style.display = 'none';
    // }
    // document.querySelector('#count-dias').innerHTML = diff;
}