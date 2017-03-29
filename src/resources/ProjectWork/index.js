import HttpClient from 'resources/HttpClient'

export default class ProjectWork {
    static list(projectId) {
        return HttpClient.get(`/api/v1/projects/${projectId}/works`)
    }

    static create(projectId, form) {
        return HttpClient.post(`/api/v1/projects/${projectId}/works`, form)
    }

    static delete(projectId, workId) {
        return HttpClient.delete(`/api/v1/projects/${projectId}/works/${workId}`)
    }
}
