import React, {Component} from 'react'
import formSerialize from 'form-serialize'
import Auth from 'resources/Auth'
import store from 'store'

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()

        const form = formSerialize(e.target, {hash: true})

        Auth.register(form).then(({data}) => {
            store.set('token', data.token)

            if (this.props.onRegister) {
                this.props.onRegister(data)
            }
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>信箱</label>
                    <input type="text" className="form-control" name="email" />
                </div>
                <div className="form-group">
                    <label>名稱</label>
                    <input type="text" className="form-control" name="name" />
                </div>
                <div className="form-group">
                    <label>密碼</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-success">註冊</button>
                {this.props.children}
            </form>
        )
    }
}
