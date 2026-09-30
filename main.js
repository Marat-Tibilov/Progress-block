import { Progress } from './progress.js';

const form = document.querySelector('.controls');
const valueInput = document.querySelector('#control-value');
const animateInput = document.querySelector('#control-animate');
const hideInput = document.querySelector('#control-hide');

const progress = new Progress(document.querySelector('.progress'), {
  value: valueInput.valueAsNumber,
});

const syncValue = () => {
  const value = valueInput.valueAsNumber;

  if (!Number.isFinite(value)) {
    return;
  };

  progress.value = value;
};

const syncAnimated = () => {
  progress.animated = animateInput.checked;
};

const syncHidden = () => {
  progress.hidden = hideInput.checked;
};

form.addEventListener('submit', (event) => event.preventDefault());

valueInput.addEventListener('input', syncValue);
animateInput.addEventListener('change', syncAnimated);
hideInput.addEventListener('change', syncHidden);

valueInput.addEventListener('blur', () => {
  valueInput.value = String(progress.value);
});

syncAnimated();
syncHidden();
