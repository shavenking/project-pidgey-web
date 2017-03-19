import React, {Component} from 'react'
import {Link} from 'react-router'
import {AlertEmpty} from 'components/Alert'

export default class WorkItemTable extends Component {
    render() {
        const {workItems} = this.props
        const hasData = !!workItems.length

        return (
            <div className="card">
                <div className="card-header">單價分析表</div>
                <div className="card-block">
                    {this.props.children}

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
                                {workItems.map(({id, name, amount, unit_price, unit_name, cost_type_name}) => (
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
                </div>
            </div>
        )
    }
}
