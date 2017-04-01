import React, {Component} from 'react'
import {Link} from 'react-router'

export default class SideMenu extends Component {
    render() {
        return (
            <div className="card card-outline-primary text-center">
                <div className="card-block">
                    <div className="card-title">選單</div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="settings/work-dashboard" className="nav-link" activeClassName="active">工作項目</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
