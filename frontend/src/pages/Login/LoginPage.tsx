import style from './login.module.css'
import {useNavigate} from 'react-router-dom'

export const LoginPage = () => {
    const navigate = useNavigate()

    return <main className={style.login}>
        <section>
            <div>
                <input type="text" placeholder="Login"/>
                <input type="password" placeholder="Senha" />
            </div>
            <footer>
                <button>Login</button>
                <button onClick={() => navigate('/signup')}>SignUp</button>
            </footer>
        </section>
    </main>
}