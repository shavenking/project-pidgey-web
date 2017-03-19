import React, {Component} from 'react'
import {AlertEmpty} from 'components/Alert'

export default class WorkItemStatsTable extends Component {
    render() {
        const hasData = !!this.props.stats.length

        return (
            <div className="card">
                <div className="card-header">花費類型統計表</div>
                <div className="card-block">
                    {!hasData && <AlertEmpty className="mb-0">新增工料項目後，會自動產生統計表！</AlertEmpty>}

                    {hasData && (
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>花費類型</th>
                                    <th>金額</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.stats.map(stats => (
                                    <tr key={stats.cost_type_id}>
                                        <td>{stats.cost_type_name}</td>
                                        <td>{stats.sum}</td>
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
