import React from "react"
import { nanoid } from "nanoid"
import "./QuestionList.css"
import Question from "../Questions/Question"
import quizQuestions from "../../quizApi/quizQuestions"
 


    const QuestionList = ({ selectOption, handleStartGame, handleNoQuestionError}) => {

        const [questionArray, setQuestionArray] = React.useState([]);
        const [checkAnswerBtn, setCheckAnswerBtn] = React.useState(false);
	    const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
	    const [isGameOver, setIsGameOver] = React.useState(false);
	
        const questionsAnswered = questionArray.every(question => question.selectAnswer !== "");

        React.useEffect(() => {
            quizQuestions(selectOption).then(questions => {
                if(questions.length === 0) {
                    handleStartGame();
                    handleNoQuestionError(true);
                    return;
                } else {
                    handleNoQuestionError(false)
                }

                return setQuestionArray(questions.map (question => {
                    return {...question, id: nanoid(), selectedAnswer: "", showAnswer: false}
                }))
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        React.useEffect(() => {
            if(questionArray.length !== 0 && questionsAnswered) {
                let correctAnswers = 0;

                questionArray.forEach(question => {
                    if(question.correct_answer === question.selectedAnswer) {
                        correctAnswers++;
                    }
                })

                setCorrectAnswersCount(correctAnswers)
                setCheckAnswerBtn(true)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [questionArray])
        

        const handleSelectAnswer = (questionId, answer) => {
            if(!isGameOver) {
                setQuestionArray(prevQuestion => {
                    return prevQuestion.map(question => {
                        return question.id === questionId ? {...question, selectedAnswer: answer} : question
                    })
                })
            }
        }   


        const checkAnswers = () => {
            if (questionsAnswered) {
                setIsGameOver(true);
    
                setQuestionArray(prevQuestion => (
                    prevQuestion.map(question => ({...question, showAnswer: true }))
                ));
            }
        }


        const resetGame = () => {
            setIsGameOver(false)
            setCheckAnswerBtn(false)
            handleStartGame()
        }

        const questionElements = questionArray.map(question => (
            <Question
            key={question.id}
            id={question.id}
            question={question.question}
			correctAnswer={question.correct_answer}
			incorrectAnswers={question.incorrect_answers}
			difficulty={question.difficulty}
			category={question.category}
			selectedAnswer={question.selectedAnswer}
			showAnswer={question.showAnswer}
			handleSelectAnswer={handleSelectAnswer}
             />
        ))


        return (
            <section className="questionList-container">
                {questionElements}

                <div className="bottom-container">
                    {isGameOver && 
                    <h3 className="correct-answers-text">You have scored {correctAnswersCount}/5.</h3>
                    }

                    <button className={
                        `btn-primary ${checkAnswerBtn ? 
                        "btn-check-answers" : "btn-check-answer-disabled" }`}
                        onClick={isGameOver ? resetGame : checkAnswers} 
                    >
                        {isGameOver ? "Start New Game" : "Check Answers"}
                    </button>
                </div>
            </section>
        )

    }

    export default QuestionList;