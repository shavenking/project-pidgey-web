import React, {Component} from 'react'
import UnitSelect from 'components/UnitSelect'
import CostTypeSelect from 'components/CostTypeSelect'
import formSerialize from 'form-serialize'

const fetchWorkItems = function () {
    return fetch(`/api/v1/work-items`, {
        method: 'GET'
    }).then(rep => rep.json())
}

export default class CreateWorkItemForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
        this.onCancel = this.onCancel.bind(this)

        this.state = {
            workItemName: '',
            topFiveSuggestions: [],
            selectedId: null
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        if (this.props.beforeSubmit && false === this.props.beforeSubmit()) {
            return false
        }

       const form = formSerialize(e.target, {hash: true})
       fetch(`/api/v1/works/${this.props.workId}/work-items`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(form)
       }).then(rep => rep.json()).then(({data}) => {
            if (this.props.afterSubmit) {
                this.props.afterSubmit(data)
            }
       })
    }

    onCancel(e) {
        e.preventDefault()

        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    handleChange(e) {
        const newName = e.target.value.trim()

        if (!newName.length) {
            this.setState({
                topFiveSuggestions: this.state.allSuggestions.slice(0, 5)
            })
        }

        const topFiveSuggestions = this.state.allSuggestions.filter(function ({name}) {
            return name.indexOf(newName) !== -1
        }).slice(0, 5)

        this.setState({topFiveSuggestions, selectedId: null})
    }

    onSuggestionSelected(e) {
        const selectedId = e.target.value

        this.setState({selectedId})
    }

    componentDidMount() {
        fetchWorkItems().then(({data}) => {
            this.setState({
                allSuggestions: data,
                topFiveSuggestions: data.slice(0, 5)
            })
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>名稱（可以輸入名稱搜尋或是新增工料項目）</label>
                    <input type="text" className="form-control" name="name" onChange={this.handleChange} autoComplete="off"/>
                </div>
                <div className="form-group">
                    <label>快速選擇</label>

                    {!!this.state.topFiveSuggestions.length || (
                        <p className="text-info">目前無相關工料項目，請繼續輸入下方資料新增工料項目！</p>
                    )}

                    {!!this.state.topFiveSuggestions.length && this.state.topFiveSuggestions.map(({id, name, cost_type_name, unit_name}) => (
                       <div className="form-check" key={id}>
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input mr-1" name="work_item_id" value={id} onChange={this.onSuggestionSelected} checked={id == this.state.selectedId} />
                                {name} - {unit_name} - {cost_type_name}
                            </label>
                       </div>
                    ))}
                </div>
                <div className="form-group">
                    <label>數量</label>
                    <input type="text" className="form-control" name="amount" />
                </div>
                <div className="form-group">
                    <label>單價</label>
                    <input type="text" className="form-control" name="unit_price" />
                </div>
                {!!this.state.selectedId || (
                    <UnitSelect value={this.state.unit_id} disabled={!!this.state.cost_type_id}>
                        <label>請選擇單位：</label>
                    </UnitSelect>
                )}
                {!!this.state.selectedId || (
                    <CostTypeSelect value={this.state.cost_type_id} disabled={!!this.state.cost_type_id}>
                        <label>請選擇花費類型：</label>
                    </CostTypeSelect>
                )}
                <button type="submit" className="btn btn-success">新增工項</button>
                <button type="button" className="btn btn-default ml-2" onClick={this.onCancel}>取消</button>
            </form>
        )
    }
}
