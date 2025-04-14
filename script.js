// SCREEN TEXT
const screenText = document.querySelector('.main-calculator-screen-text');
const bottomScreenText = document.querySelector('.main-calculator-screen-bottom-text');

// NUMBER KEYS
const numberKeys = document.querySelectorAll('.main-calculator-keyboard-button-number');

// OPERATOR BUTTONS
const operatorButtons = document.querySelectorAll('.main-calculator-keyboard-button-operator');

// OTHER BUTTONS
const deleteButton = document.querySelector('#deleteButton');
const dotButton = document.querySelector('#dotButton');
const resetButton = document.querySelector('#resetButton');
const calculateButton = document.querySelector('#calculateButton');

// CALCULATOR OBJECT
const calculatorObject = {
    input: {
        inputArr1: [0],
        inputArr1State: 0,
        inputOperator: undefined,
        inputArr2: [0],
        inputArr2State: 0,
    },
    output: {
        outputText: undefined,
    }
};

// HANDLING THE NUMBER KEYS

for (let i = 0; i < numberKeys.length; i++) {
    numberKeys[i].addEventListener('click', () => {
        if (calculatorObject.input.inputOperator === undefined) {
            if (calculatorObject.input.inputArr1State === 0) {
                calculatorObject.input.inputArr1 = [];
            };
            calculatorObject.input.inputArr1State = 1;
            
            bottomScreenText.textContent = '';
            calculatorObject.input.inputArr1.push(numberKeys[i].value);

            const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
            screenText.textContent = outputValue1;
        } else {
            if (calculatorObject.input.inputArr2State === 0) {
                calculatorObject.input.inputArr2 = [];
            };
            calculatorObject.input.inputArr2State = 1;
            calculatorObject.input.inputArr2.push(numberKeys[i].value);

            const outputValue2 = calculatorObject.input.inputArr2.join('').replaceAll(',', '');
            screenText.textContent = outputValue2;
        };
    });
};

// HANDLING THE OPERATOR BUTTONS

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        calculatorObject.input.inputOperator = operatorButtons[i].value;

        // HANDLING THE BOTTOM SCREEN TEXT
        const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
        bottomScreenText.textContent = `${outputValue1} ${calculatorObject.input.inputOperator}`;
    });
};

// DELETING A CHARACTER

function deletingACharacter() {
    if (calculatorObject.input.inputOperator === undefined) {
        if (calculatorObject.input.inputArr1.length > 1) {
            calculatorObject.input.inputArr1.pop();
            const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
            screenText.textContent = outputValue1;
        } else {
            calculatorObject.input.inputArr1 = [0];
            const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
            screenText.textContent = outputValue1;
        };
    } else {
        if (calculatorObject.input.inputArr2.length > 1) {
            calculatorObject.input.inputArr2.pop();
            const outputValue2 = calculatorObject.input.inputArr2.join('').replaceAll(',', '');
            screenText.textContent = outputValue2;
        } else {
            calculatorObject.input.inputArr2 = [0];
            const outputValue2 = calculatorObject.input.inputArr2.join('').replaceAll(',', '');
            screenText.textContent = outputValue2;
        };
    };
};

// CALCULATE THE INPUTS

function calculateTheInputs() {
    if (calculatorObject.output.outputText === undefined && calculatorObject.input.inputOperator !== undefined) {
        const output = () => {
            const outputValue1 = Number(calculatorObject.input.inputArr1.join('').replaceAll(',', ''));
            const outputValue2 = Number(calculatorObject.input.inputArr2.join('').replaceAll(',', ''));

            console.log(outputValue1, outputValue2);
            const operator = calculatorObject.input.inputOperator;
            switch (operator) {
                case '+':
                    return outputValue1 + outputValue2;
                    break;
                case '-':
                    return outputValue1 - outputValue2;
                    break;
                case '*':
                    return outputValue1 * outputValue2;
                    break;
                case '/':
                    return outputValue1 / outputValue2;
                    break;
            };
        };
    
        
        // OUTPUT TEXT
        calculatorObject.output.outputText = output();
        screenText.textContent = output();  
        
        // HANDLING THE BOTTOM SCREEN TEXT
        const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
        const outputValue2 = calculatorObject.input.inputArr2.join('').replaceAll(',', '');
        bottomScreenText.textContent = `${outputValue1} ${calculatorObject.input.inputOperator} ${outputValue2} = `;
    
    
        // RESETTING EVERYTHING
        resettingEverything();
    };
};

// RESETTING EVERYTHING
function resettingEverything() {
    calculatorObject.input.inputArr1 = [0];
    calculatorObject.input.inputArr1State = 0;
    calculatorObject.input.inputOperator = undefined,
    calculatorObject.input.inputArr2State = 0;
    calculatorObject.input.inputArr2 = [0];
    calculatorObject.output.outputText = undefined;
};

// ADDING DOT

function addingDot() {
    if (calculatorObject.input.inputOperator === undefined) {
        if (!calculatorObject.input.inputArr1.includes('.')) {
            bottomScreenText.textContent = '';
            calculatorObject.input.inputArr1.push('.');

            const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
            screenText.textContent = outputValue1;
        };
    } else {
        if (!calculatorObject.input.inputArr2.includes('.')) {
            bottomScreenText.textContent = '';
            calculatorObject.input.inputArr2.push('.');

            const outputValue2 = calculatorObject.input.inputArr2.join('').replaceAll(',', '');
            screenText.textContent = outputValue2;
        };
    };
};

// RESET FUNCTION

function resetFunction() {
    resettingEverything();
    bottomScreenText.textContent = '';
    const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
    screenText.textContent = outputValue1;
};

// INITIALIZING THE BUTTONS
deleteButton.addEventListener('click', deletingACharacter);
calculateButton.addEventListener('click', calculateTheInputs);
dotButton.addEventListener('click', addingDot);
resetButton.addEventListener('click', resetFunction);

window.addEventListener('keydown', e => {
    const numbers = '0123456789';

    if (numbers.includes(e.key)) {
        if (calculatorObject.input.inputOperator === undefined) {
            if (calculatorObject.input.inputArr1State === 0) {
                calculatorObject.input.inputArr1 = [];
            };
            calculatorObject.input.inputArr1State = 1;
            
            bottomScreenText.textContent = '';
            calculatorObject.input.inputArr1.push(e.key);

            const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
            screenText.textContent = outputValue1;
        } else {
            if (calculatorObject.input.inputArr2State === 0) {
                calculatorObject.input.inputArr2 = [];
            };
            calculatorObject.input.inputArr2State = 1;
            calculatorObject.input.inputArr2.push(e.key);

            const outputValue2 = calculatorObject.input.inputArr2.join('').replaceAll(',', '');
            screenText.textContent = outputValue2;
        };
    };
});