export default class API {
    constructor () {
        this.host = 'http://localhost:3000';

    }

    get (url) {
        return fetch(this.host + url)
    }

    post (url, data) {
        return fetch(this.host + url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    put () {
        
    }

    delete () {
        
    }
}