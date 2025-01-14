import styles from "./Home.module.css";
import PropTypes from "prop-types";

function Tabs(props) {
  const { showMap, setShowMap } = props;
  return (
    <div className={styles.tabContainer}>
      <div
        className={`${styles.tab} ${showMap ? styles.tabActive : ""}`}
        onClick={() => {
          setShowMap(true);
        }}
      >
        List
      </div>
      <div
        className={`${styles.tab} ${!showMap ? styles.tabActive : ""}`}
        onClick={() => {
          setShowMap(false);
        }}
      >
        Map
      </div>
    </div>
  );
}

Tabs.propTypes = {
  showMap: PropTypes.bool.isRequired,
  setShowMap: PropTypes.func.isRequired,
};

export default Tabs;
