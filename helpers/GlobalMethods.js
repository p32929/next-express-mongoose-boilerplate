import {NodeFetchHelper} from "./NodeFetchHelper";

export class GlobalMethods {

    static createRandomUser(callback) {
        NodeFetchHelper.post('/users/', null, null, {
            email: (Math.random() * 100000) + '@a.com',
            name: (Math.random() * 100000) + '',
        }, callback)
    }

    static getAllUsers(callback) {
        NodeFetchHelper.get('/users/', null, null, callback)
    }

    static getOneUser(id, callback) {
        NodeFetchHelper.get('/users/byid/' + id, null, null, callback);
    }
}