import HttpClient from 'resources/HttpClient'

export default class CostType {
    static list() {
        return HttpClient.get(`/api/v1/cost-types`)
    }
}
