import { Svg } from './svgVariables.js';
const svg = new Svg();

export class ElementFunction {
  // - <textInput element> / Perform a simple validation for all the inputs.
  inputValidation(waterForm, allTextInputs) {
    const submitBtn = waterForm.querySelector("button[type='submit']");
    const validated = allTextInputs.every(input => input.checkValidity() === true);
    validated ? submitBtn.disabled = false : submitBtn.disabled = true;
    allTextInputs.forEach(input => this.updateRequiredSymbol(input));
  };

  // - <textInput element required> / Add an asterisk to any input with a 'required' attribute
  addRequirementSymbol(input) {
    if (input.required) input.closest('div').insertAdjacentHTML(
      "afterbegin",
      `<span class="required">${ svg.asterisk }</span>`
    );
  };

  // - <textarea> / Add a letter counter for any textarea that has a 'maxLength' attribute
  addStringCounter(input) {
    if (input.attributes.maxLength) input.closest('div').insertAdjacentHTML(
      "afterbegin",
      `<span class="stringCounter">${input.attributes.maxLength.value}</span>`
    );
  };

  // - <textarea> / Show letter count for textarea based
  countString(ect) {
    const counter = ect.closest('div').querySelector('.stringCounter');
    const currentCount = +ect.maxLength - ect.value.length;
    currentCount < 50 ? counter.style.color = '#B2005A' : counter.style.color = '#777777';
    counter.innerText = currentCount;
  };

  // - <element required> / Update the 'required' symbol based on the validation status
  updateRequiredSymbol(input) {
    if (input.checkValidity()) {
      input.closest('div').querySelector('span.required').classList.add('check');
      input.closest('div').querySelector('span.required').innerHTML = svg.check;
    } else {
      input.closest('div').querySelector('span.required').classList.remove('check');
      input.closest('div').querySelector('span.required').innerHTML = svg.asterisk;
    }
  };
}
