import styles from "./HeaderOne.module.css";

const HeaderOne = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerOne}>
        <img
          src="https://i.imgur.com/gk4XsvY.png"
          className={styles.headerImage}
          alt="hands distributing canned goods"
          align="left"
        />
      </div>
    </div>
  );
};

export default HeaderOne;
