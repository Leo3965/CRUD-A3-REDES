import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import style from "./header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  return (
    <section className={style.section}>
      <div>
        <div onClick={() => navigate("/")}>Home</div>
        <div onClick={() => navigate("/user")}>My Profile</div>
        <div onClick={() => navigate("/users")}>Users</div>
        <div
          onClick={() => {
            signOut();
            navigate("/");
          }}
        >
          Sair
        </div>
      </div>
    </section>
  );
};
