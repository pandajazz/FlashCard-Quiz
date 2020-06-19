import React, { useState } from 'react'

function FlashCard({ flashcard }) {
    const { question, answer, options } = flashcard
    const [flip, setFlip] = useState(false)

        return (
        <div 
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}>
        <div className="front">
        {question}
        <div className="flashcard-options">
            {options.map(option => {
                return <div className="flashcard-option" key={option}>
                    {option}
                    </div>
            })}
        </div>
        </div>
        <div className="back">{answer}</div>
            {/* {flip ? answer : question} */}
        </div>
    )
}

export default FlashCard
