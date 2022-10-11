import { useContext } from "react"
import { QuizAppContext } from "../../store/context"

const Question = () => {
    const { state, decode } = useContext(QuizAppContext)
    
    return (
        <div className="question">
            <h1>{decode(state.question[state.number]?.question)}</h1>
        </div>
    );
}

export default Question;