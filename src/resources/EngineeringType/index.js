import HttpClient from 'resources/HttpClient'

export default class EngineeringType {
    static list() {
        return HttpClient.get(`/api/v1/engineering-types`)
    }
}
