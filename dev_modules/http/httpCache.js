export { HttpCache }


class HttpCache {

    cache = {};

    constructor(data) {
        for (var key in data) {
            cache[key] = Response.json(data);
        }
    }


}