export class StubDomSanitizer {
  sanitize = jest.fn().mockImplementation((_, val) => val);

  bypassSecurityTrustResourceUrl = jest
    .fn()
    .mockImplementation(
      (val: string) => `bypassSecurityTrustResourceUrl: ${val}`
    );
}
