import React, {Component} from 'react'
import WorkTable from 'components/WorkTable'
import SideMenu from 'scenes/Settings/components/SideMenu'

class WorkDashboard extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-3 col-lg-2"><SideMenu /></div>
                <div className="col-9 col-lg-10">
                    <WorkTable />
                </div>
            </div>
        )
    }
}

export default WorkDashboard
