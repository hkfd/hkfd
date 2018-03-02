import { CloudinaryPipe } from './cloudinary.pipe';

describe('CloudinaryPipe', () => {
  let pipe: CloudinaryPipe;

  beforeEach(() => (pipe = new CloudinaryPipe()));

  it('should create an instance', () => expect(pipe).toBeTruthy());

  it('should return string if name arg', () => {
    const res = pipe.transform('name');

    expect(res).toEqual(jasmine.any(String));
  });

  it('should return undefined if no name arg', () => {
    const res = pipe.transform('');

    expect(res).toBe(undefined);
  });

  it('should return URL with Cloudinary Name from env config', () => {
    const res = pipe.transform('name');

    expect(res).toContain('https://res.cloudinary.com/abc/');
  });

  it('should return URL with name', () => {
    const res = pipe.transform('example');

    expect(res).toContain('/example');
  });

  it('should return URL with default args if no passed args', () => {
    const res = pipe.transform('example');

    expect(res).toContain('/w_iw,h_ih,c_limit/');
  });

  it('should return URL with args if passed args', () => {
    const res = pipe.transform('example', {
      width: 64,
      height: 48,
      crop: 'scale'
    });

    expect(res).toContain('/w_64,h_48,c_scale/');
  });
});
