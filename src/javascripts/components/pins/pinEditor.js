import utils from '../../helpers/utils';

// BUILDS INPUT FORM
const showPinEditor = (e) => {
  const pinId = e.target.closest('.pin-card').id;
  let domString = '';
  domString += `<h2 id=${pinId}>Edit Pin</h2>`;
  domString += '<p>Select Board:</p>';
  utils.printToDom('single-container', domString);
  console.error(pinId);
};

export default { showPinEditor };
