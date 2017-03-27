import React, {Component} from 'react'
import formSerialize from 'form-serialize'
import Auth from 'resources/Auth'
import store from 'store'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()

        const form = formSerialize(e.target, {hash: true})

        Auth.login(form).then(({data}) => {
            store.set('token', data.token)

            if (this.props.onLogin) {
                this.props.onLogin(data)
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
                    <label>密碼</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-success">登入</button>
                {this.props.children}
            </form>
        )
    }
}
