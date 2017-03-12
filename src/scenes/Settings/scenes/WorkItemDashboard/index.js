import React, {Component} from 'react'
import {Link} from 'react-router'
import WorkItemTable from 'components/WorkItemTable'

export default class WorkItemDashboard extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-3 col-lg-2">
                    <div className="card card-outline-primary text-center">
                        <div className="card-block">
                            <div className="card-title">選單</div>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to="settings/work-dashboard" className="nav-link" activeClassName="active">工作項目</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="settings/subcontractor-dashboard" className="nav-link disabled" activeClassName="active">協力廠商</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-9 col-lg-10">
                    <WorkItemTable workId={this.props.location.query.work_id} />
                </div>
            </div>
        )
    }
}
