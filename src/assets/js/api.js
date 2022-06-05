class API {
    constructor () {
        this.host = 'https://server.test'

    }

    get (url) {
        return fetch(this.host + url, {
            method: 'GET',
            credentials: 'include'
        })
    }

    getAvatarURL (username) {
        return this.host + '/user/' + username + '/avatar'
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

export default new API()