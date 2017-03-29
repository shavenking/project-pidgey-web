import HttpClient from 'resources/HttpClient'

export default class ProjectWorkItem {
    static list(projectId, workId) {
        if (!workId) {
            return this.listWithoutWork(projectId)
        }

        return HttpClient.get(`/api/v1/projects/${projectId}/works/${workId}/work-items`)
    }

    static listWithoutWork(projectId) {
        return HttpClient.get(`/api/v1/projects/${projectId}/work-items`)
    }

    static create(projectId, workId, form) {
        return HttpClient.post(`/api/v1/projects/${projectId}/works/${workId}/work-items`, form)
    }

    static delete(projectId, workId, workItemId) {
        return HttpClient.delete(`/api/v1/projects/${projectId}/works/${workId}/work-items/${workItemId}`)
    }

    static stats(projectId, workId) {
        return HttpClient.get(`/api/v1/projects/${projectId}/works/${workId}/work-items/stats`)
    }
}
