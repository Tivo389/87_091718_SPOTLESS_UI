/* global document */
/* global window */
document.addEventListener('DOMContentLoaded', () => {
  //-----------------------------------------------------------------------------------------------
  console.log('INITIAL CHECK');
  // TITLE
  // - Explanation.
  //-----------------------------------------------------------------------------------------------
  // TITLE
  // - Explanation.
  const slForm = document.querySelector('.slForm');
  if (slForm) {
    const inputElements = slForm.querySelectorAll('input');
    const textareaElements = slForm.querySelectorAll('textarea');
    const allInputs = [...inputElements, ...textareaElements];
    const countString = (ect) => {
      if (ect.tagName === 'TEXTAREA') {
        const counter = ect.closest('div').querySelector('.stringCounter');
        const currentCount = +ect.maxLength - ect.value.length;
        currentCount < 50 ? counter.style.color = '#B2005A' : counter.style.color = '#777777';
        counter.innerText = currentCount;
      }
    };
    const inputValidation = () => {
      // CONTINUE HERE USE checkValidity?
      const submitBtn = slForm.querySelector("button[type='submit']");
      validated ? submitBtn.disabled = false : submitBtn.disabled = true;
    };
    const handleInput = (e) => {
      const ect = e.currentTarget;
      countString(ect);
      inputValidation();
    };
    const handleFocus = (e) => {
      e.currentTarget.closest('div').classList.add('active');
    };
    const handleBlur = (e) => {
      if (!e.currentTarget.value.length) e.currentTarget.closest('div').classList.remove('active');
    };
    const addInputEventlisteners = (input) => {
      input.addEventListener('input', handleInput);
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    };
    allInputs.forEach(input => {addInputEventlisteners(input)});
  }
  //-----------------------------------------------------------------------------------------------
});
