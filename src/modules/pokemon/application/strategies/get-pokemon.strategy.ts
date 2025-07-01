import { GetCharacterStrategy } from 'src/modules/common/strategies/get-character.strategy';
import { PokemonPort } from 'src/modules/pokemon/domain/ports/pokemon-port';
import { Injectable, Inject } from '@nestjs/common';
import { INJECTION_TOKENS } from 'src/config/injection-tokens.config';

@Injectable()
export class GetPokemonStrategy implements GetCharacterStrategy {
  constructor(
    @Inject(INJECTION_TOKENS.POKEMON_PORT)
    private readonly pokemonPort: PokemonPort,
  ) {}
  getData(metadata: string, config: string) {
    return this.pokemonPort.getData(metadata, config);
  }
}
