class Url {
    url = null;
    constructor(url) {
        this.url = url;
    }

    parseQueryString() {
        let parts = this.url.split("?");
        let queryString = parts[1];
        let queryParts = queryString.split("&");
        //timeMin=2023-07-01
        const query = {};
        for (let i = 0; i < queryParts.length(); i++) {
            let kvp = queryParts[i];
            let parts = kvp.split("=");
            let key = parts[0];
            let value = parts[1];
            query[key] = value;
        }
        return query;
    }
} 