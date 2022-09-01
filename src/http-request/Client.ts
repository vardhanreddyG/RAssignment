import { Api } from "./api";
import { Character, Episode } from "./api.model";

export class Client {
  private readonly characters = new Map<number, Character>();
  episodes: any[] = [];
  constructor(private readonly api: Api) {}

  private getEpisodeCharacterIds(episode: Episode) {
    const Ids = episode.characters.map((character) => {
      const [id] = character.split("/").reverse();
      return Number(id);
    });
    return Ids;
  }

  private getCharacterIds(episodes: Episode[]): number[] {
    const characterIds = episodes.flatMap((episode) =>
      this.getEpisodeCharacterIds(episode)
    );
    const finalCharacterIds = new Set(characterIds);
    return Array.from(finalCharacterIds);
  }

  private saveCharacters(characters: Character[]) {
    characters.forEach((character) =>
      this.characters.set(character.id, character)
    );
  }

  private mapEpisodesWithCharacters(episodes: Episode[]) {
    const mapped = episodes.map((episode) => {
      const ids = this.getEpisodeCharacterIds(episode);
      const episodeCharacters = ids.map((id) => {
        const details = this.characters.get(id);
        return details;
      });
      return {
        ...episode,
        characters: episodeCharacters,
      };
    });
    return mapped;
  }

  async getEpisodes(page: number) {
    const { results: episodes, info } = await this.api.getEpisodes(page);
    const allCharacterIds = this.getCharacterIds(episodes);
    console.log(`Total characters ${allCharacterIds.length}`);
    const unavailbleCharacterIds = allCharacterIds.filter(
      (id) => !this.characters.has(id)
    );
    if (unavailbleCharacterIds.length) {
      console.log(
        `available characters ${
          allCharacterIds.length - unavailbleCharacterIds.length
        }`
      );
      console.log(`unavailable characters ${unavailbleCharacterIds.length}`);
      const newCharacters = await this.api.getCharacters(
        unavailbleCharacterIds
      );
      this.saveCharacters(newCharacters);
    }
    const mapped = this.mapEpisodesWithCharacters(episodes);
    return { info, result: mapped };
  }

  async getAllEpisodes() {
    try {
      const getAll = async (page: number): Promise<Function | void> => {
        const { info, result } = await this.getEpisodes(page);
        this.episodes = [...this.episodes, ...result];
        if (info.next) {
          return getAll(page + 1);
        }
      };
      await getAll(1);
      return this.episodes;
    } catch (error) {
      return error;
    }
  }
}
