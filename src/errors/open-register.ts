export class OpenRegisterError extends Error {
  constructor(message: string = 'Employee already has an open work shift') {
    super(message);
  }
}
