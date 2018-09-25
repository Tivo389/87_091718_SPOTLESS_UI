/* global document */
/* global window */
document.addEventListener('DOMContentLoaded', () => {
  //-----------------------------------------------------------------------------------------------
  console.log('INITIAL CHECK');
  // TITLE
  // - Explanation.
  //-----------------------------------------------------------------------------------------------
  // SLFORM INITIALISATION
  // - If there is a form with '.slForm' it will add eventlisteners and a simple validity checker.
  const slForm = document.querySelector('.slForm');
  if (slForm) {
    const inputElements = slForm.querySelectorAll('input');
    const textareaElements = slForm.querySelectorAll('textarea');
    const allInputs = [...inputElements, ...textareaElements];
    // - Display letter count for textarea.
    const countString = (ect) => {
      if (ect.tagName === 'TEXTAREA') {
        const counter = ect.closest('div').querySelector('.stringCounter');
        const currentCount = +ect.maxLength - ect.value.length;
        currentCount < 50 ? counter.style.color = '#B2005A' : counter.style.color = '#777777';
        counter.innerText = currentCount;
      }
    };
    // - Add an asterisk for any input that has a 'required' attribute.
    const addRequirementSymbol = (input) => {
      if (input.required) input.closest('div')
        .insertAdjacentHTML(
          "afterbegin",
          `<span
            class="required"
            style="position: absolute;
            top: 6px;
            line-height: 1;
            right: 6px;
            font-weight: bolder;
            color: #B2005A;
            font-size: 2rem;">
            *
          </span>`
        )
    };
    // - Update the required symbol based on the validation status.
    const updateRequiredSymbol = (input) => {
      if (input.checkValidity()) {
        input.closest('div').querySelector('span.required').innerHTML = '&check;';
        input.closest('div').querySelector('span.required').style.fontSize = '1.4rem';
        input.closest('div').querySelector('span.required').style.right = '4px';
        input.closest('div').querySelector('span.required').style.color = '#00B331';
      } else {
        input.closest('div').querySelector('span.required').innerHTML = '*';
        input.closest('div').querySelector('span.required').style.fontSize = '2rem';
        input.closest('div').querySelector('span.required').style.right = '6px';
        input.closest('div').querySelector('span.required').style.color = '#B2005A';
      }
    };
    // - Perform a simple validation for all the inputs.
    const inputValidation = (allInputs) => {
      const submitBtn = slForm.querySelector("button[type='submit']");
      const validated = allInputs.every(input => input.checkValidity() === true);
      validated ? submitBtn.disabled = false : submitBtn.disabled = true;
      allInputs.forEach(input => updateRequiredSymbol(input));
    };
    // - Callback for input event.
    const handleInput = (e) => {
      countString(e.currentTarget);
      inputValidation(allInputs);
    };
    // - Callback for focus event.
    const handleFocus = (e) => {
      e.currentTarget.closest('div').classList.add('active');
    };
    // - Callback for blur event.
    const handleBlur = (e) => {
      if (!e.currentTarget.value.length) e.currentTarget.closest('div').classList.remove('active');
    };
    // - Apply valid eventListeners & html to all inputs.
    const addInputEventlisteners = (input) => {
      input.addEventListener('input', handleInput);
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      addRequirementSymbol(input);
    };
    allInputs.forEach(input => {addInputEventlisteners(input)});
  }
  //-----------------------------------------------------------------------------------------------
});
