import { useContext, useState } from 'react';
import { QuizAppContext } from "../store/context"
import '../style/login.css'

const Login = () => {
    const [error, setError] = useState(false)
    const { checkLogin } = useContext(QuizAppContext)

    const login = (e) => {
        e.preventDefault();
        if (e.target.username.value.toLowerCase().trim() === 'madanadra' && e.target.password.value.toLowerCase().trim() === 'quizapp') {
            localStorage.setItem('id-login', true);
            checkLogin();
        } else {
            setError(true);
        }
    }

    return (
        <div className="login-box">
            <h1>Login</h1>
            {error && <h3>Wrong username or password!</h3>}
            <form onSubmit={(e) => login(e)} autoComplete="off">
                <input type='text' name='username' placeholder="Username" required />
                <input type='password' name='password' placeholder="Password" required />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Login;