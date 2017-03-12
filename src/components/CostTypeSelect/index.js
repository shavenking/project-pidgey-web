import React, {Component} from 'react'

export default class CostTypeSelect extends Component {
    constructor(props) {
        super(props)

        this.getCostTypes = this.getCostTypes.bind(this)

        this.state = {
            costTypes: []
        }
    }

    getCostTypes() {
        return fetch(`/api/v1/cost-types`, {method: 'GET'}).then(rep => rep.json()).then(({data}) => {
            this.setState({costTypes: data})
        })
    }

    componentDidMount() {
        this.getCostTypes()
    }

    render() {
        if (!this.state.costTypes.length) {
            return <div></div>
        }

        return (
            <div className="form-group">
                {this.props.children}
                <select className="form-control" name="cost_type_id">
                    {this.state.costTypes.map(({id, name}) => {
                        return <option key={id} value={id}>{name}</option>
                    })}
                </select>
            </div>
        )
    }
}
