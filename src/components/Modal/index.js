import React, {Component} from 'react'

export default class Modal extends Component {
    constructor(props) {
        super(props)

        this.setModalRef = this.setModalRef.bind(this)
        this.$modal = null
    }

    componentDidUpdate() {
        if (!this.$modal) {
            return true
        }

        if (this.props.show && !this.$modal.hasClass('show')) {
            this.$modal.modal('show')
        }

        if (!this.props.show && this.$modal.hasClass('show')) {
            this.$modal.modal('hide')
        }
    }

    setModalRef(modal) {
        if (!this.$modal) {
            this.$modal = $(modal)
        }
    }

    render() {
        return (
            <div className="modal fade" ref={this.setModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
