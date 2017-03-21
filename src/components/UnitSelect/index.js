import React, {Component} from 'react'
import Unit from 'resources/Unit'

export default class UnitSelect extends Component {
    constructor(props) {
        super(props)

        this.getUnits = this.getUnits.bind(this)

        this.state = {
            units: []
        }
    }

    getUnits() {
        return Unit.list().then(({data}) => {
            this.setState({units: data})
        })
    }

    componentDidMount() {
        this.getUnits()
    }

    render() {
        if (!this.state.units.length) {
            return <div></div>
        }

        return (
            <div className="form-group">
                {this.props.children}
                <select className="form-control" name="unit_id">
                    {this.state.units.map(({id, name}) => {
                        return <option key={id} value={id}>{name}</option>
                    })}
                </select>
            </div>
        )
    }
}
