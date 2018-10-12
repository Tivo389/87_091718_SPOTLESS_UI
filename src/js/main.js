import { ElementFunction } from './elementFunctions.js'
import { Svg } from './svgVariables.js';

/* global document */
/* global window */
//-----------------------------------------------------------------------------------------------
// WATER FORM INITIALIZATION
// - If there is a '.waterForm' it will add eventlisteners and a simple validity checker.
const waterForms = document.querySelectorAll('.waterForm');
const svg = new Svg();
const elf = new ElementFunction();
if (waterForms) {
  for (const waterForm of waterForms) {
    const typeText = waterForm.querySelectorAll("input[type='text']");
    const typeTextArea = waterForm.querySelectorAll('textarea');
    const typeCheckBox = waterForm.querySelectorAll("input[type='checkbox']");
    const typeRadio = waterForm.querySelectorAll("input[type='radio']");
    const typeNumber = waterForm.querySelectorAll("input[type='number']");
    const allTextInputs = [...typeText, ...typeTextArea];
    const allBoxAndBtns = [...typeCheckBox, ...typeRadio];
    const allNumbers = [...typeNumber];

    // - CONTINUE HERE MAKE THESE EVENT FUNCTIONS INTO A CLASS
    // - Event / Callback for click event for the number stepper
    const handleStepperClick = (e) => {
      const wrapper = e.currentTarget.closest('.stepperBox');
      const input = wrapper.querySelector("input[type='number']");
      const stepperAdd = () => {
        const minValid = +input.value >= +input.min;
        const maxValid = +input.value < +input.max;
        if (minValid && maxValid) input.value++;
        if (+input.value === +input.max) {
          wrapper.querySelector('.notice').textContent = 'Max. value';
          wrapper.querySelector('.notice').classList.add('active');
        }
      };
      const stepperMinus = () => {
        const minValid = +input.value > +input.min;
        const maxValid = +input.value <= +input.max;
        if (minValid && maxValid) input.value--;
        if (+input.value === +input.min) {
          wrapper.querySelector('.notice').textContent = 'Min. value';
          wrapper.querySelector('.notice').classList.add('active');
        }
      };
      switch (e.currentTarget.className.toUpperCase()) {
        case 'STEPPERUP'  : stepperAdd();   break;
        case 'STEPPERDOWN': stepperMinus(); break;
        default: console.error('handleStepperClick(): Switch Case Error');
      };
    };

    // - Event / Callback for input event
    const handleInput = (e) => {
      elf.countString(e.currentTarget);
      elf.inputValidation(waterForm, allTextInputs);
    };

    // - Event / Callback for focus event
    const handleFocus = (e) => {
      e.currentTarget.closest('div').classList.add('active');
    };

    // - Event / Callback for blur event
    const handleBlur = (e) => {
      if (!e.currentTarget.value.length) e.currentTarget.closest('div').classList.remove('active');
      elf.inputValidation(waterForm, allTextInputs);
    };

    // - INITIALIZATION / Apply valid eventListeners & adjust dom for all inputs
    const addWater = (el) => {
      const inputTypeText = () => {
        el.addEventListener('focus', handleFocus, false);
        el.addEventListener('blur', handleBlur, false);
        elf.addRequirementSymbol(el);
      };
      const inputTypeTextArea = () => {
        el.addEventListener('focus', handleFocus, false);
        el.addEventListener('input', handleInput, false);
        el.addEventListener('blur', handleBlur, false);
        elf.addRequirementSymbol(el);
        elf.addStringCounter(el);
      };
      const inputTypeCheckboxOrRadio = () => {
        const elParent = el.closest('div');
        const elCheckMark = `${el.type.toLowerCase()}CheckMark`;
        elParent.querySelector('label').insertAdjacentHTML(
          "afterbegin", `<span class="${elCheckMark}">${svg.check}</span>`
        );
        // Not using 'if else' as they BOTH need to be checked individually.
        if (el.checked) elParent.querySelector(`.${elCheckMark}`).classList.add('checked');
        if (el.disabled) elParent.querySelector(`.${elCheckMark}`).classList.add('disabled');
      };
      const inputTypeNumber = () => {
        const wrapper = document.createElement('div');
        wrapper.className='stepperBox'
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.insertAdjacentHTML( "beforeend", `
          <span class="stepperUp">${svg.add}</span>
          <span class="stepperDown">${svg.minus}</span>
          <span class="notice"></span>
        `);
        wrapper.querySelector('.stepperUp').addEventListener('click', handleStepperClick, false);
        wrapper.querySelector('.stepperDown').addEventListener('click', handleStepperClick, false);
        wrapper.addEventListener('animationend', () => {
          wrapper.querySelector('.notice').classList.remove('active');
        });
        elf.addRequirementSymbol(el);
      };
      switch (el.type.toUpperCase()) {
        case 'TEXT'    : inputTypeText();            break;
        case 'TEXTAREA': inputTypeTextArea();        break;
        case 'CHECKBOX': inputTypeCheckboxOrRadio(); break;
        case 'RADIO'   : inputTypeCheckboxOrRadio(); break;
        case 'NUMBER'  : inputTypeNumber();          break;
        default: console.error('addWater(): Switch Case Error');
      };
    };
    allTextInputs.forEach(text => { addWater(text) });
    allBoxAndBtns.forEach(bb => { addWater(bb) });
    allNumbers.forEach(number => { addWater(number) });
  }
}
//-----------------------------------------------------------------------------------------------
