const MIN_VALUE = 0;
const MAX_VALUE = 100;

const VALUE_PROPERTY = '--progress-value';
const ANIMATED_CLASS = 'progress--animated';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export class Progress {
  #element;
  #value;
  #animated;
  #hidden;

  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('Progress: root element is required');
    }

    this.#element = element;
    this.#value = clamp(Number(element.getAttribute('aria-valuenow')) || MIN_VALUE, MIN_VALUE, MAX_VALUE);
    this.#animated = element.classList.contains(ANIMATED_CLASS);
    this.#hidden = element.hidden;

    this.#render();
  }

  get value() {
    return this.#value;
  }

  set value(next) {
    const value = Math.round(Number(next));

    if (!Number.isFinite(value)) return;

    const clamped = clamp(value, MIN_VALUE, MAX_VALUE);

    if (clamped === this.#value) return;

    this.#value = clamped;
    this.#renderValue();
  }

  get animated() {
    return this.#animated;
  }

  set animated(next) {
    const animated = Boolean(next);

    if (animated === this.#animated) return;

    this.#animated = animated;
    this.#renderAnimated();
  }

  get hidden() {
    return this.#hidden;
  }

  set hidden(next) {
    const hidden = Boolean(next);

    if (hidden === this.#hidden) return;

    this.#hidden = hidden;
    this.#renderHidden();
  }

  #render() {
    this.#renderValue();
    this.#renderAnimated();
    this.#renderHidden();
  }

  #renderValue() {
    this.#element.style.setProperty(VALUE_PROPERTY, String(this.#value));
    this.#element.setAttribute('aria-valuenow', String(this.#value));
  }

  #renderAnimated() {
    this.#element.classList.toggle(ANIMATED_CLASS, this.#animated);
  }

  #renderHidden() {
    this.#element.hidden = this.#hidden;
  }
}
