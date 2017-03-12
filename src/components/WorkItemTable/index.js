import React, {Component} from 'react'
import {Link} from 'react-router'
import {AlertEmpty} from 'components/Alert'
import Modal from 'components/Modal'
import CreateWorkItemForm from 'components/CreateWorkItemForm'

const fetchWorkItems = function (workId) {
    return fetch(`/api/v1/works/${workId}/work-items`, {
        method: 'GET',
    }).then(rep => rep.json())
}

export default class WorkItemTable extends Component {
    constructor(props) {
        super(props)

        this.fetchData = this.fetchData.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.afterSubmit = this.afterSubmit.bind(this)
        this.state = {
            workItems: [],
            showModal: false
        }
    }

    fetchData() {
        return fetchWorkItems(this.props.workId).then(({data}) => {
            this.setState({workItems: data})
        })
    }

    handleClick(e) {
        e.preventDefault()

        this.setState({showModal: true})
    }

    onCancel() {
        this.setState({showModal: false})
    }

    afterSubmit(workItem) {
        this.setState({
            workItems: [...this.state.workItems, workItem],
            showModal: false
        })
    }

    componentDidMount() {this.fetchData()}

    render() {
        const hasData = !!this.state.workItems.length

        return (
            <div className="card">
                <div className="card-header">單價分析表</div>
                <div className="card-block">
                    <button type="button" className="btn btn-success pull-right" onClick={this.handleClick}>新增工料項目</button>

                    {hasData || <AlertEmpty className="mb-0 mt-3">請點選「新增工料項目」！</AlertEmpty>}

                    {hasData && (
                        <table className="table table-hover mt-3">
                            <thead>
                                <tr>
                                    <th>名稱</th>
                                    <th>數量</th>
                                    <th>單價</th>
                                    <th>單位</th>
                                    <th>花費類型</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.workItems.map(({id, name, amount, unit_price, unit_name, cost_type_name}) => (
                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td>{amount}</td>
                                        <td>{unit_price}</td>
                                        <td>{unit_name}</td>
                                        <td>{cost_type_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <Modal show={this.state.showModal}>
                        <CreateWorkItemForm workId={this.props.workId} onCancel={this.onCancel} afterSubmit={this.afterSubmit} />
                    </Modal>
                </div>
            </div>
        )
    }
}
