import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import FlashCardList from './FlashCardList';

import './app.css'


function App() {

  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])


  function decodeString(string) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = string
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const { correct_answer, incorrect_answers, question } = questionItem
        const answer = decodeString(correct_answer)
        const options = [
          ...incorrect_answers.map( a => decodeString(a)), 
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
      console.log(res.data)
    })

  }

  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
          {categories.map(category => {
            const { id, name } = category
          return <option value={id} key={id}>{name}</option>
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Number of Questions</label>
        <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
      </div>
      <div className="form-group">
        <button className="btn">Generate</button>
      </div>
    </form>
    <div className="container">
    <FlashCardList flashcards={flashcards} />
    </div>
    </>
  );
}

export default App;
