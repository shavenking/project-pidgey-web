import React, {Component} from 'react'
import EngineeringTypeSelect from 'components/EngineeringTypeSelect'
import UnitSelect from 'components/UnitSelect'
import formSerialize from 'form-serialize'

export default class CreateProjectWorkForm extends Component {
    constructor(props) {
        super(props)

        this.onSearch = this.onSearch.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this)

        this.state = {
            workItemName: '',
            topFiveSuggestions: [],
            selectedId: ''
        }
    }

    onSearch(e) {
        const newName = e.target.value.trim()

        if (!newName.length) {
            this.setState({
                topFiveSuggestions: this.props.suggestions.slice(0, 5)
            })
        }

        const topFiveSuggestions = this.props.suggestions.filter(function ({name}) {
            return name.indexOf(newName) !== -1
        }).slice(0, 5)

        this.setState({topFiveSuggestions, selectedId: ''})
    }

    onSubmit(e) {
        e.preventDefault()

       const form = formSerialize(e.target, {hash: true})

       if (this.props.onSubmit) {
            this.props.onSubmit(form)
       }
    }

    onCancel(e) {
        e.preventDefault()

        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    onSuggestionSelected(e) {
        const selectedId = e.target.value

        this.setState({selectedId})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.suggestions !== nextProps.suggestions) {
            this.setState({
                topFiveSuggestions: nextProps.suggestions.slice(0, 5)
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>名稱（可以輸入名稱搜尋或是新增）</label>
                    <input type="text" className="form-control" name="name" onChange={this.onSearch} autoComplete="off"/>
                </div>
                <div className="form-group">
                    <label>快速選擇</label>

                    {!!this.state.topFiveSuggestions.length || (
                        <p className="text-info">目前無相關資料，請繼續輸入下方資料新增！</p>
                    )}

                    {!!this.state.topFiveSuggestions.length && this.state.topFiveSuggestions.map(({id, name, engineering_type, amount, unit_price, unit}, idx) => (
                       <div className="form-check" key={idx}>
                            <label className="form-check-label">
                                <input
                                    type="radio"
                                    className="form-check-input mr-1"
                                    name="work_id"
                                    value={id}
                                    onChange={this.onSuggestionSelected}
                                    checked={id == this.state.selectedId}
                                />
                                {name}, 單價約 ${unit_price}/{unit.name}, {engineering_type.main_title} - {engineering_type.detailing_title}
                            </label>
                       </div>
                    ))}
                </div>
                <div className="form-group">
                    <label>數量</label>
                    <input type="text" className="form-control" name="amount" autoComplete="off" />
                </div>
                {!!this.state.selectedId || (
                    <UnitSelect>
                        <label>請選擇單位：</label>
                    </UnitSelect>
                )}
                {!!this.state.selectedId || (
                    <div className="form-group">
                        <label>工程類別</label>
                        <EngineeringTypeSelect />
                    </div>
                )}
                <button type="submit" className="btn btn-success">新增工項</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={this.onCancel}>取消</button>
            </form>
        )
    }
}
