import ElementFunctions from './elementFunctions.js';

const elf = new ElementFunctions();

class EventFunctions {
  // - Callback for click event for the number stepper
  handleStepperClick(e) {
    const wrapper = e.currentTarget.closest('.stepperBox');
    const input = wrapper.querySelector("input[type='number']");
    const stepperAdd = () => {
      const minValid = +input.value >= +input.min;
      const maxValid = +input.value < +input.max;
      if (minValid && maxValid) input.value += 1;
      if (+input.value === +input.max) {
        wrapper.querySelector('.notice').textContent = 'Max. value';
        wrapper.querySelector('.notice').classList.add('active');
      }
    };
    const stepperMinus = () => {
      const minValid = +input.value > +input.min;
      const maxValid = +input.value <= +input.max;
      if (minValid && maxValid) input.value -= 1;
      if (+input.value === +input.min) {
        wrapper.querySelector('.notice').textContent = 'Min. value';
        wrapper.querySelector('.notice').classList.add('active');
      }
    };
    switch (e.currentTarget.className.toUpperCase()) {
      case 'STEPPERUP': stepperAdd(); break;
      case 'STEPPERDOWN': stepperMinus(); break;
      default: console.error('handleStepperClick(): Switch Case Error');
    }
  }

  // - Callback for input event
  handleInput(e, waterForm, allTextInputs) {
    elf.countString(e.currentTarget);
    elf.inputValidation(waterForm, allTextInputs);
  }

  // - Callback for focus event
  handleFocus(e) {
    e.currentTarget.closest('div').classList.add('active');
  }

  // - Callback for blur event
  handleBlur(e, waterForm, allTextInputs) {
    if (!e.currentTarget.value.length) e.currentTarget.closest('div').classList.remove('active');
    elf.inputValidation(waterForm, allTextInputs);
  }
}
export default EventFunctions;
