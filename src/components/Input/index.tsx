// Styles
import { ChangeEvent } from "react";
import { useRouter } from "next/router";
// Styles
import styles from "./styles.module.scss";

const Input = () => {
  const router = useRouter();

  function generateLevel() {
    router.push("/level");
  }

  function onScoreChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (value && +value < 10000) {
      localStorage.setItem("score", value);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
        <div className={styles.intro}>
          <h2>Level generator</h2>
          <p>Enter your score to discover your level</p>
        </div>
        <div className={styles.control}>
          <input
            type="text"
            placeholder="Score exp: 1000"
            name="score"
            onChange={onScoreChange}
          />
        </div>
        <button className={styles.btn} onClick={generateLevel}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default Input;
