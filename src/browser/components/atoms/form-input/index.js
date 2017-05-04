import React,{Component} from 'react'

export default class FormInput extends Component {

  changeHandler(event){
    this.props.onChange( this.props.tag, event.target.value )
  }

  render() {
    return (
      <div key={this.props.prompt} className="uk-margin">
        <label className="uk-form-label" htmlFor="form-horizontal-text">{this.props.prompt}</label>
        <div className="uk-form-controls">
          <input value={this.props.value} className="uk-input form-horizontal-text"
          type="text" id={this.props.prompt} placeholder={this.props.placeholder}
           onChange={this.changeHandler.bind(this)} />
        </div>
      </div>
    )
  }
}
