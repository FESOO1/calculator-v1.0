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
        outputState: 0,
    }
};

// HANDLING THE NUMBER KEYS

for (let i = 0; i < numberKeys.length; i++) {
    numberKeys[i].addEventListener('click', () => {
        handlingTheNumberKeys(numberKeys[i].value);
    });
};

function handlingTheNumberKeys(value) {
    if (calculatorObject.input.inputOperator === undefined) {
        if (calculatorObject.input.inputArr1.length < 15) {
            if (calculatorObject.input.inputArr1State === 0) {
                calculatorObject.input.inputArr1 = [];
            };
            calculatorObject.input.inputArr1State = 1;
            
            bottomScreenText.textContent = '';
            calculatorObject.input.inputArr1.push(value);

            const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
            screenText.textContent = outputValue1;
        };
    } else {
        if (calculatorObject.input.inputArr2.length < 15) {
            if (calculatorObject.input.inputArr2State === 0) {
                calculatorObject.input.inputArr2 = [];
            };
            calculatorObject.input.inputArr2State = 1;
            calculatorObject.input.inputArr2.push(value);

            const outputValue2 = calculatorObject.input.inputArr2.join('').replaceAll(',', '');
            screenText.textContent = outputValue2;
        };
    };
    calculatorObject.output.outputState = 0;
};

// HANDLING THE OPERATOR BUTTONS

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', () => {
        handlingTheOperator(operatorButtons[i].value);
    });
};

function handlingTheOperator(value) {
    calculatorObject.input.inputOperator = value;

    // HANDLING THE BOTTOM SCREEN TEXT
    const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
    bottomScreenText.textContent = `${outputValue1} ${calculatorObject.input.inputOperator}`;
};

// DELETING A CHARACTER

function deletingACharacter() {
    if (calculatorObject.output.outputState === 0) {
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
    } else {
        bottomScreenText.textContent = '';
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
    
        calculatorObject.output.outputState = 1;
        
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
            calculatorObject.input.inputArr1State = 1;
            bottomScreenText.textContent = '';
            calculatorObject.input.inputArr1.push('.');
            
            const outputValue1 = calculatorObject.input.inputArr1.join('').replaceAll(',', '');
            screenText.textContent = outputValue1;
        };
    } else {
        if (!calculatorObject.input.inputArr2.includes('.')) {
            calculatorObject.input.inputArr2State = 1;
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
    // NUMBERS
    const numbers = '0123456789';
    if (numbers.includes(e.key)) {
        handlingTheNumberKeys(e.key);
    };

    // OPERATORS
    const operators = '+-*/';
    if (operators.includes(e.key)) {
        handlingTheOperator(e.key);
    };

    // CALCULATE
    if (e.key === 'Enter') {
        calculateTheInputs();
    };

    // DELETING A CHARACTER
    if (e.key === 'Backspace') {
        deletingACharacter();
    };

    // DOT
    if (e.key === '.') {
        addingDot();
    };
});