import React, {Component} from 'react'
import SideMenu from 'scenes/Settings/components/SideMenu'
import WorkItemTable from 'components/WorkItemTable'
import WorkItemStatsTable from 'components/WorkItemStatsTable'
import Modal from 'components/Modal'
import CreateWorkItemForm from 'components/CreateWorkItemForm'
import WorkItemStatsChart from 'components/WorkItemStatsChart'
import WorkItem from 'resources/WorkItem'

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
        WorkItem.delete(this.props.location.query.work_id, workItemId).then(() => {
            this.fetchData()
        })
    }

    onSubmit(form) {
        WorkItem.create(this.props.location.query.work_id, form).then(() => {
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
        WorkItem.list(workId).then(({data}) => {
            this.setState({workItems: data})
        })

        WorkItem.stats(workId).then(({data}) => {
            this.setState({stats: data.sort((a, b) => b.sum - a.sum)})
        })

        WorkItem.list().then(({data}) => {
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
                        <div className="col-6">
                            <WorkItemStatsTable stats={this.state.stats} />
                        </div>
                        <div className="col-6">
                            <WorkItemStatsChart stats={this.state.stats} />
                        </div>
                        <div className="col-12 mt-3">
                            <WorkItemTable workItems={this.state.workItems} onDelete={this.onDelete}>
                                <button type="button" className="btn btn-success" onClick={this.openModal}>新增工料項目</button>

                                <Modal show={this.state.showModal}>
                                    <CreateWorkItemForm suggestions={this.state.suggestions} onCancel={this.hideModal} onSubmit={this.onSubmit} />
                                </Modal>
                            </WorkItemTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
