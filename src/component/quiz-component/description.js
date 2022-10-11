import { useContext, useEffect, useState } from "react"
import { QuizAppContext } from "../../store/context"

const Description = () => {
    const { state, dispatch } = useContext(QuizAppContext)
    const [time, setTime] = useState(100)

    useEffect(() => {
        const timeData = localStorage.getItem('quiz-time')
        setTime(timeData ?? 100)
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time-1);
            localStorage.setItem('quiz-time', time-1);
        }, 1000);

        if (time <= 0) {
            clearInterval(timer);
            dispatch({ type: 'SET_PLAY', v: false });
            localStorage.removeItem('quiz-time');
        }

        return () => { 
            clearInterval(timer); 
        };
    }, [time]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="description">
            <h2><span className="material-icons-outlined icon">content_copy</span>{state.number+1}/10</h2>
            <h2>
                <span className="material-icons-outlined icon">timer</span>
                <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}</span>
                .
                <span>{("0" + Math.floor((time) % 60)).slice(-2)}</span>
                </h2>
        </div>
    );
}

export default Description;