import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';


const Quiz = ({questions, handleComplete}) => {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(1);
		}
	};

	const handleResetQuiz = () => {
		setCurrentQuestion(0)
		setShowScore(false)
		setScore(0)
	}

	
	return (
		<div className='bg-white w-450px min-h-200 h-min rounded-md p-20 shadow-md flex flex-col'>
				{showScore ? (
					<div className='flex flex-row text-lg items-center'>
						<div>You scored {score} out of {questions.length}</div>
						<div>
						{score === questions.length ? 
							<Button color="success" onClick={handleComplete} loading={open} variant="contained"> 
								Complete
							</Button> : 
							<Button color="error" onClick={handleResetQuiz} loading={open} variant="contained"> 
								Retry
							</Button>}
						</div>
					</div>
				) : (
					<>
						
							{/* Questions */}
							<div className='w-full relative flex flex-col'>
								<div className='mb-6 justify-start items-start text-md'>
									<span>Question {currentQuestion + 1}</span>/{questions.length}
								</div>
								{questions.length > 0 && <div className='justify-center items-center mb-12'>{questions[currentQuestion].questionText}</div>}
							</div>
	
							{/* Answers */}
							{questions.length > 0 && 
								<div className='w-full flex flex-col justify-between'>
									{questions[currentQuestion].answerOptions.map((answerOption) => (
										<button className='bg-white hover:bg-slate-200/50 m-2 rounded-lg border-slate-300' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
										
									))}
								</div>
							}
					</>
				)}
		</div>
	);
}

export default Quiz;

