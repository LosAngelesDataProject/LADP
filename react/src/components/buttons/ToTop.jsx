import { useEffect, useState } from "react";
import styles from "./Buttons.module.css";

function GoTop() {
  const [showGoTop, setShowGoTop] = useState(false);
  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 90);
  };
  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  }, []);
  return (
    <>
      {showGoTop && (
        <div className={styles.goToTop} onClick={handleScrollUp}>
          <i className={`${styles.goToTopIcon} fas fa-circle-arrow-up`} />{" "}
        </div>
      )}
    </>
  );
}

export default GoTop;
