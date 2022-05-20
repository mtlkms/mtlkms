let data = {};

export default class Store {
    constructor () {

    }

    get (key) {
        return data[key];
    }

    set (key, value) {
        data[key] = value;
    }

    remove (key) {
        delete data[key];
    }
    
    clear () {
        data = {};
    }

    getAll () {
        return data;
    }
}