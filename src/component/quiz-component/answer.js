import { useContext } from "react"
import { QuizAppContext } from "../../store/context"

const Answer = () => {
    const { state, dispatch, decode } = useContext(QuizAppContext)

    const shuffle = () => {
        const v = [state.question[state.number]?.correct_answer].concat(state.question[state.number]?.incorrect_answers)

        for (let i = v.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [v[i], v[j]] = [v[j], v[i]];
        }
        return v;
    }

    const check = (v) => {
        dispatch({ type: 'SET_NUMBER', v: state.number+1 });
        
        if (state.number >= 9) {
            dispatch({ type: 'SET_PLAY', v: false });
        }
        
        if (v === state.question[state.number]?.correct_answer) {
            dispatch({ type: 'SET_CORRECT', v: state.correct+1 });
        }
    }

    return (
        <div className="answer">
            {shuffle().map((q, i) => <h2 key={i} onClick={() => check(q)}>{decode(q)}</h2>)}
        </div>
    );
}

export default Answer;