import store from 'store'

let headers = {
    'content-type': 'application/json'
}

let redirector
let redirectUnauthorizedTo = 'login'

function redirectIfUnauthorized(rep) {
    if (401 === rep.status) {
        store.remove('token')
        redirector.push(redirectUnauthorizedTo)

        let error = new Error(rep.statusText)
        error.response = rep

        throw error
    }

    return rep
}

function decodeResponseJson(rep) {
    if (204 === rep.status) {
        return rep
    }

    return rep.json()
}

export default class HttpClient {
    static get(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                ...headers,
                authorization: `bearer ${store.get('token')}`
            }
        }).then(redirectIfUnauthorized).then(decodeResponseJson)
    }

    static post(url, form) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                ...headers,
                authorization: `bearer ${store.get('token')}`
            }
        }).then(redirectIfUnauthorized).then(decodeResponseJson)
    }

    static delete(url) {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                ...headers,
                authorization: `bearer ${store.get('token')}`
            }
        }).then(redirectIfUnauthorized).then(decodeResponseJson)
    }

    static setRedirector(newRedirector) {
        redirector = newRedirector
    }

    static setRedirectUnauthorizedTo(url) {
        redirectUnauthorizedTo = url
    }
}
