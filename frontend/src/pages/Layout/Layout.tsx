import { FunctionComponent } from "react";
import { Header } from "../../components/header/Header";
import styles from "./layout.module.css";

export const Layout: FunctionComponent = ({ children }) => (
  <section className={styles.background}>
    <Header />;<main>{children}</main>
  </section>
);
