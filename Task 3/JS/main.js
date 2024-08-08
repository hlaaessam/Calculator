class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clearAll();
  }

  clearAll() {
    this.currentOpernad = "";
    this.previousOpernad = "";
    this.operation = undefined;
  }
  deleteElement() {
    this.currentOpernad = this.currentOpernad.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOpernad.includes(".")) return;
    this.currentOpernad = this.currentOpernad.toString() + number.toString();
    console.log(this.currentOpernad);
  }

  selectOPeration(operation) {
    if (this.currentOpernad === "") return;
    if (this.previousOpernad !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOpernad = this.currentOpernad;
    this.currentOpernad = "";
  }

  calculate() {
    let calculation;
    const previous = parseFloat(this.previousOpernad);
    const current = parseFloat(this.currentOpernad);

    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        calculation = previous + current;
        break;

      case "-":
        calculation = previous - current;
        break;

      case "*":
        calculation = previous * current;
        break;

      case "÷":
        calculation = previous / current;
        break;

      case "%":
        calculation = previous % current;
        break;

      default:
        return;
    }

    this.currentOpernad = calculation;
    this.operation = undefined;
    this.previousOpernad = "";
  }

  getNumberOfDisplay(number) {
    const strdigit = number.toString();
    const intDigits = parseFloat(strdigit.split(".")[0]);
    const decimalDigits = strdigit.split(".")[1];

    let integerDisplay;

    if (isNaN(intDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getNumberOfDisplay(
      this.currentOpernad
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getNumberOfDisplay(
        this.previousOpernad
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// html elements
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand ]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand ]"
);

const operationsBtns = document.querySelectorAll("[data-operation]");
const numbersBtns = document.querySelectorAll("[data-number]");

const equalBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");

// new objects
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numbersBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationsBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.selectOPeration(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", (button) => {
  calculator.calculate();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", (button) => {
  calculator.clearAll();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.deleteElement();
  calculator.updateDisplay();
});
