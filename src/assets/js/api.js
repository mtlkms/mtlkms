import store from "@/assets/js/store.js";

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

    setAvatarURL () {
        let username = store.get('user').username
        let avatarURL = this.getAvatarURL(username)

        store.set('avatarURL', avatarURL)
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

    updateAvatar (data) {
        let username = store.get('user').username

        return fetch(`${this.host}/user/${username}/avatar`, {
            method: 'PUT',
            credentials: 'include',
            body: data
        })
    }

    delete () {
        
    }
}

export default new API()