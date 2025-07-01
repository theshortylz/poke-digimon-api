import { ValidatePokemonMetadataPipe } from './validate-pokemon-metadata.pipe';

describe('ValidatePokemonMetadataPipe', () => {
  let pipe: ValidatePokemonMetadataPipe;

  beforeEach(() => {
    pipe = new ValidatePokemonMetadataPipe();
  });

  it('should validate correct metadata', () => {
    const value = JSON.stringify({ name: 'pikachu' });
    expect(pipe.transform(value)).toEqual({ name: 'pikachu' });
  });

  it('should throw error if name is missing', () => {
    expect(() => pipe.transform(JSON.stringify({}))).toThrow();
  });
});
