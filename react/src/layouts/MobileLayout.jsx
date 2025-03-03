import MobileNavBar from "../components/navBar/MobileNavBar";
import MobileFooter from "../components/footer/MobileFooter";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import styles from "./Layout.module.css";
import GoTop from "../components/buttons/ToTop";

const MobileLayout = (props) => {
  return (
    <>
      <MobileNavBar {...props} />
      <Container className={styles.mobileContainer}>{props.children}</Container>
      <GoTop />
      <MobileFooter />
    </>
  );
};

MobileLayout.propTypes = {
  children: PropTypes.element,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default MobileLayout;
