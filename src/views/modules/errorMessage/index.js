export default class ErrorMessage {
  static createChildElement(message) {
    return `<p>${message}</p>`;
  }

  constructor(status) {
    this.element = document.createElement('div');
    this.rebind(status);

    return this;
  }

  rebind(status = 200, isZeroMatch = false) {
    if (status === 200) {
      if (isZeroMatch) {
        this.element.classList.remove('errorMessage--none');
        this.element.innerHTML = '検索結果がありませんでした。';
        return;
      }

      this.element.classList.add('errorMessage--none');
      this.element.innerHTML = '';
      return;
    }

    this.element.classList.remove('errorMessage--none');

    let message = '問題が発生しました。';
    if (status === 422) {
      message = '検索ワードを正しく入力してください。';
    }

    this.element.innerHTML = ErrorMessage.createChildElement(message);
  }
}
