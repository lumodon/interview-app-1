import React,{Component} from 'react'

export default class FormInput extends Component {

  changeHandler(event){
    this.props.onChange( this.props.tag, event.target.value )
  }

  render() {
    return (
        <div key={this.props.label} className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-text">{this.props.label}</label>
        <div className="uk-form-controls">
        <textarea value={this.props.value} rows="7" className="uk-textarea form-horizontal-text"
         type="text" id={this.props.label} placeholder={this.props.placeholder}
         onChange={this.changeHandler.bind(this)} />
        </div>
        </div>
    )
  }
}
