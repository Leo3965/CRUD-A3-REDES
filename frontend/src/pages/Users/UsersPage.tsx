import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IocContext } from "../../context/IocContext";
import { User } from "../../types/User";
import { Layout } from "../Layout/Layout";
import styles from "./users.module.css";

export const UsersPage = () => {
  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log({ token });
    if (token) {
      apiClient.getUsers(token).then(setUsers);
    }
  }, [token, apiClient]);

  return (
    <Layout>
      <table className={styles.table}>
        <tr>
          <th>ID</th>
          <th>LOGIN</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>CREATED AT</th>
          <th>UPDATED AT</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.login}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createdAt}</td>
            <td>{user.updatedAt}</td>
          </tr>
        ))}
      </table>
    </Layout>
  );
};
