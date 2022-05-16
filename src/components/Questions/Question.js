import React from "react"
import { nanoid } from "nanoid"
import { decode } from "html-entities"
import "./Question.css"
import tickIcon from "../../images/tick-image.png"
import crossIcon from "../../images/cross-image.png"

export default function Question(props) {
    const incorrectAnswersElements = props.incorrectAnswers.map(answer => {
        const incorrectClassName = `
        ${props.selectedAnswer === answer ? "question-btn-selected" : "question-btn"}
        ${(props.showAnswer && props.selectedAnswer === answer) && "question-btn-incorrect"}`

        return <button key={nanoid()} className={incorrectClassName} 
                onClick={() => props.handleSelectAnswer(props.id, answer)}>
                    {decode(answer)}
               </button>

    });

    const correctAnswerClassName = `
		${props.selectedAnswer === props.correctAnswer ? "question-btn-selected" : "question-btn"}
		${props.showAnswer && "question-btn-correct"}
	`;

	const correctAnswerElement =
		<button
			key={nanoid()}
			className={correctAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
		>
			{ decode(props.correctAnswer) }
		</button>

    incorrectAnswersElements.push(correctAnswerElement);

    const sortedElement = incorrectAnswersElements.sort((a,b) => (
        a.props.children.localeCompare(b.props.children)
    ))
    

    return (
		<article className="question-container">
			<div>
				<h3 className="question-text">{ decode(props.question) }</h3>
				{ sortedElement }
			</div>
			
			{
				props.showAnswer &&
					(props.selectedAnswer === props.correctAnswer
						? <img src={tickIcon} width={35} alt="Tick, correct answer" />
						: <img src={crossIcon} width={30} alt="Cross, wrong answer" />)
			}
		</article>
	);
}