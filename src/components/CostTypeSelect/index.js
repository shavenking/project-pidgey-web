import React, {Component} from 'react'
import CostType from 'resources/CostType'

export default class CostTypeSelect extends Component {
    constructor(props) {
        super(props)

        this.getCostTypes = this.getCostTypes.bind(this)

        this.state = {
            costTypes: []
        }
    }

    getCostTypes() {
        return CostType.list().then(({data}) => {
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
