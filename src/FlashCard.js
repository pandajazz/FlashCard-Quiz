import React, { useState } from 'react'

function FlashCard({ flashcard }) {
    const { question, answer } = flashcard
    const [flip, setFlip] = useState(false)
        return (<div onClick={() => setFlip(!flip)}>
            {flip ? answer : question}
        </div>
    )
}

export default FlashCard
