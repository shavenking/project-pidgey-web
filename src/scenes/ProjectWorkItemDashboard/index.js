import React, {Component} from 'react'
import ProjectSideMenu from 'components/ProjectSideMenu'
import WorkItemTable from 'components/WorkItemTable'
import WorkItemStatsTable from 'components/WorkItemStatsTable'
import Modal from 'components/Modal'
import CreateWorkItemForm from 'components/CreateWorkItemForm'
import WorkItemStatsChart from 'components/WorkItemStatsChart'
import WorkItem from 'resources/WorkItem'
import ProjectWorkItem from 'resources/ProjectWorkItem'

export default class ProjectWorkItemDashboard extends Component {
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
        const {projectId, workId} = this.props.params

        ProjectWorkItem.delete(projectId, workId, workItemId).then(() => {
            this.fetchData()
        })
    }

    onSubmit(form) {
        const {projectId, workId} = this.props.params

        ProjectWorkItem.create(projectId, workId, form).then(() => {this.fetchData()})

        this.hideModal()
    }

    hideModal() {
        this.setState({showModal: false})
    }

    openModal() {
        this.setState({showModal: true})
    }

    fetchData() {
        const {projectId, workId} = this.props.params

        ProjectWorkItem.list(projectId, workId).then(({data}) => {
            this.setState({workItems: data})
        })

        ProjectWorkItem.stats(projectId, workId).then(({data}) => {
            this.setState({stats: data.sort((a, b) => b.sum - a.sum)})
        })

        WorkItem.list().then(({data}) => {
            this.setState({suggestions: data})
        })

        ProjectWorkItem.list(projectId).then(({data}) => {
            this.setState({suggestions: this.state.suggestions.concat(data)})
        })
    }

    componentDidMount() {this.fetchData()}

    render() {
        return (
            <div className="row">
                <div className="col-3 col-lg-2"><ProjectSideMenu projectId={this.props.params.projectId} /></div>
                <div className="col-9 col-lg-10">
                    <div className="row">
                        <div className="col-12">
                            <WorkItemTable workItems={this.state.workItems} onDelete={this.onDelete}>
                                <button type="button" className="btn btn-success" onClick={this.openModal}>新增工料項目</button>

                                <Modal show={this.state.showModal}>
                                    <CreateWorkItemForm
                                        suggestions={this.state.suggestions}
                                        onCancel={this.hideModal}
                                        onSubmit={this.onSubmit}
                                    />
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
