import React from "react";
import styles from "./reading-streak.module.css";

// images 08 to 63
//

const ReadingStreak = ({ children, hasSidebar }) => (
  <ul className={styles.list}>
    {[...Array(56)].map((x, i) => (
      <li className={styles.month}>
        <img
          width="100"
          src={`/media/reading-streak/IMG_00${(i + 8)
            .toString()
            .padStart(2, "0")}.PNG`}
        />
      </li>
    )).reverse()}
  </ul>
);

export default ReadingStreak;
