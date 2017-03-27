import React, {Component} from 'react'
import {Link} from 'react-router'
import store from 'store'

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        store.remove('token')
    }

    render() {
        const isLoggedIn = !!store.get('token')
        return (
            <nav className="navbar navbar-inverse bg-primary fixed-top navbar-toggleable-sm">
                <Link to="#" className="navbar-brand">CPMS</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto"></ul>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="projects" className="nav-link" activeClassName="active">專案</Link></li>
                        <li className="nav-item"><Link to="settings" className="nav-link" activeClassName="active">設定</Link></li>
                        {isLoggedIn && <li className="nav-item"><Link to="login" className="nav-link" onClick={this.onLogout}>登出</Link></li>}
                    </ul>
                </div>
            </nav>
        )
    }
}
