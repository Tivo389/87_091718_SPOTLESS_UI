/* global document */
/* global window */
document.addEventListener('DOMContentLoaded', () => {
  //-----------------------------------------------------------------------------------------------
  console.log('INITIAL CHECK');
  //-----------------------------------------------------------------------------------------------
  // WATER FORM INITIALIZATION
  // - If there is a '.waterForm' it will add eventlisteners and a simple validity checker.
  const waterForms = document.querySelectorAll('.waterForm');
  if (waterForms) {
    for (const waterForm of waterForms) {
      const textInputs = waterForm.querySelectorAll("input[type='text']");
      const textAreas = waterForm.querySelectorAll('textarea');
      const checkBoxes = waterForm.querySelectorAll("input[type='checkbox']");
      const radioBtns = waterForm.querySelectorAll("input[type='radio']");
      const allTextInputs = [...textInputs, ...textAreas];
      const allBoxAndBtns = [...checkBoxes, ...radioBtns];
      const svgAsterisk = `
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
          <path fill="#B2005A" d="M9.26120416,6.5252539 L6.53411788,5.00000001 L9.26120416,3.4747461 C9.48739066,3.34824218 9.56727985,3.05708984 9.43824136,2.82949218 L9.06468365,2.17048828 C8.93566435,1.94289063 8.64817066,1.86777344 8.42750698,2.00402344 L5.76705893,3.64683594 L5.83369718,0.478789063 C5.83922,0.216035156 5.6316155,0 5.37355771,0 L4.6264423,0 C4.36840367,0 4.16078,0.216035156 4.16632199,0.478789063 L4.23294107,3.64683594 L1.57249303,2.00404297 C1.35184852,1.86779298 1.06433566,1.94291015 0.935316343,2.17050781 L0.561758641,2.82951172 C0.432739328,3.05710938 0.512628516,3.34826172 0.73881502,3.47476562 L3.46588213,5.00000001 L0.738795844,6.5252539 C0.512609339,6.65175782 0.432720151,6.94291016 0.561758641,7.17050782 L0.935316343,7.82951172 C1.06433566,8.05710937 1.35184852,8.13222656 1.57249303,7.99597656 L4.23294107,6.35316406 L4.16630282,9.52121094 C4.16078,9.78396485 4.36840367,10 4.6264423,10 L5.37357688,10 C5.6316155,10 5.83923919,9.78396485 5.83371637,9.52121094 L5.76705893,6.35316406 L8.42750698,7.99595703 C8.64815149,8.13220704 8.93566435,8.05708985 9.06468365,7.82949219 L9.43824136,7.17048828 C9.56726068,6.94289062 9.48739066,6.65175782 9.26120416,6.5252539 Z"/>
        </svg>
      `;
      const svgCheck = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
          <path fill="#00B331" d="M4.0757325,9.84288027 L0.175728687,6.35627801 C-0.0585762291,6.14680948 -0.0585762291,5.80718004 0.175728687,5.59769057 L1.02423733,4.83910314 C1.25854224,4.62961366 1.63846449,4.62961366 1.87276941,4.83910314 L4.49999854,7.18782425 L10.1272306,2.1571014 C10.3615355,1.94763287 10.7414578,1.94763287 10.9757627,2.1571014 L11.8242713,2.91568883 C12.0585762,3.12515735 12.0585762,3.46478678 11.8242713,3.67427626 L4.92426458,9.84290122 C4.68993622,10.0523698 4.31003742,10.0523698 4.0757325,9.84288027 Z"/>
        </svg>
      `;

      // - <textInput element> / Perform a simple validation for all the inputs.
      const inputValidation = (allTextInputs) => {
        const submitBtn = waterForm.querySelector("button[type='submit']");
        const validated = allTextInputs.every(input => input.checkValidity() === true);
        validated ? submitBtn.disabled = false : submitBtn.disabled = true;
        allTextInputs.forEach(input => updateRequiredSymbol(input));
      };

      // - <textInput element required> / Add an asterisk to any input with a 'required' attribute
      const addRequirementSymbol = (input) => {
        if (input.required) input.closest('div').insertAdjacentHTML(
          "afterbegin",
          `<span class="required">${ svgAsterisk }</span>`
        );
      };

      // - <textarea> / Add a letter counter for any textarea that has a 'maxLength' attribute
      const addStringCounter = (input) => {
        if (input.attributes.maxLength) input.closest('div').insertAdjacentHTML(
          "afterbegin",
          `<span class="stringCounter">${input.attributes.maxLength.value}</span>`
        );
      };

      // - <textarea> / Show letter count for textarea based
      const countString = (ect) => {
        const counter = ect.closest('div').querySelector('.stringCounter');
        const currentCount = +ect.maxLength - ect.value.length;
        currentCount < 50 ? counter.style.color = '#B2005A' : counter.style.color = '#777777';
        counter.innerText = currentCount;
      };

      // - <element required> / Update the 'required' symbol based on the validation status
      const updateRequiredSymbol = (input) => {
        if (input.checkValidity()) {
          input.closest('div').querySelector('span.required').classList.add('check');
          input.closest('div').querySelector('span.required').innerHTML = svgCheck;
        } else {
          input.closest('div').querySelector('span.required').classList.remove('check');
          input.closest('div').querySelector('span.required').innerHTML = svgAsterisk;
        }
      };

      // - Event / Callback for input event
      const handleInput = (e) => {
        countString(e.currentTarget);
        inputValidation(allTextInputs);
      };

      // - Event / Callback for focus event
      const handleFocus = (e) => {
        e.currentTarget.closest('div').classList.add('active');
      };

      // - Event / Callback for blur event
      const handleBlur = (e) => {
        if (!e.currentTarget.value.length) e.currentTarget.closest('div').classList.remove('active');
        inputValidation(allTextInputs);
      };

      // - INITIALIZATION / Apply valid eventListeners & adjust dom for all inputs
      const addWater = (el) => {
        const inputTypeText = () => {
          el.addEventListener('focus', handleFocus);
          el.addEventListener('blur', handleBlur);
          addRequirementSymbol(el);
        };
        const inputTypeTextArea = () => {
          el.addEventListener('input', handleInput);
          addRequirementSymbol(el);
          addStringCounter(el);
        };
        const inputTypeCheckboxOrRadio = () => {
          const elParent = el.closest('div');
          const elCheckMark = `${el.type.toLowerCase()}CheckMark`;
          elParent.querySelector('label').insertAdjacentHTML(
            "afterbegin", `<span class="${elCheckMark}">${svgCheck}</span>`
          );
          // Not using 'if else' as they BOTH need to be checked individually.
          if (el.checked) elParent.querySelector(`.${elCheckMark}`).classList.add('checked');
          if (el.disabled) elParent.querySelector(`.${elCheckMark}`).classList.add('disabled');
        };
        switch (el.type.toUpperCase()) {
          case 'TEXT'    : inputTypeText();            break;
          case 'TEXTAREA': inputTypeTextArea();        break;
          case 'CHECKBOX': inputTypeCheckboxOrRadio(); break;
          case 'RADIO'   : inputTypeCheckboxOrRadio(); break;
          default: console.error('addWater(): Switch Case Error');
        };
      };
      allTextInputs.forEach(input => { addWater(input) });
      allBoxAndBtns.forEach(bb => { addWater(bb) });
    }
  }
  //-----------------------------------------------------------------------------------------------
});
