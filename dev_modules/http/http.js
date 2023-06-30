

export {HttpClient, HttpCache}




const MODE_TEST = 1;
const MODE_LIVE = 0;


class HttpClient {

// Live mode, or Test mode (mocking)
  mode = MODE_TEST;

  config = null;

// Prototypical inheritance in JavaScript.

// Class-based inheritance.
  constructor(config) {
    this.config = config;
    this.cache = this.config.cache || HttpCache.newFromMode(this.mode);
  }

  send(req) {
      if (this.mode == MODE_TEST && this.cache.has(req.url)) {

          return this.cache.get(req.url);
      } else {

          return fetch(req);

      }

  }
}



class HttpCache {

    cache = {};

    constructor(data) {
        for(var key in data) {
            cache[key] = Response.json(data);
        }
    }


}
