import React, {Component} from 'react'
import {AlertEmpty} from 'components/Alert'
import Chart from 'chart.js'

export default class WorkItemStatsChart extends Component {
    componentWillReceiveProps(newProps) {
        if (!this.canvas) return

        if (this.chart && (this.props.stats === newProps.stats)) return

        if (this.chart) {this.chart.destroy()}

        this.chart = new Chart(this.canvas, {
            type: 'horizontalBar',
            data: {
                labels: [...newProps.stats.map(stats => stats.cost_type_name)],
                datasets: [
                    {
                        data: [...newProps.stats.map(stats => stats.sum)]
                    }
                ]
            },
            options: {
                legend: {display: false}
            }
        })
    }

    render() {
        const hasData = !!this.props.stats.length

        return (
            <div className="card">
                <div className="card-header">花費類型長條圖</div>
                <div className="card-block">
                    {!hasData && <AlertEmpty className="mb-0">新增工料項目後，會自動產生圓餅圖！</AlertEmpty>}

                    {hasData && <canvas ref={component => this.canvas = component} />}
                </div>
            </div>
        )
    }
}
