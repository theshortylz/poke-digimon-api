import { ValidateDigimonMetadataPipe } from './validate-digimon-metadata.pipe';

describe('ValidateDigimonMetadataPipe', () => {
  let pipe: ValidateDigimonMetadataPipe;

  beforeEach(() => {
    pipe = new ValidateDigimonMetadataPipe();
  });

  it('should validate correct metadata', () => {
    const value = JSON.stringify({ id: 42 });
    expect(pipe.transform(value)).toEqual({ id: 42 });
  });

  it('should throw error if id is missing', () => {
    expect(() => pipe.transform(JSON.stringify({}))).toThrow();
  });
});
