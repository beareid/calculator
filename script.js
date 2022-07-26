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
    
  }
  updateDisplay() {
    this.currOperandTextEle.innerText = this.currOperand;
    this.prevOperandTextEle.innerText = this.prevOperand;
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
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
