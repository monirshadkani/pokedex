import ky from "ky";

const BASE_URL = "https://pokedex-api.3rgo.tech/api/";

export const httpClient = ky.extend({
  prefixUrl: BASE_URL,
  hooks: {},
  retry: {
    limit: 2,
  },
});
