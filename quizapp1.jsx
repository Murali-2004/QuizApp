import React, { useState } from 'react';
import './quizapp1.css';
import Result from './result';
export default function QuizGame1() {

    const [showInput, setShowInput] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedCorrect, setSelectedCorrect] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [ans, setAns] = useState([]);

    const [questions, setQuestions] = useState([
        {
            question: "what is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false }
            ]
        },
        {
            question: "What is the capital of Germany?",
            answers: [
                { text: "Berlin", correct: true },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: false },
                { text: "Madras", correct: false }
            ]
        },
        {
            question: "What is the capital of India?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: false },
                { text: "New Delhi", correct: true }
            ]
        },
        {
            question: "What is the capital of Italy?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: false },
                { text: "Rome", correct: true }
            ]
        }

    ])

    function handleAnswer(correct, index, answertext) {
        setAnswered(true);
        setSelectedCorrect(correct);
        setSelectedIndex(index);
        setAns(prev => {
            const updated = [...prev];
            updated[currentQuestionIndex] = answertext;
            return updated;
        });

    }
    const handleChange = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswered(false);
        setSelectedCorrect(false);
        setSelectedIndex(null);
    }
    const handlePrev = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setAnswered(false);
        setSelectedCorrect(false);
        setSelectedIndex(null);
    }
    const handleSubmit = () => {
        setAns(ans => {
            const newone = [...ans];
            let total = 0
            for (let i = 0; i < questions.length; i++) {
                if (newone[i] === undefined) {
                    newone[i] = "Not answered";
                }
                if (ans[i] === questions[i].answers.find(answer => answer.correct).text) {
                    total++;
                }
            }
            setScore(total);
            return newone;
        })
        setCurrentQuestionIndex(questions.length);
    }

    // Helper function to get button class
    function getBtnClass(answered, selectedIndex, index) {
        if (answered && selectedIndex === index) {
            return "select";
        }
        return "no";
    }

    return (
        <div className="quiz-game">
            <header className="quiz-header">
                <h1>Quiz Game</h1>
            </header>
            {!showInput && <div className='welcome'>
                <h1>Welcome to the Quiz Game</h1>
                <p>Test your knowledge with a series of questions.</p>
                <button onClick={() => setShowInput(true)}>start</button>
            </div>}
            {showInput && (
                currentQuestionIndex < questions.length ? (
                    <div className='quiz-container'>
                        <div className='quiz-content'>
                            <h2>{questions[currentQuestionIndex].question}</h2>
                            {questions[currentQuestionIndex].answers.map((answer, index) => {
                                const btnClass = getBtnClass(answered, selectedIndex, index);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(answer.correct, index, answer.text)}
                                        className={btnClass}
                                    >
                                        {answer.text}
                                    </button>
                                )
                            })}
                            <div className='score'>
                                {currentQuestionIndex > 0 && <div className='prevbtncls'><button onClick={handlePrev}>Previous</button></div>}
                                {currentQuestionIndex < questions.length - 1 && <div className='nextbtncls'><button onClick={handleChange}>Next</button></div>}
                                {currentQuestionIndex === questions.length - 1 && <div className='submitbtncls'><button onClick={handleSubmit}>Submit</button></div>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Result score={score} ans={ans} questions={questions} />
                )

            )}

        </div>
    );

}
