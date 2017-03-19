import React, {Component} from 'react'
import {AlertEmpty} from 'components/Alert'
import Chart from 'chart.js'
import classNames from 'classnames'

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
        const canvasClass = classNames({'hidden-xs-up': !hasData})

        return (
            <div className="card h-100">
                <div className="card-header">花費類型長條圖</div>
                <div className="card-block">
                    {!hasData && <AlertEmpty className="mb-0">新增工料項目後，會自動產生統計圖！</AlertEmpty>}

                    <canvas className={canvasClass} ref={component => this.canvas = component} />
                </div>
            </div>
        )
    }
}
