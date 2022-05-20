export default class API {
    constructor () {
        this.host = 'http://localhost:8080';

    }

    get (url, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', this.host + url);

        xhr.onload = () => {
            callback(JSON.parse(xhr.responseText));
        }

        xhr.send();
    }

    post (url, data, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open('POST', this.host + url);

        xhr.onload = () => {
            callback(JSON.parse(xhr.responseText));
        }

        xhr.send(JSON.stringify(data));
    }

    put (url, data, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open('PUT', this.host + url);

        xhr.onload = () => {
            callback(JSON.parse(xhr.responseText));
        }

        xhr.send(JSON.stringify(data));
    }

    delete (url, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open('DELETE', this.host + url);

        xhr.onload = () => {
            callback(JSON.parse(xhr.responseText));
        }

        xhr.send();
    }
}