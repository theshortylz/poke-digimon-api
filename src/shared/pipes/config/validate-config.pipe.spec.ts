import { ValidateConfigPipe } from './validate-config.pipe';

describe('ValidateConfigPipe', () => {
  let pipe: ValidateConfigPipe;

  beforeEach(() => {
    pipe = new ValidateConfigPipe();
  });

  it('should validate correct config', () => {
    const value = JSON.stringify({ baseUrl: 'https://pokeapi.co/api/v2' });
    expect(pipe.transform(value)).toEqual({ baseUrl: 'https://pokeapi.co/api/v2' });
  });

  it('should throw error if baseUrl is missing', () => {
    expect(() => pipe.transform(JSON.stringify({}))).toThrow();
  });
}); 