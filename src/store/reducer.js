export const initialState = {
    login: false,
    question: [],
    number: 0,
    play: true,
    correct: 0,
    notif: ''
};
  
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIF':
            return {
                ...state,
                notif: action.v
            };
        case 'SET_QUESTION':
            return {
                ...state,
                question: action.v
            };
        case 'SET_PLAY':
            return {
                ...state,
                play: action.v
            };
        case "SET_LOGIN":
            return {
                ...state,
                login: action.v
            };
        case 'SET_NUMBER':
            return {
                ...state,
                number: action.v
            };
        case 'SET_CORRECT':
            return {
                ...state,
                correct: action.v,
            };
        default:
            return state;
    }
};