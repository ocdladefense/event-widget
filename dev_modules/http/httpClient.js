import { HttpCache } from "./HttpCache.js";
import { HttpMock } from "./HttpMock.js";

export { HttpClient };




const MODE_TEST = 1;
const MODE_LIVE = 0;


class HttpClient {

  // Live mode, or Test mode (mocking)
  mode = MODE_TEST;

  config = null;
  static mocks = {};
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

  static register(domain, mock) {
    mocks[domain] = mock;
  }
  //https://www.googleapis.com/calendar/v3/calendars/biere-library@thebierelibrary.com/events?timeMin=2023-07-01&timeMax=2023=07-15&test
  getMock(req) {
    let url = req.url;
    //pretend that we have parsed the url
    let domain = "www.googleapis.com";
    return mocks[domain];
  }
}





