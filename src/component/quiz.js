import { useContext, useEffect } from "react"
import { QuizAppContext } from "../store/context"
import axios from "axios";
import '../style/quiz.css'
import Description from "./quiz-component/description"
import Question from "./quiz-component/question"
import Answer from "./quiz-component/answer"
import End from "./quiz-component/end"

const Quiz = () => {
    const { state, dispatch } = useContext(QuizAppContext)

    useEffect(() => {
        if (state.play) {
            const questionData = JSON.parse(localStorage.getItem('quiz-question'))
            const numberData = localStorage.getItem('quiz-number')
            const correctData = localStorage.getItem('quiz-correct')

            if (questionData && numberData && correctData) {
                dispatch({ type: 'SET_QUESTION', v: questionData });
                dispatch({ type: 'SET_NUMBER', v: Number(numberData) });
                dispatch({ type: 'SET_CORRECT', v: Number(correctData) });
                dispatch({ type: 'SET_NOTIF', v: 'success' });
            } else {
                dispatch({ type: 'SET_NUMBER', v: 0 });
                dispatch({ type: 'SET_CORRECT', v: 0 });
                dispatch({ type: 'SET_NOTIF', v: 'loading' });
                axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
                .then((response) => {
                    dispatch({ type: 'SET_QUESTION', v: response.data.results });
                    dispatch({ type: 'SET_NOTIF', v: 'success' });
                })
                .catch(() => {
                    dispatch({ type: 'SET_NOTIF', v: 'error' });
                });
            }
        } else {
            localStorage.removeItem('quiz-question');
            localStorage.removeItem('quiz-number');
            localStorage.removeItem('quiz-correct');
            localStorage.removeItem('quiz-time');
        }
    }, [state.play]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        localStorage.setItem('quiz-question', JSON.stringify(state.question));
    }, [state.question]);

    useEffect(() => {
        if (state.play) {
            localStorage.setItem('quiz-number', state.number);
        }
    }, [state.number, state.play]);

    useEffect(() => {
        if (state.play) {
            localStorage.setItem('quiz-correct', state.correct);
        }
    }, [state.correct, state.play]);

    return (
        <div className="quiz-box">
            {
                state.notif === 'loading' ? <h1>Loading...</h1> : 
                state.notif === 'error' ? <h1>There is something wrong.</h1> :
                state.notif === 'success' && !state.play ? <End /> :
                state.notif === 'success' && state.play ?
                    <>
                        <Description />
                        <Question />
                        <Answer />
                    </> 
                : []
            }
        </div>
    );
}

export default Quiz;