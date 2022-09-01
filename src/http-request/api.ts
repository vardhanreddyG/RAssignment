import https from "https";
import { Character, EpisodesResponse } from "./api.model";
export class Api {
  private readonly baseUrl = "https://rickandmortyapi.com";
  private makeRequest<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(JSON.parse(data));
        });
      });
      request.on("error", reject);
      request.end();
    });
  }
  async getCharacters(ids: number[]) {
    const url = `${this.baseUrl}/api/character/${ids.join(",")}`;
    const characters = await this.makeRequest<Character[]>(url);
    return characters;
  }

  async getEpisodes(page: number) {
    const url = `${this.baseUrl}/api/episode?page=${page}`;
    return this.makeRequest<EpisodesResponse>(url);
  }
}
