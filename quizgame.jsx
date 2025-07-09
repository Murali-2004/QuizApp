import React, { useState } from 'react';

export default function QuizGame() {
    const [showInput, setShowInput] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedCorrect, setSelectedCorrect] = useState(false);

    const [questions, setQuestions] = useState([
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false },
            ],
        },
        {
            question: "What is the capital of Germany?",
            answers: [
                { text: "Berlin", correct: true },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: false },
                { text: "Madras", correct: false },
            ],
        },
        {
            question: "What is the capital of India?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: false },
                { text: "New Delhi", correct: true },
            ],
        },
        {
            question: "What is the capital of Italy?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: false },
                { text: "Rome", correct: true },
            ],
        },
    ]);

    const handleAnswer = (correct) => {
        setAnswered(true);
        setSelectedCorrect(correct);
    };

    const handleNext = () => {
        if (selectedCorrect) {
            setScore(score + 1);
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswered(false);
        setSelectedCorrect(false);
    };

    return (
        <div className="quiz-game-container">
            <header className="quiz-game-header">
                <h1>Quiz Game</h1>
                <button onClick={() => setShowInput(!showInput)}>
                    start

                </button>
            </header>
            {showInput && (
                <div className="quiz-game-questions">
                    {currentQuestionIndex < questions.length ? (
                        <div className="quiz-question">
                            <h2>{questions[currentQuestionIndex].question}</h2>
                            {questions[currentQuestionIndex].answers.map((answer, i) => (
                                <button
                                    key={i}
                                    onClick={() => !answered && handleAnswer(answer.correct)}
                                >
                                    {answer.text}
                                </button>
                            ))}
                            {answered && (
                                <button onClick={handleNext} style={{ marginTop: '16px' }}>Next</button>
                            )}
                        </div>
                    ) : (
                        <div className="quiz-finish">
                            <h2>Quiz Finished!</h2>
                            <p>Your Score: {score}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}