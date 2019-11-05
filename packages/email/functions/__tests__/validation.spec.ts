import { Request, Response } from 'firebase-functions';
import ajv from 'ajv';

import { validateRequest, validate } from '../src/validation';
import * as Validation from '../src/validation';

// jest.mock('ajv', () =>
//   jest.fn().mockImplementation(() => ({
//     compile: jest.fn().mockImplementation(() => jest.fn())
//   }))
// );
// Object.setPrototypeOf(Validation.validate, { errors: 'errors' });

const mockReq = {
  body: 'body'
} as Request;
const mockRes = ({
  status: jest
    .fn()
    .mockReturnValue({ json: jest.fn().mockReturnValue({ end: jest.fn() }) })
} as unknown) as Response;
const mockNext = jest.fn();

beforeEach(jest.clearAllMocks);

fdescribe('`validate`', () => {
  test('should return `false` if missing `name`', () => {
    const res = validate({ email: 'example@example.com', message: 'Message' });

    expect(res).toBe(false);
    expect(validate.errors).toEqual([
      jasmine.objectContaining({
        keyword: 'required',
        params: { missingProperty: 'name' }
      })
    ]);
  });

  test('should return `false` if missing `email`', () => {
    const res = validate({ name: 'Name', message: 'Message' });

    expect(res).toBe(false);
    expect(validate.errors).toEqual([
      jasmine.objectContaining({
        keyword: 'required',
        params: { missingProperty: 'email' }
      })
    ]);
  });

  test('should return `false` if missing `message`', () => {
    const res = validate({ name: 'Name', email: 'example@example.com' });

    expect(res).toBe(false);
    expect(validate.errors).toEqual([
      jasmine.objectContaining({
        keyword: 'required',
        params: { missingProperty: 'message' }
      })
    ]);
  });

  test('should return `false` if `email` is invalid', () => {
    const res = validate({
      name: 'Name',
      email: 'invalid',
      message: 'Message'
    });

    expect(res).toBe(false);
    expect(validate.errors).toEqual([
      jasmine.objectContaining({
        keyword: 'format',
        params: { format: 'email' }
      })
    ]);
  });
});

describe('`validateRequest`', () => {
  test('should call `validate` with `req.body`', () => {
    validateRequest(mockReq, mockRes, mockNext);

    expect(validate).toHaveBeenCalledWith('body');
  });

  describe('`validate` returns `true`', () => {
    beforeEach(() => jest.spyOn(Validation, 'validate').mockReturnValue(true));

    test('should call `next`', () => {
      validateRequest(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    test('should not call `res` `status`', () => {
      validateRequest(mockReq, mockRes, mockNext);

      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });

  describe('`validate` returns `false`', () => {
    beforeEach(() => jest.spyOn(Validation, 'validate').mockReturnValue(false));

    test('should not call `next`', () => {
      validateRequest(mockReq, mockRes, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should call `res` `status` with `400` arg', () => {
      validateRequest(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    test('should call `res` `status` `json` with `validate.errors` arg', () => {
      validateRequest(mockReq, mockRes, mockNext);

      expect((mockRes as any).status().json).toHaveBeenCalledWith('errors');
    });

    test('should call `res` `status` `json` `end`', () => {
      validateRequest(mockReq, mockRes, mockNext);

      expect((mockRes as any).status().json().end).toHaveBeenCalled();
    });
  });
});
