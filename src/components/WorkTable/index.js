import React, {Component} from 'react'
import {Link} from 'react-router'
import {AlertEmpty} from 'components/Alert'
import Modal from 'components/Modal'
import formSerialize from 'form-serialize'

class EngineeringTypeSelect extends Component {
    constructor(props) {
        super(props)
        this.fetchEngineeringTypes = this.fetchEngineeringTypes.bind(this)

        this.state = {
            engineeringTypes: []
        }
    }

    fetchEngineeringTypes() {
        fetch(`/api/v1/engineering-types`, {method: 'GET'}).then(rep => rep.json()).then(({data}) => {
            this.setState({engineeringTypes: data})
        })
    }

    componentDidMount() {this.fetchEngineeringTypes()}

    render() {
        const options = this.state.engineeringTypes.map(({id, main_title, detailing_title}) => {
            return <option value={id} key={id}>{main_title} - {detailing_title}</option>
        })

        return <select className="form-control" name="engineering_type_id">{options}</select>
    }
}

const createWork = function (form) {
    return fetch(`/api/v1/works`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
    })
}

export default class WorkTable extends Component {
    constructor(props) {
        super(props)

        this.fetchWorks = this.fetchWorks.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.state = {
            works: [],
            showModal: false
        }
    }

    fetchWorks() {
        return fetch(`/api/v1/works`, {method: 'GET'}).then(rep => rep.json()).then(({data}) => {
            this.setState({works: data})
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const form = formSerialize(e.target, {hash: true})

        createWork(form).then(rep => rep.json()).then(() => {
            this.fetchWorks()
            this.setState({showModal: false})
        })
    }

    handleClick(e) {
        e.preventDefault()

        this.setState({showModal: true})
    }

    hideModal(e) {
        e.preventDefault()

        this.setState({showModal: false})
    }

    componentDidMount() {this.fetchWorks()}

    render() {
        const hasData = !!this.state.works.length
        return (
            <div className="card h-100">
                <div className="card-header">工作項目列表</div>
                <div className="card-block">
                    <button type="button" className="btn btn-success pull-right" onClick={this.handleClick}>新增工項</button>

                    {hasData || <AlertEmpty className="mb-0 mt-3">請點選「新增工項」！</AlertEmpty>}

                    {hasData && (
                        <table className="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>名稱</th>
                                    <th>數量</th>
                                    <th>單價</th>
                                    <th>工程類別</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.works.map(({id, name, amount, unit_price, engineering_type}) => (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{amount}</td>
                                        <td>{unit_price}</td>
                                        <td>{engineering_type.main_title} - {engineering_type.detailing_title}</td>
                                        <td><Link to={`settings/work-item-dashboard?work_id=${id}`}>單價分析表</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <Modal show={this.state.showModal}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>名稱</label>
                                <input type="text" className="form-control" name="name" />
                            </div>
                            <div className="form-group">
                                <label>數量</label>
                                <input type="text" className="form-control" name="amount" />
                            </div>
                            <div className="form-group">
                                <label>單價</label>
                                <input type="text" className="form-control" name="unit_price" value="0" disabled />
                            </div>
                            <div className="form-group">
                                <label>工程類別</label>
                                <EngineeringTypeSelect />
                            </div>
                            <button type="submit" className="btn btn-success">新增工項</button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={this.hideModal}>取消</button>
                        </form>
                    </Modal>
                </div>
            </div>
        )
    }
}
