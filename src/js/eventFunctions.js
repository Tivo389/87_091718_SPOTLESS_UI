import ElementFunctions from './elementFunctions.js';

const elf = new ElementFunctions();

class EventFunctions {
  // - Upon click event for pseudoUList
  handleClickSelectList(e) {
    const elParent = e.currentTarget.closest('form.waterForm');
    const realSelect = elParent.querySelector('select');
    const realOptions = realSelect.querySelectorAll('option');
    const wrapper = e.currentTarget.closest('.pseudoSelectWrapper');
    const selectedItem = wrapper.querySelector('.pseudoSelected');
    const selectedItemText = selectedItem.querySelector('p');
    const clickItemValue = e.target.attributes.value;
    let selectedItemValue = selectedItemText.attributes.value;
    e.stopPropagation();
    selectedItemText.textContent = e.target.textContent;
    selectedItemValue.value = clickItemValue.value;
    realOptions.forEach((option) => {
      if (option.value === clickItemValue.value) option.selected = true;
    });
  }
  // - Upon click event for pseudoSelectBtn
  handleClickSelectOne(e) {
    const wrapper = e.currentTarget.closest('.pseudoSelectWrapper');
    const list = wrapper.querySelector('.pseudoSelectList');
    wrapper.classList.toggle('active');
  }
  // - Upon click event for numberStepper
  handleClickStepper(e) {
    const wrapper = e.currentTarget.closest('.stepperBox');
    const input = wrapper.querySelector("input[type='number']");
    const stepperAdd = () => {
      const minValid = +input.value >= +input.min;
      const maxValid = +input.value < +input.max;
      if (minValid && maxValid) input.value = +input.value + 1;
      if (+input.value === +input.max) {
        wrapper.querySelector('.notice').textContent = 'Max. value';
        wrapper.querySelector('.notice').classList.add('active');
      }
    };
    const stepperMinus = () => {
      const minValid = +input.value > +input.min;
      const maxValid = +input.value <= +input.max;
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
