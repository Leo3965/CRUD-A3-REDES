import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { IocContext } from "../../context/IocContext";
import style from "./signup.module.css";

export interface FormProps {
  name: string;
  password: string;
  login: string;
  email: string;
}

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();
  const { apiClient } = useContext(IocContext);
  const navigate = useNavigate();

  const onSubmit = (data: FormProps) =>
    apiClient.createUser(data).then(() => navigate("/"));

  return (
    <main className={style.signUp}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <input
            type="text"
            placeholder="Nome"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
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
        </section>
        <div className={style.errors}>
          {errors.name && <span>Invalid Name</span>}
          {errors.login && <span>Invalid Login</span>}
          {errors.password && <span>Invalid Password</span>}
          {errors.email && <span>Invalid Email</span>}
        </div>
        <footer>
          <button type="reset">Reset</button>
          <button type="submit">Register</button>
        </footer>
      </form>
    </main>
  );
};
