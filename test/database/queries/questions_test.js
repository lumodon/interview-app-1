import chai, { expect } from 'chai'
import * as question from '../../../src/database/queries/questions'

describe('Question Tests', () => {

  const newQuestion = [
    {
      question: "What is the number that represents the meaning of life",
      topics: ["core-javascript", "functional-programming"],
      level: "Beginner",
      answer: "42",
      game_mode: "Questions and Answers",
      hints: ["Hitchhiking", "Galaxy"],
      points: 1
    },
    {
      question: "What is the most inefficient algorithm",
      topics: ["functional-programming"],
      level: "Intermediate",
      answer: "THE ALGORITHM",
      game_mode: "Debugging",
      hints: ["BubbleSort", "LearnersGuild", "#LGPROBLEMS"],
      points: 3
    },
    {
      question: "What is the most inefficient algorithm",
      topics: ["functional-programming"],
      level: "Intermediate",
      answer: "THE ALGORITHM",
      game_mode: "Debugging",
      hints: ["BubbleSort", "LearnersGuild", "#LGPROBLEMS"],
      points: 3
    }
  ]

  it('Should be type object', () => {
    expect(question).to.be.a('object')
  })

  describe.only('create a Q', () => {
    it('should create a Q, not a queue', () => {
      return question.create( newQuestion[0] )
        .then( question => {
          console.log("question[0]", question[0]);
          expect(question[0].question).to.equal('What is the number that represents the meaning of life')
          expect(question[0].topics).to.eql(["core-javascript", "functional-programming"])
          expect(question[0].points).to.eql(1)
        })
    })
  })

  describe.only('update by ID', () => {
    it('should update a question by the ID', () => {
      return question.create( newQuestion[2] )
      .then( () => {
        return question.updatebyID( '2', {level: '1000'} )
        .then( question => {
          expect(question[0].level).to.equal('1000')
        })
      })
    })
  })

  describe('find by topic', () => {
    it('should find a question by the topic', () => {
      return Promise.all([question.create( newQuestion[1] ), question.create( newQuestion[0])])

        .then( () => {
          return question.findbyTopic(["woodchuckin", "existentialism"])
          .then( question => {
            expect(question[0].level).to.equal('10')
            expect(question[1].topics[1]).to.equal('pepperoni')
            expect(question.length).to.equal(2)
          })
        })
    })
  })

  describe('find by Level', () => {
    it('should find a question by the level', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.findbyLevel( "9" )
          .then( question => {
            expect(question[0].topics[0]).to.equal("woodchuckin")
          })
        })
    })
  })

  describe('find by ID', () => {
    it('should find a question by the ID', () => {
      return question.create( newQuestion[1] )
        .then( () => {
          return question.findbyID( 1 )
          .then( question => {
            expect(question[0].topics[0]).to.equal("existentialism")
          })
        })
    })
  })

  describe('update by Level', () => {
    it('should update a question by the level', () => {
      return question.create( newQuestion[2] )
        .then( () => {
          return question.updatebyLevel( '0', {level: '1000'} )
          .then( question => {
            expect(question[0].level).to.equal('1000')
          })
        })
    })
  })

  describe('delete by Question', () => {
    it('should delete a question', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.deleteByQuestion( "What is the number that represents the meaning of life" )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })


  describe('delete by ID', () => {
    it('should delete by ID', () => {
      return question.create( newQuestion[0] )
        .then( () => {
          return question.deleteByID( '1', "yes" )
          .then( question => {
            expect(question[0]).to.equal( undefined )
          })
        })
    })
  })

})
