module.exports = {
  config: jest.fn(_ => ({ install: () => undefined })),
  requestHandler: jest.fn(_ => (req, res, next) => next()),
  errorHandlerFn: jest.fn((err, req, res, next) => next(err)),
  errorHandler: jest.fn(() => module.exports.errorHandlerFn)
};
