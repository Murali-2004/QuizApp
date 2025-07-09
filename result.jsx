import React from "react";

export default function Result({ score, ans, questions }) {
    return (
        <div className='quiz-finish'>
            <h1>Congratulation!</h1>
            <h2>Quiz Finished</h2>
            <p>Your Score: {score}</p>
            <div className='align'>
                {ans.map((answer, index) => (
                    <div key={index} className='answer'>
                        <p> Question :{index + 1}. {questions[index].question}</p>
                        <p>Your Answer: {ans[index]}</p>
                        <p>Correct Answer: {questions[index].answers.find(answer => answer.correct).text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}