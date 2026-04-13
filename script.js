const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

function updateDisplay(value) {
  display.value = value;
}

function appendValue(value) {
  const currentValue = display.value;

  if (currentValue === "0" && value !== ".") {
    updateDisplay(value);
    return;
  }

  updateDisplay(currentValue + value);
}

function clearDisplay() {
  updateDisplay("0");
}

function deleteLast() {
  const nextValue = display.value.slice(0, -1);
  updateDisplay(nextValue || "0");
}

function calculateResult() {
  try {
    const result = Function(`"use strict"; return (${display.value})`)();
    updateDisplay(String(result));
  } catch (error) {
    updateDisplay("Error");
  }
}

buttons.addEventListener("click", (event) => {
  const target = event.target;

  if (!target.matches("button")) {
    return;
  }

  const { action, value } = target.dataset;

  if (action === "clear") {
    clearDisplay();
    return;
  }

  if (action === "delete") {
    deleteLast();
    return;
  }

  if (action === "calculate") {
    calculateResult();
    return;
  }

  if (display.value === "Error") {
    clearDisplay();
  }

  appendValue(value);
});
