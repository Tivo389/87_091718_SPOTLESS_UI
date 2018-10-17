/* global document */
import ElementFunctions from './elementFunctions.js';
import EventFunctions from './eventFunctions.js';
import Svg from './svgVariables.js';

const elf = new ElementFunctions();
const evf = new EventFunctions();
const svg = new Svg();

//-----------------------------------------------------------------------------------------------
// WATER FORM INITIALIZATION
// - If there is a '.waterForm' it will add eventlisteners and a simple validity checker.
const waterForms = document.querySelectorAll('.waterForm');
if (waterForms) {
  waterForms.forEach((waterForm) => {
    const typeText = waterForm.querySelectorAll("input[type='text']");
    const typeTextArea = waterForm.querySelectorAll('textarea');
    const typeCheckBox = waterForm.querySelectorAll("input[type='checkbox']");
    const typeRadio = waterForm.querySelectorAll("input[type='radio']");
    const typeNumber = waterForm.querySelectorAll("input[type='number']");
    const typeSelect = waterForm.querySelectorAll("select");
    const allTextInputs = [...typeText, ...typeTextArea];
    const allBoxAndBtns = [...typeCheckBox, ...typeRadio];
    const allNumbers = [...typeNumber];
    const allSelects = [...typeSelect];
    const allFormElements = [
      ...allTextInputs,
      ...allBoxAndBtns,
      ...allNumbers,
      ...allSelects
    ];

    // INITIALIZATION / Apply valid eventListeners & adjust dom for all inputs
    const addWater = (el) => {
      // INPUT TYPE TEXT
      const inputTypeText = () => {
        el.addEventListener('focus', evf.handleFocus, true);
        el.addEventListener('blur', (e) => { evf.handleBlur(e, waterForm, allTextInputs); }, true);
        elf.addRequirementSymbol(el);
      };

      // INPUT TYPE TEXTAREA
      const inputTypeTextArea = () => {
        el.addEventListener('focus', evf.handleFocus, true);
        el.addEventListener('input', (e) => { evf.handleInput(e, waterForm, allTextInputs); }, true);
        el.addEventListener('blur', (e) => { evf.handleBlur(e, waterForm, allTextInputs); }, true);
        elf.addRequirementSymbol(el);
        elf.addStringCounter(el);
      };

      // INPUT TYPE CHECKBOXORRADIO
      const inputTypeCheckboxOrRadio = () => {
        const elParent = el.closest('div');
        const elCheckMark = `${el.type.toLowerCase()}CheckMark`;
        elParent.querySelector('label').insertAdjacentHTML(
          'afterbegin',
          `<span class="${elCheckMark}">${svg.check}</span>`,
        );
        // - Not using 'if else' as they BOTH need to be checked individually.
        if (el.checked) elParent.querySelector(`.${elCheckMark}`).classList.add('checked');
        if (el.disabled) elParent.querySelector(`.${elCheckMark}`).classList.add('disabled');
      };

      // INPUT TYPE NUMBER
      const inputTypeNumber = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'stepperBox';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapper.insertAdjacentHTML(
          'beforeend',
          `<span class="stepperUp">${svg.add}</span>
           <span class="stepperDown">${svg.minus}</span>
           <span class="notice"></span>`
        );
        wrapper.querySelector('.stepperUp').addEventListener('click', (e) => {
          evf.handleClickStepper(e, wrapper);
        }, true);
        wrapper.querySelector('.stepperDown').addEventListener('click', (e) => {
          evf.handleClickStepper(e, wrapper);
        }, true);
        wrapper.addEventListener('animationend', () => {
          wrapper.querySelector('.notice').classList.remove('active');
        });
        elf.addRequirementSymbol(el);
      };

      // INPUT TYPE SELECT
      const inputTypeSelect = () => {
        const elParent = el.closest('form.waterForm');
        const srcSelected = el.querySelector('option[selected]');
        const srcOptions = elParent.querySelector('select').querySelectorAll('option');
        const srcSelectedText = srcSelected ? srcSelected.textContent : '–';
        const srcSelectedValue = srcSelected ? srcSelected.value : '–';
        const wrapper = document.createElement('div');
        const selected = document.createElement('div');
        const selectList = document.createElement('ul');
        wrapper.className = 'pseudoSelectWrapper';
        selected.className = 'pseudoSelected';
        selectList.className = 'pseudoSelectList';
        // - Make pseudoSelected & Btn to open Input
        elParent.insertBefore(selected, el);
        selected.insertAdjacentHTML(
          'beforeend',
          `<p value="${srcSelectedValue}">${srcSelectedText}</p><span class="triangleDown">${svg.triangleDown}</span>`
        );
        // - Make pseudoSelectList & List Items
        elParent.insertBefore(selectList, el);
        el.querySelectorAll('option').forEach((option) => {
          selectList.insertAdjacentHTML(
            'beforeend',
            `<li value="${option.attributes.value.value}">${option.innerHTML}</li>`
          );
        });
        // - Make pseudoSelect Wrapper & place pseudoSelected & pseudoSelectList inside
        elParent.insertBefore(wrapper, el);
        wrapper.appendChild(selected);
        wrapper.appendChild(selectList);
        // - Add eventListener to pseudoSelectWrapper & pseudoSelectList
        wrapper.addEventListener('click', (e) => {
          evf.handleClickSelectOne(e, wrapper);
        }, true);
        selectList.addEventListener('click', (e) => {
          evf.handleClickSelectList(e, srcOptions, selected);
        }, true);
      };

      // - SWITCH STATEMENT
      switch (el.type.toUpperCase()) {
        case 'TEXT':            inputTypeText();            break;
        case 'TEXTAREA':        inputTypeTextArea();        break;
        case 'CHECKBOX':        inputTypeCheckboxOrRadio(); break;
        case 'RADIO':           inputTypeCheckboxOrRadio(); break;
        case 'NUMBER':          inputTypeNumber();          break;
        case 'SELECT-ONE':      inputTypeSelect();          break;
        // case 'SELECT-MULTIPLE': inputTypeSelect();          break;
        default: console.error('addWater(): Switch Case Error');
      }
    };
    allFormElements.forEach((element) => { addWater(element); });
  });
}
//-----------------------------------------------------------------------------------------------
