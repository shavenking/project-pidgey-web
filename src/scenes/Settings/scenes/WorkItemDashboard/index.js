import React, {Component} from 'react'
import WorkItemTable from 'components/WorkItemTable'
import SideMenu from 'scenes/Settings/components/SideMenu'

export default class WorkItemDashboard extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-3 col-lg-2"><SideMenu /></div>
                <div className="col-9 col-lg-10">
                    <WorkItemTable workId={this.props.location.query.work_id} />
                </div>
            </div>
        )
    }
}
