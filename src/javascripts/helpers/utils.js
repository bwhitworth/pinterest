// PRINTS CURRENT STRING OF HTML INTO A SPECIFIC DIV CONTAINER, BY ID
const printToDom = (divId, textToPrint) => {
  $(`#${divId}`).html(textToPrint);
};

// PASSES OVER AN ARRAY OF RADIO BUTTON ELEMENTS
// RETURNS THE RADIO THAT IS CHECKED
const getRadioVal = () => {
  let val;
  Array.from($('.board-radio-btn')).forEach((item) => {
    if (item.checked) {
      val = item.id;
    }
  });
  return val;
};

export default { printToDom, getRadioVal };
