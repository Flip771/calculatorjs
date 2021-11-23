const disp1 = document.querySelector('.display1');
const disp2 = document.querySelector('.display2');
const disp3 = document.querySelector('.display3');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clearAll = document.querySelector('.all-clear');
const clearLast = document.querySelector('.last-clear');


let display1Num = '';
let display2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;


numbers.forEach(number => listenerCreateNum(number));
operations.forEach(operator => listenerCreateOp(operator));

equal.addEventListener('click', (e) => {

    if (!display1Num || !display2Num) return;

    haveDot = false;
    mathOperation();
    clearVar();
    disp2.innerText = result;
    disp3.innerText = '';
    display2Num = result;
    display1Num = '';

});


clearAll.addEventListener('click', (e) => {

    disp1.innerText = '0';
    disp2.innerText = '0';
    disp3.innerText = '0';
    display1Num = '';
    display2Num = '';
    result = '';
});


clearLast.addEventListener('click', (e) => {

    disp2.innerText = '0';
    display2Num = '';

});

window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.') {
        clickButtonEl(e.key);
    } else if (

        e.key === '+' ||
        e.key === '-' ||
        e.key === '%' ||
        e.key === '/') {
        clickOperation(e.key);
    } else if (e.key === '*') {
        clickOperation('x');
    } else if (e.key === 'Enter' || e.key === "=") {
        clickEqual();
    } else if (e.key === 'Backspace') {
        clickBack();
    }
});


function clickBack() {

    disp2.innerText = disp2.innerText.substr(0, disp2.innerText.length - 1);
    display2Num = disp2.innerText;

}

function clickButtonEl(key) {

    numbers.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })

}

function clickOperation(key) {

    operations.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })

}

function clickEqual() {
    equal.click();
}









function listenerCreateNum(number) {
    number.addEventListener('click', (e) => {

        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;

        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }

        display2Num += e.target.innerText;
        disp2.innerText = display2Num;

    });
}


function listenerCreateOp(operator) {
    operator.addEventListener('click', (e) => {

        if (!display2Num) { return; }

        haveDot = false;
        const operationName = e.target.innerText;
        if (display1Num && display2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(display2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;


    });
}



function clearVar(name = '') {
    display1Num += display2Num + ' ' + name + ' ';
    disp1.innerText = display1Num;
    disp2.innerText = '';
    display2Num = '';
    disp3.innerText = result;
}



function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(display2Num);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(display2Num);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(display2Num);
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(display2Num);
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(display2Num);
    }
}