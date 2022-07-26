class Calculator {
  constructor(prevOperandTextEle, currOperandTextEle) {
    this.prevOperandTextEle = prevOperandTextEle;
    this.currOperandTextEle = currOperandTextEle;
    this.clear();
  }

  // Clears the screen
  clear() {
    this.currOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }

  // Deletes a number
  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  // Clicking a number adds it to the screen
  appendNumber(number) {
    if(number === '.' && this.currOperand.includes('.')) {
      // Stops the rest of the code for this function from executing
      return;
    }
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if(this.currOperand === '') {
      // Stops the rest of the code for this function from executing
      return;
    }
    if(this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currOperand);
    if(isNaN(prev) || isNaN(current)) {
      return;
    }
    switch(this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    }
    else {
      return integerDisplay;
    }
  }
 
  updateDisplay() {
    this.currOperandTextEle.innerText = this.getDisplayNumber(this.currOperand);
    if(this.operation != null) {
      this.prevOperandTextEle.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    }
    else {
      this.prevOperandTextEle.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const prevOperandTextEle = document.querySelector('[data-previous-operand]');
const currOperandTextEle = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperandTextEle, currOperandTextEle);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});