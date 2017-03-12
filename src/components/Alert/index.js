import React, {Component} from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'

export class AlertEmpty extends Component {
    render() {
        const classnames = classNames('alert', 'alert-info', this.props.className)

        return (
            <div className={classnames}>
                <strong>說明：</strong>目前還沒有任何資料{!!this.props.children && `，${this.props.children}`}
            </div>
        )
    }
}
