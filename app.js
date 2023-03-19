"use strict";
let currentNum = "";
let previousNum = "";
let operator = "";
let swapped = false;
let deleteOperator = false; 

let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let display = document.querySelector('.display');
let equals = document.querySelector('.evaluate');
let fullClear = document.querySelector('.fullReset');
let clear = document.querySelector('.reset');

numbers.forEach(num => num.addEventListener('click', event => append(num.textContent)));
operators.forEach(op => op.addEventListener('click', event => storeOperator(op.textContent)));
equals.addEventListener('click', event => evaluate());
fullClear.addEventListener('click', event => clearDisplay());
clear.addEventListener('click', event => backspace());

function storeOperator(value){
    operator = value;
    drawDisplay();
}

function append(value){
    if(operator != "" && swapped == false){
        previousNum = currentNum;
        swapped = true;
        currentNum = "";
        currentNum = currentNum + value;
    }else if(operator != ''){
        currentNum = currentNum + value;
    }else{
        currentNum = currentNum + value;
    }
    drawDisplay();
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return Math.round(a*b * 100) / 100;
}

function divide(a,b){
    return Math.round(a/b * 100) / 100;
}

function evaluate(){
    switch(operator){
        case '+':
            currentNum = add(+previousNum, +currentNum);
            break;
        case '-':
            currentNum = subtract(+previousNum, +currentNum);
            break;
        case 'x':
            currentNum = multiply(+previousNum, +currentNum);
            break;
        case '/':
            currentNum = divide(+previousNum, +currentNum);
            break;
    }
    cleanUpAfterEvaluation();
}

function clearDisplay(){
    currentNum = '';
    cleanUpAfterEvaluation();
}
function cleanUpAfterEvaluation(){
    operator = '';
    previousNum = '';
    swapped = false;
    deleteOperator = false;
    drawDisplay();
}

function drawDisplay(){
        if(swapped == true){
            display.textContent = `${previousNum} ${operator} ${currentNum}`;
        }else if(!isFinite(currentNum)){
            display.textContent = "Divding by 0 is forbidden";
        }else{
            display.textContent = `${currentNum} ${operator} ${previousNum}`;
        }
}

function backspace(){
    if(currentNum){
        let temp = currentNum.slice(0,-1);
        currentNum = temp;
    }
    if(currentNum.length == 0 && !operator){
        let temp = previousNum.slice(0,-1);
        previousNum = temp;
    }
    if(operator && deleteOperator == true){
        operator = '';
        swapped = false;
        deleteOperator = false;
    }
    if(currentNum.length == 0){
        deleteOperator = true;
    }
    drawDisplay();
}