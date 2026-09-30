const MIN_VALUE = 0;
const MAX_VALUE = 100;

const VALUE_PROPERTY = '--progress-value';
const ANIMATED_CLASS = 'progress--animated';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export class Progress {
  #element;
  #value;

  constructor(element, { value = MIN_VALUE } = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('Progress: root element is required');
    }

    const initial = Math.round(Number(value));

    this.#element = element;
    this.#value = Number.isFinite(initial) ? clamp(initial, MIN_VALUE, MAX_VALUE) : MIN_VALUE;

    this.#renderValue();
  }

  get value() {
    return this.#value;
  }

  set value(next) {
    const value = Math.round(Number(next));

    if (!Number.isFinite(value)) {
      return;
    };

    const clamped = clamp(value, MIN_VALUE, MAX_VALUE);

    if (clamped === this.#value) {
      return;
    };

    this.#value = clamped;
    this.#renderValue();
  }

  get animated() {
    return this.#element.classList.contains(ANIMATED_CLASS);
  }

  set animated(next) {
    this.#element.classList.toggle(ANIMATED_CLASS, Boolean(next));
  }

  get hidden() {
    return this.#element.hidden;
  }

  set hidden(next) {
    this.#element.hidden = Boolean(next);
  }

  #renderValue() {
    this.#element.style.setProperty(VALUE_PROPERTY, String(this.#value));
    this.#element.setAttribute('aria-valuenow', String(this.#value));
  }
}
