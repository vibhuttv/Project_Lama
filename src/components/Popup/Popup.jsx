import { useState } from "react";
import styles from "./pop.module.css";

export default function Popup(props) {
  const [name, setName] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    props.toggle();
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <h2>{props.title}</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={props.toggle}>Close</button>
      </div>
    </div>
  );
}
