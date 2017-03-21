import HttpClient from 'resources/HttpClient'

export default class WorkItem {
    static list(workId) {
        if (!workId) {
            return this.listWithoutWork()
        }

        return HttpClient.get(`/api/v1/works/${workId}/work-items`)
    }

    static listWithoutWork() {
        return HttpClient.get(`/api/v1/work-items`)
    }

    static create(workId, form) {
        return HttpClient.post(`/api/v1/works/${workId}/work-items`, form)
    }

    static delete(workId, workItemId) {
        return HttpClient.delete(`/api/v1/works/${workId}/work-items/${workItemId}`)
    }

    static stats(workId) {
        return HttpClient.get(`/api/v1/works/${workId}/work-items/stats`)
    }
}
