import { useContext } from "react"
import { QuizAppContext } from "../../store/context"

const End = () => {
    const { state, dispatch, checkLogin } = useContext(QuizAppContext)

    const logout = () => {
        localStorage.removeItem('id-login');
        checkLogin();
        dispatch({ type: 'SET_NOTIF', v: '' });
    }

    const replay = () => {
        dispatch({ type: 'SET_PLAY', v: true })
        dispatch({ type: 'SET_NOTIF', v: '' });
    }

    return (
        <div className="end">
            <h2 className="correct">Correct: {state.correct}</h2>
            <h2 className="wrong">Wrong: {state.number-state.correct}</h2>
            <h2>Total: {state.number}/10</h2>
            <h2>
                <span className="material-icons-outlined logout" onClick={() => logout()}>logout</span>
                <span className="material-icons-outlined play-again" onClick={() => replay()}>replay</span>
            </h2>
        </div>
    );
}

export default End;