import HttpClient from 'resources/HttpClient'

export default class Unit {
    static list() {
        return HttpClient.get(`/api/v1/units`)
    }
}
