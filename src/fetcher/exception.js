export default class FetchException extends Error {
  constructor(status, message, isAbort = false) {
    super();
    this.status = status;
    this.message = message;
    this.isAbort = isAbort;

    return this;
  }
}
