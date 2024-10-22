import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/HomeFooter";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import styles from "./Layout.module.css";

const DefaultLayout = (props) => {
  return (
    <>
      <NavBar {...props} />
      <Container className={styles.defaultContainer}>
        {props.children}
      </Container>
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.element,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default DefaultLayout;
