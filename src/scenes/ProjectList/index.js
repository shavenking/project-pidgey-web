import React, {Component} from 'react'
import {Link} from 'react-router'
import store from 'store'
import ProjectListTable from 'components/ProjectListTable'
import Project from 'resources/Project'
import Modal from 'components/Modal'
import CreateProjectForm from 'components/CreateProjectForm'
import {AlertEmpty} from 'components/Alert'

export default class ProjectList extends Component {
    constructor(props) {
        super(props)

        this.openModal = this.openModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.onCreated = this.onCreated.bind(this)
        this.onSearch = this.onSearch.bind(this)

        this.state = {
            projects: [],
            showModal: false,
            search: ''
        }
    }

    openModal() {this.setState({showModal: true})}
    hideModal() {this.setState({showModal: false})}

    onCreated(project) {
        this.hideModal()
        this.setState({search: project.name})

        Project.list().then(({data}) => {
            this.setState({
                projects: data,
            })
        })
    }

    onSearch(e) {
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount() {
        Project.list().then(({data}) => {
            this.setState({
                projects: data
            })
        })
    }

    render() {
        const projects = this.state.projects.filter(({name}) => {
            return !this.state.search.length || name.indexOf(this.state.search) !== -1
        })
        const hasProject = !!projects.length
        return (
            <div className="row">
                <div className="col-12">
                    <form className="form-inline mb-3" onSubmit={(e) => {e.preventDefault()}}>
                        <button type="button" className="btn btn-success mr-3" onClick={this.openModal}>新增專案</button>
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-search" /></span>
                            <input type="text" className="form-control" onChange={this.onSearch} value={this.state.search} />
                        </div>
                    </form>

                    <Modal show={this.state.showModal}>
                        <CreateProjectForm
                            onCreated={this.onCreated}
                            onCancel={this.hideModal}
                        >
                        </CreateProjectForm>
                    </Modal>

                    {hasProject || <AlertEmpty>請點選「新增專案」！</AlertEmpty>}

                    <ProjectListTable projects={projects} />
                </div>
            </div>
        )
    }
}
