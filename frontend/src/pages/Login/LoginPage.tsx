import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import style from "./login.module.css";

interface FormProps {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormProps>();

  const { signIn } = useContext(AuthContext);

  const onSubmit = (data: FormProps) => signIn(data.login, data.password);

  return (
    <main className={style.login}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div>
            <input
              type="text"
              placeholder="Login"
              {...register("login", { required: true })}
            />
            <input
              type="password"
              placeholder="Senha"
              {...register("password", { required: true })}
            />
          </div>
          <footer>
            <button type="submit">Login</button>
            <button onClick={() => navigate("/signup")}>SignUp</button>
          </footer>
        </section>
      </form>
    </main>
  );
};
