import { FunctionComponent, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Layout } from "../Layout/Layout";
import styles from "./user.module.css";

export const UserPage: FunctionComponent = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      {user && (
        <table className={styles.table}>
          {Object.keys(user).map((key, index) => (
            <tr key={key}>
              <th>{key.toUpperCase()}</th>
              <td>{Object.values(user)[index]}</td>
            </tr>
          ))}
        </table>
      )}
    </Layout>
  );
};
