import React, {Component} from 'react'
import SideMenu from 'scenes/Settings/components/SideMenu'
import WorkItemTable from 'components/WorkItemTable'
import WorkItemStatsTable from 'components/WorkItemStatsTable'
import Modal from 'components/Modal'
import CreateWorkItemForm from 'components/CreateWorkItemForm'
import WorkItemStatsChart from 'components/WorkItemStatsChart'

const fetchWorkItems = function (workId) {
    if (!workId) {
        return fetch('/api/v1/work-items', {method: 'GET'}).then(rep => rep.json())
    }

    return fetch(`/api/v1/works/${workId}/work-items`, {method: 'GET'}).then(rep => rep.json())
}

const fetchWorkItemStats = function (workId) {
    return fetch(`/api/v1/works/${workId}/work-items/stats`, {method: 'GET'}).then(rep => rep.json())
}

const createWorkItem = function (workId, form) {
    return fetch(`/api/v1/works/${workId}/work-items`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(form)
    }).then(rep => rep.json())
}

const deleteWorkItem = function (workId, workItemId) {
    return fetch(`/api/v1/works/${workId}/work-items/${workItemId}`, {method: 'DELETE'})
}

export default class WorkItemDashboard extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.openModal = this.openModal.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            workItems: [],
            suggestions: [],
            stats: [],
            showModal: false
        }
    }

    onDelete(workItemId) {
        deleteWorkItem(this.props.location.query.work_id, workItemId).then(() => {
            this.fetchData()
        })
    }

    onSubmit(form) {
        createWorkItem(this.props.location.query.work_id, form).then(() => {
            this.fetchData()
        })

        this.hideModal()
    }

    hideModal() {
        this.setState({showModal: false})
    }

    openModal() {
        this.setState({showModal: true})
    }

    fetchData() {
        const workId = this.props.location.query.work_id
        fetchWorkItems(workId).then(({data}) => {
            this.setState({workItems: data})
        })

        fetchWorkItemStats(workId).then(({data}) => {
            this.setState({stats: data.sort((a, b) => b.sum - a.sum)})
        })

        fetchWorkItems().then(({data}) => {
            this.setState({suggestions: data})
        })
    }

    componentDidMount() {this.fetchData()}

    render() {
        const workId = this.props.location.query.work_id

        return (
            <div className="row">
                <div className="col-3 col-lg-2"><SideMenu /></div>
                <div className="col-9 col-lg-10">
                    <div className="row">
                        <div className="col-12">
                            <WorkItemTable workItems={this.state.workItems} onDelete={this.onDelete}>
                                <button type="button" className="btn btn-success" onClick={this.openModal}>新增工料項目</button>

                                <Modal show={this.state.showModal}>
                                    <CreateWorkItemForm suggestions={this.state.suggestions} onCancel={this.hideModal} onSubmit={this.onSubmit} />
                                </Modal>
                            </WorkItemTable>
                        </div>
                        <div className="col-6 mt-3">
                            <WorkItemStatsTable stats={this.state.stats} />
                        </div>
                        <div className="col-6 mt-3">
                            <WorkItemStatsChart stats={this.state.stats} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
