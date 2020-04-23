
const digitSpace = {};

function init(){
    const numberOfDigits = 16;
    const numberSpacing = 4;

    initItems(numberOfDigits, numberSpacing, numberOfDigits);

    document.getElementById("submit").addEventListener("click", ()=>{logValidCreditCardNumbers(numberOfDigits)});

}

function logValidCreditCardNumbers(maxDigits){
    clearDisplay();
    const startArray = findNumbers(maxDigits);
    console.log(startArray);
    bruteCracker(startArray);
}

function findNumbers(maxDigits){
    const biggestIndex = maxDigits - 1;    
    const indexes = arrOf0To(biggestIndex);
    const inputValues = [];
    console.log(digitSpace);
    indexes.forEach(index=>{inputValues.push(digitSpace[index] === undefined ? NaN : digitSpace[index])})
    return inputValues.reverse();
}

function arrOf0To(num, currentIteration = 0, currentArray = []){
    return currentIteration == num + 1 ? currentArray : arrOf0To(num, currentIteration+1 ,[...currentArray,currentIteration])
}

function addToDisplay(toDisplay){
    console.log(toDisplay);
    const outputs = document.getElementById("outputs");
    const newDiv = document.createElement("div");
    newDiv.innerText = toDisplay;
    outputs.appendChild(newDiv);
}

function clearDisplay(){
    const outputs = document.getElementById("outputs");
    outputs.innerHTML = '';
}

//numArray has length numberOfDigits
function bruteCracker(numArray){
    if(isFullyPopulated(numArray)){
        console.log(numArray);
        if(isLuhnValid(numArray)){
            const validNumber = numArray.join('');
            addToDisplay(validNumber);
        } 
        return;
    }

    const indexToIterateOn = getFirstInvalidNumbersIndex(numArray);
    const numberRange = arrOf0To(9);
    
    const numArrayClone = [...numArray];

    numberRange.forEach((num)=>{
        numArrayClone[indexToIterateOn] = num;
        bruteCracker(numArrayClone);
    })
}

function getFirstInvalidNumbersIndex(numArray, index=0){

    //No invalid values
    if(index > numArray.length -1){
        return null;
    }

    //we've found an invalid value
    if(isNaN(numArray[index])){
        return index;
    }

    return getFirstInvalidNumbersIndex(numArray, index + 1);
}

function isFullyPopulated(numArray){
    return getFirstInvalidNumbersIndex(numArray) == null;
}

function isLuhnValid(numArray){
    const doublingParity = isEven(numArray.length);
    const luhnDoublingNumbers  = numArray.map((num, index)=>{
        if(index == numArray.length -1){
            return num;
        }
        const phase2Value = isEven(index) === doublingParity ? doubleAndMerge(num) : num;
        return phase2Value; 
    })

    return sumNums(luhnDoublingNumbers) % 10 === 0;
} 

function sumNums(numArray){
    return numArray.reduce((acc, num)=>{
        return num + acc;
    })
}

function isEven(num){
    return num % 2 === 0
}

function doubleAndMerge(num){
    const double = num * 2;
    return double > 9 ? double - 9 : double; 
}



function initItems(itemsLeft, numberSpacing, originalNumber){

    const inputBar = document.getElementById("inputs");

    if(itemsLeft == 0){
        return;
    }

    const newInput = makeSingleBox(itemsLeft-1);
    inputBar.appendChild(newInput);
    
    if(itemsLeft !== originalNumber-1 && itemsLeft !== 1 && itemsLeft % numberSpacing === 1 ){
        const newHyphen= makeHyphen();
        inputBar.appendChild(newHyphen);
    }

    initItems(itemsLeft-1,numberSpacing, originalNumber);

}

function makeSingleBox(id){
    const newInput = document.createElement("INPUT");
    newInput.setAttribute("type","text");
    newInput.id = id;
    newInput.pattern= "[0-9]*";
    newInput.maxLength= "1";
    newInput.style.width = "1rem"

    newInput.addEventListener("change",(e)=>{
        digitSpace[id] = parseInt(e.currentTarget.value,10);
    });

    return newInput;
}

function makeHyphen(){
    const newHyphen = document.createElement("div");
    newHyphen.innerText = "-";
    return newHyphen;
}


init();
const testArray = [1,NaN,2,NaN,NaN];