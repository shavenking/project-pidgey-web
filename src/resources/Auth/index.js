import HttpClient from 'resources/HttpClient'

export default class Auth {
    static login(form) {
        return HttpClient.post('/api/v1/tokens', form)
    }

    static register(form) {
        return HttpClient.post('/api/v1/users', form)
    }
}
