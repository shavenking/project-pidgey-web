import React, {Component} from 'react'
import {Link} from 'react-router'

export default class ProjectSideMenu extends Component {
    render() {
        const projectId = this.props.projectId

        return (
            <div className="card card-outline-primary text-center">
                <div className="card-block">
                    <div className="card-title">選單</div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link
                                to={`/projects/${projectId}/work-dashboard`}
                                className="nav-link"
                                activeClassName="active"
                            >標單管理</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
