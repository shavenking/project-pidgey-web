import {render} from 'react-dom'
import React, {Component} from 'react'
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router'
import {WorkDashboard, WorkItemDashboard} from 'scenes/Settings'
import Navbar from 'components/Navbar'

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

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="settings/work-dashboard" />
            <Route path="settings">
                <IndexRedirect to="work-dashboard" />
                <Route path="work-dashboard" component={WorkDashboard} />
                <Route path="work-item-dashboard" component={WorkItemDashboard} />
            </Route>
        </Route>
    </Router>,
    document.getElementById('root')
)
