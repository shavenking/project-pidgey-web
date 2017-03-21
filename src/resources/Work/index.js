import HttpClient from 'resources/HttpClient'

export default class Work {
    static list() {
        return HttpClient.get(`/api/v1/works`)
    }

    static create(form) {
        return HttpClient.post(`/api/v1/works`, form)
    }

    static delete(workId) {
        return HttpClient.delete(`/api/v1/works/${workId}`)
    }
}
