import HttpClient from 'resources/HttpClient'

export default class Project {
    static list() {
        return HttpClient.get('/api/v1/projects')
    }

    static create(form) {
        return HttpClient.post('/api/v1/projects', form)
    }

    static delete(id) {
        return HttpClient.delete(`/api/v1/projects/${id}`)
    }
}
