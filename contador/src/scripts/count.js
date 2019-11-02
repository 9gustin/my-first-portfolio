//Section: Define vars
//in miliseconds
const xInterval = 1000;
var counter;

//Sub: DateFormat: yyyy-mm-dd hh:mm:ss
var xInitDate = '';
var xFinalDate = '';

//Sub: ToSetDate
//HTML Elements
var eAnios = document.querySelector(`#span-anios`);
var eMeses = document.querySelector(`#span-meses`);
var eDias = document.querySelector(`#span-dias`);
var eHoras = document.querySelector(`#span-horas`);
var eMinutos = document.querySelector(`#span-minutos`);
var eSegundos = document.querySelector(`#span-segundos`);

//Sub: ToWork
var parsedInitDate = undefined;
var parsedFinalDate = undefined;

//Section: Set
function setInitDate(value) { xInitDate = value; }
function setFinalDate(value) { xFinalDate = value; }

//Section: Count
//Se deberia utilizar con un then. Retornara true cuando se haya terminado la cuenta regresiva.
//Si retorna false es porque algo fallo. posiblemente los datos seteados no son validos
async function Count() {
    try {
        if (validarFechas()) {

            let difference = initCount();

            if (difference.years <= 0) {
                ocultarAnio();
                if (difference.months <= 0) {
                    ocultarMeses();
                    if (difference.days <= 0) {
                        ocultarDias();
                        if (difference.hours <= 0) {
                            ocultarHoras();
                        }
                    }
                }
            }
            else { eAnios.innerHTML = difference.years; }

            eMeses.innerHTML = difference.months;
            eDias.innerHTML = difference.days;
            eHoras.innerHTML = difference.hours;
            eMinutos.innerHTML = difference.minutes;
            eSegundos.innerHTML = difference.seconds;

            counter = setInterval(() => { descontar(); }, xInterval);

            return true;
        }
        else {
            return false;
        }
    }
    catch (e) { console.log(e); return false; }

}

function PedirMeses() {
    let anios = parseInt(eAnios.innerHTML.trim());
    if (anios <= 0) {
        return false;
    }
    if (anios <= 1) { ocultarAnio(); }

    eAnios.innerHTML = parseInt(eAnios.innerHTML.trim()) - 1;
    eMeses.innerHTML = parseInt(eMeses.innerHTML.trim()) + 12;

    return true;
}

function PedirDias() {
    let meses = parseInt(eMeses.innerHTML.trim());
    if (meses <= 0) {
        if (!PedirMeses()) {
            clearInterval(counter);
            return false;
        }
    }
    if (meses <= 1) { ocultarMeses(); }

    eMeses.innerHTML = parseInt(eMeses.innerHTML.trim()) - 1;
    eDias.innerHTML = parseInt(eDias.innerHTML.trim()) + new Date().getDaysInMonth();

    return true;
}

function PedirHoras() {
    let dias = parseInt(eDias.innerHTML.trim());
    if (dias <= 0) {
        if (!PedirDias()) {
            clearInterval(counter);
            return false;
        }
    }
    if (dias <= 1) { ocultarDias(); }

    eDias.innerHTML = parseInt(eDias.innerHTML.trim()) - 1;
    eHoras.innerHTML = parseInt(eHoras.innerHTML.trim()) + 24;

    return true;
}

function PedirMinutos() {
    let horas = parseInt(eHoras.innerHTML.trim());
    if (horas <= 0) {
        if (!PedirHoras()) {
            clearInterval(counter);
            return false;
        }
    }
    if (horas <= 1) { ocultarHoras(); }

    eHoras.innerHTML = parseInt(eHoras.innerHTML.trim()) - 1;
    eMinutos.innerHTML = parseInt(eMinutos.innerHTML.trim()) + 60;

    return true;
}

function PedirSegundos() {
    let minutos = parseInt(eMinutos.innerHTML.trim());
    if (minutos <= 0) {
        if (!PedirMinutos()) {
            clearInterval(counter);
            return false;
        }
    }

    eMinutos.innerHTML = parseInt(eMinutos.innerHTML.trim()) - 1;
    eSegundos.innerHTML = parseInt(eSegundos.innerHTML.trim()) + 60;

    return true;
}

function descontar() {
    let sec = parseInt(eSegundos.innerHTML.trim());
    if (sec <= 0) {
        if (!PedirSegundos()) {
            clearInterval(counter);
            return;
        }
    }

    eSegundos.innerHTML = parseInt(eSegundos.innerHTML.trim()) - 1;
}



//Section: privates
//Sub: Validar
function validarFechas() {
    if (!xInitDate || xInitDate.trim() === '') { return false; }
    if (!xFinalDate || xFinalDate.trim() === '') { return false; }

    parsedInitDate = new Date(xInitDate);
    parsedFinalDate = new Date(xFinalDate);

    if (parsedInitDate >= parsedFinalDate) { return false; }

    return true;
}

//Sub: Iniciar contador
function initCount() {
    let xMonths = getMonthDiff();
    let xYear = getYearDiff();

    if (xMonths < 0) {
        xYear = xYear - 1;

        parsedInitDate.setYear(parsedInitDate.getFullYear() + xYear);
        xMonths = 12 - (-xMonths);
    }
    let xDays = getDaysDiff();

    if (xDays < 0) {
        parsedInitDate.addMonths(xMonths - 1);
        xDays = (parsedInitDate.getDaysInMonth() - parsedInitDate.getDate()) + parsedFinalDate.getDate();
    }
    else {
        parsedInitDate.addMonths(xMonths);
    }

    let xHours = getHoursDiff();
    if (xHours < 0) {
        xDays = xDays - 1;
        xHours = xHours + 24;
    }

    let xMinutes = getMinutesDiff();
    if (xMinutes < 0) {
        xHours = xHours - 1;
        xMinutes = xMinutes + 60;
    }

    let xSeconds = getSecondsDiff() - 1; //Delay
    if (xSeconds < 0) {
        xMinutes = xMinutes - 1;
        xSeconds = xSeconds + 60;
    }

    return {
        years: xYear,
        months: xMonths,
        days: xDays,
        hours: xHours,
        minutes: xMinutes,
        seconds: xSeconds
    };
}

//Sub: Calcular diferencias
function getYearDiff() { return parsedFinalDate.getYear() - parsedInitDate.getYear(); }
function getMonthDiff() { return (parsedFinalDate.getMonth() + 1) - (parsedInitDate.getMonth() + 1); }
function getDaysDiff() { return parsedFinalDate.getDate() - parsedInitDate.getDate(); }
function getHoursDiff() { return parsedFinalDate.getHours() - parsedInitDate.getHours(); }
function getMinutesDiff() { return parsedFinalDate.getMinutes() - parsedInitDate.getMinutes(); }
function getSecondsDiff() { return parsedFinalDate.getSeconds() - parsedInitDate.getSeconds(); }


//Sub: Calcular 
Date.isLeapYear = function (year) { return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); };
Date.getDaysInMonth = function (year, month) { return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]; };
Date.prototype.isLeapYear = function () { return Date.isLeapYear(this.getFullYear()); };
Date.prototype.getDaysInMonth = function () { return Date.getDaysInMonth(this.getFullYear(), this.getMonth()); };
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

//Sub: Ocultar
function ocultarAnio() {
    eAnios.parentNode.style.display = 'none';
}
function ocultarMeses() {
    eMeses.parentNode.style.display = 'none';
}
function ocultarDias() {
    eDias.parentNode.style.display = 'none';
}
function ocultarHoras() {
    eHoras.parentNode.style.display = 'none';
}

//Sub: Mostrar
