import React, {Component} from 'react'
import {Link} from 'react-router'
import LoginForm from 'components/LoginForm'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="row align-self-center">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">登入</div>
                        <div className="card-block">
                            <LoginForm onLogin={this.onLogin}>
                                <Link to={"register"} className="btn btn-link">還沒有帳號？點我註冊</Link>
                            </LoginForm>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
