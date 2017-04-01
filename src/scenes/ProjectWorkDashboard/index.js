import React, {Component} from 'react'
import ProjectWorkTable from 'components/ProjectWorkTable'
import ProjectSideMenu from 'components/ProjectSideMenu'
import ProjectWork from 'resources/ProjectWork'
import {AlertEmpty} from 'components/Alert'
import CreateProjectWorkForm from 'components/CreateProjectWorkForm'
import Modal from 'components/Modal'
import Work from 'resources/Work'
import WorkItemStatsTable from 'components/WorkItemStatsTable'
import WorkItemStatsChart from 'components/WorkItemStatsChart'

export default class ProjectWorkDashboard extends Component {
    constructor(props) {
        super(props)

        this.fetchWorks = this.fetchWorks.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            works: [],
            showModal: false,
            suggestions: [],
            stats: {
                total: '0.00',
                costTypes: []
            }
        }
    }

    fetchWorks() {
        ProjectWork.list(this.props.params.projectId).then(({data}) => {
            this.setState({works: data})
        })

        Work.list().then(({data}) => {
            this.setState({suggestions: data})
        })

        ProjectWork.stats(this.props.params.projectId).then(({data}) => {
            this.setState({stats: data})
        })
    }

    onDelete(id) {
        ProjectWork.delete(this.props.params.projectId, id).then(() => {
            this.fetchWorks()
        })
    }

    showModal() {this.setState({showModal: true})}

    hideModal() {this.setState({showModal: false})}

    onSubmit(form) {
        ProjectWork.create(this.props.params.projectId, form).then(() => {
            this.fetchWorks()
            this.hideModal()
        })
    }

    componentDidMount() {this.fetchWorks()}

    render() {
        const projectId = this.props.params.projectId
        const works = this.state.works
        const hasWork = !!this.state.works.length

        return (
            <div className="row">
                <div className="col-3 col-lg-2"><ProjectSideMenu projectId={projectId} /></div>
                <div className="col-9 col-lg-10">
                    <div className="row">
                        <div className="col-12">
                            <h2>總價 ${this.state.stats.total}</h2>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <WorkItemStatsTable stats={this.state.stats.costTypes}>
                            </WorkItemStatsTable>
                        </div>
                        <div className="col-6">
                            <WorkItemStatsChart stats={this.state.stats.costTypes} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="card h-100">
                                <div className="card-header">工作項目列表</div>
                                <div className="card-block">
                                    <button type="button" className="btn btn-success mb-3" onClick={this.showModal}>新增工作項目</button>
                                    <Modal show={this.state.showModal}>
                                        <CreateProjectWorkForm
                                            suggestions={this.state.suggestions}
                                            onSubmit={this.onSubmit}
                                            onCancel={this.hideModal}
                                        >
                                        </CreateProjectWorkForm>
                                    </Modal>

                                    {hasWork || <AlertEmpty className="mb-0">請點選「新增工作項目」！</AlertEmpty>}

                                    {hasWork && <ProjectWorkTable works={works} onDelete={this.onDelete} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
