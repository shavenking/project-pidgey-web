import React, {Component} from 'react'
import EngineeringTypeSelect from 'components/EngineeringTypeSelect'
import formSerialize from 'form-serialize'

export default class CreateProjectWorkForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()

       const form = formSerialize(e.target, {hash: true})

       if (this.props.onSubmit) {
            this.props.onSubmit(form)
       }
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
                    <label>名稱</label>
                    <input type="text" className="form-control" name="name" autoComplete="off" />
                </div>
                <div className="form-group">
                    <label>數量</label>
                    <input type="text" className="form-control" name="amount" autoComplete="off" />
                </div>
                <div className="form-group">
                    <label>工程類別</label>
                    <EngineeringTypeSelect />
                </div>
                <button type="submit" className="btn btn-success">新增工項</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={this.onCancel}>取消</button>
            </form>
        )
    }
}
