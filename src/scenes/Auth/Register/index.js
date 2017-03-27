import React, {Component} from 'react'
import {Link} from 'react-router'
import RegisterForm from 'components/RegisterForm'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.onRegister = this.onRegister.bind(this)
    }

    onRegister() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">註冊</div>
                        <div className="card-block">
                            <RegisterForm onRegister={this.onRegister}>
                                <Link to={"/login"} className="btn btn-link">已有帳號？點我登入</Link>
                            </RegisterForm>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
