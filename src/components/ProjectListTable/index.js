import React, {Component} from 'react'
import {Link} from 'react-router'
import Project from 'resources/Project'

export default class ProjectListTable extends Component {
    render() {
        const hasProject = !!this.props.projects.length

        return (
            <div className="card-columns">
                {hasProject && this.props.projects.map(({id, name, created_at}) => (
                    <div className="card text-center" key={id}>
                        <div className="card-block">
                            <h4 className="card-title">{name}</h4>
                            <Link to={`/projects/${id}/dashboard`} className="btn btn-primary">
                                進入專案
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
