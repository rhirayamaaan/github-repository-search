export default class ErrorMessage {
  static createChildElement(message) {
    return `<p>${message}</p>`;
  }

  constructor(error) {
    this.element = document.createElement('div');
    this.data = error;

    return this;
  }

  set data(error = null) {
    if (error !== null && error.message !== null) {
      this.element.classList.remove('errorMessage--none');
      this.element.innerHTML = ErrorMessage.createChildElement(error.message);
      return;
    }

    this.element.classList.add('errorMessage--none');
    this.element.innerHTML = '';
  }
}
