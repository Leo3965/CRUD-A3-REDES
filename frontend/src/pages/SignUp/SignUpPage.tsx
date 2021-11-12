import style from './signup.module.css'
import {useForm} from "react-hook-form";
import {useContext} from "react";
import {IocContext} from "../../context/IocContext";
import {AuthContext} from "../../context/AuthContext";

export interface FormProps {
    name: string;
    password: string;
    login: string;
}

export const SignUpPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormProps>();
    const {apiClient} = useContext(IocContext);

    const onSubmit = (data: FormProps) => apiClient.createUser(data.name, data.login, data.password);


    return <main className={style.signUp}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <input type="text" placeholder="Nome" {...register('name', {required: true,})}/>
                <input type="text" placeholder="Login" {...register('login', {required: true})}/>
                <input type="password" placeholder="Senha" {...register('password', {required: true})}/>
            </section>
            <div className={style.errors}>
                {errors.name && <span>Invalid Name</span>}
                {errors.login && <span>Invalid Login</span>}
                {errors.password && <span>Invalid Password</span>}
            </div>
            <footer>
                <button>Reset</button>
                <button type="submit">Register</button>
            </footer>
        </form>

    </main>
}