const quizQuestions = selectOption => {
        const { category, difficulty, questions } = selectOption;
    
        let categorySelect = "";
        let difficultySelect = "";
        let questionSelect = "";

        if (category !== "") {
            categorySelect = `&category=${category}`;
        }

        if (difficulty !== "") {
            difficultySelect = `&difficulty=${difficulty}`;
        }

        if (questions !== "") {
            questionSelect = `&questions=${questions}`;
        }

        let apiUrl = `https://opentdb.com/api.php?amount=5${categorySelect}${difficultySelect}${questionSelect}`

        return fetch(apiUrl)
                .then(res => res.json())
                .then(data => data.results)
    }
 
    
export default quizQuestions;