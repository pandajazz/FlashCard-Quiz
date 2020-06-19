import React from 'react'
import FlashCard from './FlashCard'

const FlashCardList = ({ flashcards }) =>  (
        <div className="card-grid">
            {flashcards.map(flashcard => {
                const { id } = flashcard
                return <FlashCard flashcard={flashcard} key={id}/>
            })}
        </div>
    )

export default FlashCardList
