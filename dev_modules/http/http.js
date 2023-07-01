

export {HttpClient, HttpCache, HttpMock}




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


  /**
   * 
   * @param {*} req 
   * @returns Response
   */
  async send(req) {
      if (this.mode == MODE_TEST) {
         // Look for registered Mock classes here.
         // E.g., this.getMock(req.url).
         // For more info, see:
         //  https://developer.mozilla.org/en-US/docs/Web/API/Request/url
         let mock = this.getMock(req);
         
        return mock.getResponse(req);
         // We may or may not continue to use this caching facility.
         // Instead, let's give preference to this.getMock().
         // return this.cache.get(req.url);
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



// Mocking classes should extend this.
class HttpMock {


  getResponse(url) {
    // Parse the URL.
  }
}
