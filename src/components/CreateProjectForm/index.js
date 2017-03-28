import React, {Component} from 'react'
import formSerialize from 'form-serialize'
import Project from 'resources/Project'

export default class CreateProjectForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()

       const form = formSerialize(e.target, {hash: true})

       Project.create(form).then(({data}) => {
            if (this.props.onCreated) {
                this.props.onCreated(data)
            }
       })
    }

    onCancel(e) {
        e.preventDefault()

        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>專案名稱</label>
                    <input type="text" className="form-control" name="name" autoComplete="off"/>
                </div>
                <button type="submit" className="btn btn-success">新增專案</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={this.onCancel}>取消</button>
            </form>
        )
    }
}
