import React, {Component} from 'react'
import EngineeringType from 'resources/EngineeringType'

export default class EngineeringTypeSelect extends Component {
    constructor(props) {
        super(props)
        this.fetchEngineeringTypes = this.fetchEngineeringTypes.bind(this)

        this.state = {
            engineeringTypes: []
        }
    }

    fetchEngineeringTypes() {
        EngineeringType.list().then(({data}) => {
            this.setState({engineeringTypes: data})
        })
    }

    componentDidMount() {this.fetchEngineeringTypes()}

    render() {
        const options = this.state.engineeringTypes.map(({id, main_title, detailing_title}) => {
            return <option value={id} key={id}>{main_title} - {detailing_title}</option>
        })

        return <select className="form-control" name="engineering_type_id">{options}</select>
    }
}
