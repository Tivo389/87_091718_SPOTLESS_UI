import ElementFunctions from './elementFunctions.js';

const elf = new ElementFunctions();

class EventFunctions {
  // - Upon click event for pseudoUList
  handleClickSelectList(e, srcOptions, selected) {
    const selectedText = selected.querySelector('p');
    const clickItemValue = e.target.attributes.value;
    let selectedValue = selectedText.attributes.value;
    e.stopPropagation();
    selectedText.textContent = e.target.textContent;
    selectedValue.value = clickItemValue.value;
    srcOptions.forEach((option) => {
      if (option.value === clickItemValue.value) option.selected = true;
    });
  }

  // - Upon click event for pseudoSelectWrapper
  handleClickSelectOne(e, wrapper) {
    wrapper.classList.toggle('active');
  }

  // - Upon click event for numberStepper
  handleClickStepper(e, wrapper) {
    const input = wrapper.querySelector("input[type='number']");
    let minValid;
    let maxValid;
    const stepperAdd = () => {
      minValid = +input.value >= +input.min;
      maxValid = +input.value < +input.max;
      if (minValid && maxValid) input.value = +input.value + 1;
      if (+input.value === +input.max) {
        wrapper.querySelector('.notice').textContent = 'Max. value';
        wrapper.querySelector('.notice').classList.add('active');
      }
    };
    const stepperMinus = () => {
      minValid = +input.value > +input.min;
      maxValid = +input.value <= +input.max;
      if (minValid && maxValid) input.value = +input.value - 1;
      if (+input.value === +input.min) {
        wrapper.querySelector('.notice').textContent = 'Min. value';
        wrapper.querySelector('.notice').classList.add('active');
      }
    };
    switch (e.currentTarget.className.toUpperCase()) {
      case 'STEPPERUP': stepperAdd(); break;
      case 'STEPPERDOWN': stepperMinus(); break;
      default: console.error('handleClickStepper(): Switch Case Error');
    }
  }

  // - Upon input event for text inputs
  handleInput(e, waterForm, allTextInputs) {
    elf.countString(e.currentTarget);
    elf.inputValidation(waterForm, allTextInputs);
  }

  // - Upon focus event for text inputs
  handleFocus(e) {
    e.currentTarget.closest('div').classList.add('active');
  }

  // - Upon blur event for text inputs
  handleBlur(e, waterForm, allTextInputs) {
    if (!e.currentTarget.value.length) e.currentTarget.closest('div').classList.remove('active');
    elf.inputValidation(waterForm, allTextInputs);
  }
}
export default EventFunctions;
