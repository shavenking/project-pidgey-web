import React, {Component} from 'react'
import {Link} from 'react-router'

export default class ProjectWorkTable extends Component {
    constructor(props) {
        super(props)

        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(e, workId) {
        e.preventDefault()

        if (this.props.onDelete) {
            this.props.onDelete(workId)
        }
    }

    render() {
        const works = this.props.works
        const hasWork = !!this.props.works.length

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>數量</th>
                        <th>單價</th>
                        <th>工程類別</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {works.map(({
                        id, project_id, name, amount, unit_price, engineering_type, engineering_type_main_title, engineering_type_detailing_title, unit_name
                    }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{amount}</td>
                            <td>${unit_price}/{unit_name}</td>
                            <td>{engineering_type_main_title} - {engineering_type_detailing_title}</td>
                            <td><Link to={`/projects/${project_id}/works/${id}/work-item-dashboard`}>單價分析表</Link></td>
                            <td>
                                <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-secondary" onClick={(e) => this.onDelete(e, id)}>
                                        <i className="fa fa-trash" /> 刪除
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}
