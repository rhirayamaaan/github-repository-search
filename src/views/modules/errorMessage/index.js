import './style.scss';

const NAMESPACE = 'errorMessage';
const NONE_MODIFIER_CLASSNAME = `${NAMESPACE}--none`;

export default class ErrorMessage {
  static createChildElement(message) {
    return `<p>${message}</p>`;
  }

  constructor(error) {
    this.element = document.createElement('div');
    this.element.classList.add(NAMESPACE);
    this.data = error;

    return this;
  }

  set data(error = null) {
    if (error !== null && error.message !== null) {
      this.element.classList.remove(NONE_MODIFIER_CLASSNAME);
      this.element.innerHTML = ErrorMessage.createChildElement(error.message);
      return;
    }

    this.element.classList.add(NONE_MODIFIER_CLASSNAME);
    this.element.innerHTML = '';
  }
}
