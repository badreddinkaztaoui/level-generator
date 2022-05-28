import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StarIcon from "../../icons/Star";
// Styles
import styles from "./styles.module.scss";

const Level = () => {
  const router = useRouter();

  // States
  const [score, setScore] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [rank, setRank] = useState<number>(1);

  useEffect(() => {
    // Get the current score
    const score = Number(localStorage.getItem("score"));
    setScore(score);
    // Start progressing the score
    const timer = setInterval(() => {
      if (progress === score) {
        clearInterval(timer);
        return;
      } else {
        setProgress((prev) => prev + 2);
        setCurrent((prev) => prev + 2);
      }
    }, 5);

    if (progress === 1000) {
      setLevel((prev) => prev + 1000);
      setRank((prev) => prev + 1);
    } else if (progress === level * 1.3 + 1000) {
      setLevel((prev) => prev * 1.3 + 1000);
      setRank((prev) => prev + 1);
    }

    return () => clearInterval(timer);
  }, [progress]);

  useEffect(() => {
    setCurrent(0);
    return () => {};
  }, [level]); // <-- This will start whenever the level changed

  // Return to the form and choose another score
  function restar() {
    localStorage.removeItem("score");
    router.push("/");
  }

  const canAnimate = progress === score && progress >= 1000;
  const width = progress > 1000 ? (current * 45) / 130 : (current * 45) / 100;

  const variants = {
    popup: {
      scale: [0.7, 1],
      opacity: [0, 1],
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_content}>
        <div className={styles.wrapper_content_logo}>
          {canAnimate ? (
            <motion.img
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 1],
              }}
              transition={{ duration: 3, easings: "backOut" }}
              src="/high.png"
              width={649}
              height={491}
            />
          ) : (
            <motion.img src="/low.png" width={386} height={386} />
          )}
        </div>

        <div className={styles.wrapper_content_rank}>
          <motion.h4
            variants={variants}
            animate={canAnimate && "popup"}
            transition={{ duration: 1, easings: "circInOut", delay: 3 }}
          >
            Level : {rank}
          </motion.h4>
        </div>

        <div className={styles.wrapper_content_score}>
          <span>
            {progress} / {score}
          </span>
        </div>
        <div className={styles.wrapper_content_progress}>
          <motion.div className={styles.wrapper_content_progress_bar} />
          <motion.div
            animate={{ width: width }}
            transition={{ easings: "linear", duration: 0.06 }}
            className={styles.wrapper_content_progress_fill}
          />
          <motion.div
            animate={{ x: width }}
            transition={{ easings: "linear", duration: 0.06 }}
            className={styles.wrapper_content_progress_icon}
          >
            <StarIcon />
          </motion.div>
        </div>
        <button className={styles.wrapper_content_btn} onClick={restar}>
          Try with another score
        </button>
      </div>
    </div>
  );
};

export default Level;
