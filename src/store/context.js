import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const QuizAppContext = createContext();

export const QuizApp = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const checkLogin = () => {
        const id = localStorage.getItem('id-login')
        
        if (id) {
            dispatch({ type: 'SET_LOGIN', v: true });
            dispatch({ type: 'SET_PLAY', v: true });
        } else {
            dispatch({ type: 'SET_LOGIN', v: false });
        }
    }

    const decode = (v) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = v;
        return txt.value;
    }

    return (
    <QuizAppContext.Provider value={{ state, dispatch, checkLogin, decode}}>
        {children}
    </QuizAppContext.Provider>
    );
}