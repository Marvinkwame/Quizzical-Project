import React from "react"
import "./App.css"
import QuestionList from "./components/QuestionList/QuestionList"


export default function App() {
    const [startGame, setStartGame] = React.useState(false)
    const [showNoQuestionsError, setShowNoQuestionsError] = React.useState(false)

    const [selectOption, setSelectOption] = React.useState(
        {category: "",
         difficulty: "",
         questions: ""
          }
    )

    function handleStartGame() {
        setStartGame(prevStart => !prevStart)
    }
    
    const handleNoQuestionError = boolean => setShowNoQuestionsError(boolean);

    function handleChange(event) {
        const{name, value} = event.target

        setSelectOption(prevSelectOption => {
            return {
                ...prevSelectOption,
                [name]: value
            }
        })
    }

    return ( 
        
        <main>
            {startGame 
            ? 
            <section className="game-section">
                <QuestionList
                selectOption={selectOption}
                handleStartGame={handleStartGame}
                handleNoQuestionError={handleNoQuestionError}
                />
            </section>
            :
            <section className="start-container">
                <h1 className="game-title">Quizzical</h1>
                <p className="game-text">Let's Go!!!!</p>
                
                <div className="game-difficulty section">
                    <div className="category-section select-bar">
                        <label className="label-name" htmlFor="category">Category:</label>
                        <select id="category" value={selectOption.category} onChange={handleChange} name="category" className="select-option">
                            <option value="">Choose Any Category</option>
                            <option value="9">General Knowledge</option>
							<option value="10">Entertainment: Books</option>
							<option value="11">Entertainment: Film</option>
							<option value="12">Entertainment: Music</option>
							<option value="13">Entertainment: Musicals &amp; Theatres</option>
							<option value="14">Entertainment: Television</option>
							<option value="15">Entertainment: Video Games</option>
							<option value="16">Entertainment: Board Games</option>
							<option value="17">Science &amp; Nature</option>
							<option value="18">Science: Computers</option>
							<option value="19">Science: Mathematics</option>
							<option value="20">Mythology</option>
							<option value="21">Sports</option>
							<option value="22">Geography</option>
							<option value="23">History</option>
							<option value="24">Politics</option>
							<option value="25">Art</option>
							<option value="26">Celebrities</option>
							<option value="27">Animals</option>
							<option value="28">Vehicles</option>
							<option value="29">Entertainment: Comics</option>
							<option value="30">Science: Gadgets</option>
							<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
							<option value="32">Entertainment: Cartoon &amp; Animations</option>
                        </select>
                    </div>

                    <div className="difficulty-section select-bar">
                        <label  htmlFor="difficulty" className="label-name">Difficulty:</label>
                        <select id="difficulty" name="difficulty" onChange={handleChange} value={selectOption.difficulty} className="select-option">
                            <option value="" >Choose Difficulty</option>
                            <option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
                        </select>
                    </div>

                    <div className="question-section select-bar">
                        <label className="label-name" htmlFor="questions" >Type Of Questions:</label>
                        <select id="questions" onChange={handleChange} name="questions" className="select-option" value={selectOption.questions}>
                            <option value="">Choose Any Type</option>
                            <option value="multiple">Multiple Choice</option>
							<option value="boolean">True / False</option>
                        </select>
                    </div>
                </div>
                <button 
                    className="start-game" 
                    onClick={handleStartGame}
                >
                    Start Quiz
                </button>
            </section>
            }

            <footer>Made by Marvin Kwame.</footer>
        </main>
    )
}
