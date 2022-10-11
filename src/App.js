import { useContext, useEffect } from "react"
import { QuizAppContext } from "./store/context"
import { Routes, Route, Navigate } from "react-router-dom"
import './style/main.css'
import Login from './component/login'
import Quiz from './component/quiz'

function App() {
  const { state, checkLogin } = useContext(QuizAppContext)

  useEffect(() => {
    checkLogin();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='container'>
      <Routes>
        <Route path="/login" element={ state.login ? <Navigate to='/' /> : <Login /> } />
        <Route path="/" element={ state.login ? <Quiz /> : <Navigate to='/login' /> } />
      </Routes>
    </div>
  );
}

export default App;
