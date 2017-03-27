import {render} from 'react-dom'
import React, {Component} from 'react'
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router'
import {WorkDashboard, WorkItemDashboard} from 'scenes/Settings'
import {Login, Register} from 'scenes/Auth'
import Navbar from 'components/Navbar'
import HttpClient from 'resources/HttpClient'
import store from 'store'

HttpClient.setRedirector(hashHistory)

class App extends Component {
    render() {
        return (
            <div className="row">
                <Navbar />
                <div className="col-12">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const checkIfTokenExists = function (nextState, replace, callback) {
    if (!store.get('token')) {
        replace('/login')
    }

    callback()
}

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="settings/work-dashboard" />
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
            <Route path="settings" onEnter={checkIfTokenExists}>
                <IndexRedirect to="work-dashboard" />
                <Route path="work-dashboard" component={WorkDashboard} />
                <Route path="work-item-dashboard" component={WorkItemDashboard} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('root')
)
