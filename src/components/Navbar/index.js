import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse bg-primary fixed-top navbar-toggleable-sm">
                <Link to="#" className="navbar-brand">CPMS</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto"></ul>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="projects" className="nav-link" activeClassName="active">專案</Link></li>
                        <li className="nav-item"><Link to="settings" className="nav-link" activeClassName="active">設定</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
