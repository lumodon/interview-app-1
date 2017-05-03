import React, {Component} from 'react'
import flex from 'react-uikit-flex'

// import questions from '../../../../../data/questions.json'
import FormSelect from '../../atoms/form-select/index'
import Request from '../../common/requests'
import Form from '../../molecules/form/index'
import Layout from '../layout/index'

require('../../../../../public/stylesheets/uikit.min.css')

const inputModules = [
  {
    "type"       : "Input",
    "placeholder": "Enter your question",
    "prompt"     : "Question",
    "tag"        : "question",
    "value"      : ""
  },
  {
    "type"       : "Input",
    "placeholder": "Answer it thoroughly",
    "prompt"     : "Answer",
    "tag"        : "answer",
    "value"      : ""
  },
  {
    "type"            : "Select",
    "prompt"          : "Game Mode",
    "options"         : ['Questions & Answers', 'White Boarding', 'Debugging', 'Coding Challenge'],
    "tag"             : "game_mode",
    "isOptionRequired": true,
    "chooseSelect"    : ""
  },
  {
    "type"   : "Checkbox",
    "options": [],
    "prompt" : "Topics",
    "tag"    : "topics",
    "checked": []
  },
  {
    "type"   : "Radio",
    "options": ["Beginner", "Intermediate", "Advanced", "Jedi"],
    "prompt" : "Difficulty Level",
    "tag"    : "level",
    "checked": ""
  },
  {
    "type"            : "Select",
    "prompt"          : "Points",
    "options"         : [1, 2, 3, 4, 5],
    "tag"             : "points",
    "isOptionRequired": true,
    "chooseSelect"    : ""
  },
  {
    "type"            : "Hint",
    "prompt"          : "Hints",
    "tag"             : "hints",
    "placeholder"     : "Write a helpfull hint"
  }
]


export default class ApprovalPage extends Component {
  constructor(props) {
    super(props)
    this.state = {questions: [], id: 0, filter: "All", triggerState: true, currentQuestion: null}
    this.inputModules = inputModules
    this.inputModules[3].options = this.props.topics
  }


  componentDidMount(){
    Request.getDatabaseQuestions('/api/questions/approval').then(questions => {
      this.setState(Object.assign(this.state, {questions: questions}))
    })
  }

  onClickDelete(index){
    const deleteConfirm = confirm("Are you sure you want to delete this question?")
    if (deleteConfirm) {
      let questArr = this.state.questions
      questArr.splice(this.refs[index], 1)
      this.setState({questions: questArr})
      Request.deleteQuestion('/api/questions/approval/:id').then(question => {
        return question
      })
    }
    else console.log('All love to MurphyCat')
  }

    setCurrentQuestion(index){
    this.setState({currentQuestion: this.state.questions[index]})
  }

// NEEDS WORK!
  submitQuestionEdits(formData) {
    Request.put('/api/questions/approval' + "/" + this.state.id, formData)
  }

  handleChange(property, event) {
    let targetValue = event.target.value
    if(targetValue === '') {
      targetValue = 'All'
    }
    this.setState({[property]: targetValue});
  }

  renderQuestions(){
    return (
      this.state.questions.map((question, index) => {
        let approvalState = this.state.filter
        if(approvalState === question.approval || approvalState === 'All') {
          return (
            <div key={`question-${index}`}>
              <div>
                <button className="uk-button-small uk-button-danger" onClick={this.onClickDelete.bind(this, index)} ref={index} type="button" >Delete this question</button>
                <button ref={index} className="uk-button uk-button-default uk-margin-small-right" type="button" onClick={this.setCurrentQuestion.bind(this, index)} >{question.question}</button>
              </div>
            </div>
          )
        }
      })
    )
  }

  render() {
    const filterArray = ['All', 'Approved', 'Pending']
    let content = this.renderQuestions()
    return (
      <div className="uk-container" >
        <Layout profile={this.props.profile} stats={this.props.stats}>
            <div className="uk-grid-match uk-child-width-1-2 uk-padding" data-uk-grid>
              <div className="uk-card uk-card-default uk-card-body">
                Click to edit the following questions:
                <br></br>
                <FormSelect options={filterArray} label='Filter' onChange={this.handleChange.bind(this, 'filter')}/>
                <br></br>
                {content}
              </div>
              <br></br>
              <div className="uk-card uk-card-default uk-card-body">
                <Form inputModules={this.inputModules} onSubmit={this.submitQuestionEdits} initialValue={this.state.currentQuestion} />
              </div>
            </div>
        </Layout>
      </div>
    )
  }
}

// When individual question is clicked, modal opens
// When modal opens, question properties populate (read)
// When edit button is selected, question form becomes editable (update)
