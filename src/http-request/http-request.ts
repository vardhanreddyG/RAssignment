import { Api } from "./api";
import { Client } from "./client";

const api = new Api();
const client = new Client(api);

client.getAllEpisodes().then(console.log).catch(console.error);
