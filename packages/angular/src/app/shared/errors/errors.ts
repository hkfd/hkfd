import { CustomError } from 'ts-custom-error';

export class InteractionError extends CustomError {
  public constructor(message: string) {
    super(message);
  }
}
