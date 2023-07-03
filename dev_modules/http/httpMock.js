export { HttpMock };



// Mocking classes should extend this.
class HttpMock {
    url;

    constructor(url) {
        this.url = url;
    }

    getResponse(url) {
        // Parse the URL.
    }
}

