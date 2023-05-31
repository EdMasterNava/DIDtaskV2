import { DexieData, generateQuery, generateWrite } from './DexieData';

export class CredentialFetcher {
  #query;
  #write;

  constructor(name) {
    const data = new DexieData(name);

    this.#query = generateQuery(data);
    this.#write = generateWrite(data);
  }

  get query() {
    return this.#query;
  }

  get write() {
    return this.#write;
  }
}