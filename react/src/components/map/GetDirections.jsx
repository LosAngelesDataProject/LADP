import PropTypes from "prop-types";
import { FaMapMarkedAlt, FaBusAlt } from "react-icons/fa";
import styles from "./Map.module.css";

const GetDirections = (props) => {
  const { markerAddress, current } = props;

  //Google Maps converts the Apple Maps Link if executed in Windows or Android. That is why I decided to use the Apple Maps link.
  //The other option is to create two separate links, one for Google Maps and the other for Apple Maps

  const directionClick = (flag, event) => {
    event.stopPropagation();
    if (current.active === "on") {
      window.open(
        `http://maps.apple.com/?saddr=${current.lat},${current.lng}&daddr=${markerAddress}${flag}`,
        "_blank"
      );
    } else {
      window.open(`http://maps.apple.com/?daddr=${markerAddress}${flag}`, "_blank");
    }
  };

  return (
    <>
      <div className={styles.directionbtn}>
        <button className={` ${styles.directionButton}`} onClick={(e) => directionClick("", e)}>
          <FaMapMarkedAlt className={styles.directionIcon} />
          Get Directions
        </button>
        <button
          className={` ${styles.directionButton}`}
          onClick={(e) => directionClick("&dirflg=r", e)}
        >
          <FaBusAlt className={styles.directionIcon} />
          Get Public Transit
        </button>
      </div>
    </>
  );
};

GetDirections.propTypes = {
  markerAddress: PropTypes.string.isRequired,

  current: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    active: PropTypes.string,
  }),
};

export default GetDirections;
